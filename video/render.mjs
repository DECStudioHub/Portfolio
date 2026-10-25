// Usage: node render.mjs decstudio-portfolio-20s.html out.mp4 [fps=60] [subframes=4] [workers=4]
// Usage: node render.mjs decstudio-portfolio-20s.html contact-sheet.png --stills 0.5,2.8,...
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , html, out, a3='60', a4='4', a5='4'] = process.argv;
if (!html || !out) throw new Error('usage: node render.mjs page.html out.mp4 [fps] [subframes] [workers]');
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
const run = args => new Promise((resolve,reject)=>{const p=spawn(ffmpeg,args,{stdio:'inherit'});p.on('close',c=>c?reject(new Error(`ffmpeg ${c}`)):resolve());});
const url=pathToFileURL(path.resolve(html)).href+'?render';
const browser=await chromium.launch({args:['--allow-file-access-from-files']});
const probe=await browser.newPage();await probe.goto(url);await probe.waitForFunction(()=>window.VIDEO&&typeof window.seek==='function');
const V=await probe.evaluate(()=>window.VIDEO);await probe.close();
async function openPage(){const p=await browser.newPage({viewport:{width:V.w,height:V.h},deviceScaleFactor:1});await p.goto(url);await p.waitForFunction(()=>window.VIDEO&&typeof window.seek==='function');return p;}
const shot=async(p,t)=>{await p.evaluate(t=>window.seek(t),t);return p.screenshot({type:'jpeg',quality:94});};
if(a3==='--stills'){
  const p=await openPage(),times=a4.split(',').map(Number),dir=out+'.frames';mkdirSync(dir,{recursive:true});
  for(let i=0;i<times.length;i++){await shot(p,times[i]).then(b=>writeFileSync(`${dir}/${String(i).padStart(3,'0')}.jpg`,b));}
  await browser.close();const cols=Math.min(3,times.length),rows=Math.ceil(times.length/cols);
  await run(['-v','error','-y','-framerate','1','-i',`${dir}/%03d.jpg`,'-vf',`scale=${Math.min(960,V.w)}:-1,tile=${cols}x${rows}:padding=6:color=gray`,'-frames:v','1',out]);
  rmSync(dir,{recursive:true});console.log('stills ->',out);process.exit(0);
}
const fps=+a3,sub=Math.max(1,+a4),workers=Math.max(1,+a5),N=Math.round(V.duration*fps),base=out.replace(/\.mp4$/,''),silent=base+'_silent.mp4';
const vf=sub>1?['-vf',`tmix=frames=${sub},select='eq(mod(n\\,${sub})\\,${sub-1})',setpts=N/(${fps}*TB)`]:[];
const per=Math.ceil(N/workers),segs=[];let done=0;
await Promise.all(Array.from({length:workers},async(_,w)=>{
  const a=w*per,b=Math.min(N,a+per);if(a>=b)return;const seg=`${base}_seg${w}.mp4`;segs[w]=seg;const page=await openPage();
  const ff=spawn(ffmpeg,['-v','error','-y','-f','image2pipe','-framerate',String(fps*sub),'-i','-',...vf,'-r',String(fps),'-c:v','libx264','-pix_fmt','yuv420p','-crf','17','-preset','fast',seg],{stdio:['pipe','inherit','inherit']});
  const closed=new Promise((resolve,reject)=>{ff.on('close',c=>c?reject(new Error(`ffmpeg worker ${w}: ${c}`)):resolve());});
  for(let f=a;f<b;f++){for(let s=0;s<sub;s++){const frame=await shot(page,(f+(sub>1?(s/sub)*.5:0))/fps);if(!ff.stdin.write(frame))await new Promise(r=>ff.stdin.once('drain',r));}done++;if(done%120===0)console.log(`${done}/${N} frames`);}
  ff.stdin.end();await closed;await page.close();
}));
const list=base+'_segs.txt';writeFileSync(list,segs.filter(Boolean).map(s=>`file '${path.resolve(s)}'`).join('\n'));
await run(['-v','error','-y','-f','concat','-safe','0','-i',list,'-c','copy',silent]);segs.filter(Boolean).forEach(s=>rmSync(s));rmSync(list);
const page=await openPage(),hasAudio=await page.evaluate(()=>typeof window.buildAudio==='function');
if(hasAudio){const b64=await page.evaluate(async dur=>{const sr=48000,ctx=new OfflineAudioContext(2,Math.ceil(sr*dur),sr);await buildAudio(ctx);const b=await ctx.startRendering(),L=b.getChannelData(0),R=b.getChannelData(1),i16=new Int16Array(L.length*2);for(let i=0;i<L.length;i++){i16[2*i]=Math.max(-1,Math.min(1,L[i]))*32767;i16[2*i+1]=Math.max(-1,Math.min(1,R[i]))*32767;}let s='';const u8=new Uint8Array(i16.buffer);for(let i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode(...u8.subarray(i,i+0x8000));return btoa(s);},V.duration);const pcm=base+'.pcm';writeFileSync(pcm,Buffer.from(b64,'base64'));await run(['-v','error','-y','-i',silent,'-f','s16le','-ar','48000','-ac','2','-i',pcm,'-af','loudnorm=I=-16:TP=-1.5:LRA=11','-ar','48000','-c:v','copy','-c:a','aac','-b:a','192k','-shortest',out]);rmSync(pcm);}
await page.close();await browser.close();console.log(`video -> ${out}`);
