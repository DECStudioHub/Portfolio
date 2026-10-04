import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SocialLinks } from './SocialLinks';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();

  // FormBold Configuration (Private backend endpoint)
  const formBoldId = ((import.meta as any).env?.VITE_FORMBOLD_ID || data.profile.formBoldId || 'oJbpZ').trim();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'Project Inquiry',
    message: '',
    preferredMethod: 'Email',
    agreeContact: false,
  });

  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const inquiryTypes = [
    'Project Inquiry',
    'Job Opportunity',
    'Collaboration',
    'IT Support',
    'Software Development',
    'Web Development',
    'Android Development',
    'Content Creation',
    'Other',
  ];

  const contactMethods = ['Email', 'Phone', 'WhatsApp', 'LinkedIn'];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message or requirements summary.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    if (!formData.agreeContact) {
      newErrors.agreeContact = 'You must agree to be contacted.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File size must be under 10MB.' }));
        return;
      }
      setAttachedFile(file);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.file;
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = new FormData();
    payload.append('name', formData.fullName);
    payload.append('email', formData.email);
    if (formData.phone) payload.append('phone', formData.phone);
    if (formData.company) payload.append('company', formData.company);
    payload.append('inquiryType', formData.inquiryType);
    payload.append('preferredMethod', formData.preferredMethod);
    payload.append('subject', `[DECStudio] ${formData.inquiryType} from ${formData.fullName}`);
    payload.append('message', formData.message);
    if (attachedFile) {
      payload.append('attachment', attachedFile);
    }

    try {
      const response = await fetch(`https://formbold.com/s/${formBoldId}`, {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        const errData = await response.json().catch(() => null);
        const errorMsg =
          errData?.message ||
          (response.status === 404
            ? `Transmission endpoint not found. Please try again later.`
            : `Transmission service responded with code ${response.status}.`);
        throw new Error(errorMsg);
      }
    } catch (err: any) {
      console.error('Transmission failed:', err);
      setSubmitError(
        err.message ||
          'Failed to send transmission. Please check your network connection or contact me directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      inquiryType: 'Project Inquiry',
      message: '',
      preferredMethod: 'Email',
      agreeContact: false,
    });
    setAttachedFile(null);
    setErrors({});
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const mailtoFallbackUrl = `mailto:${data.profile.email}?subject=${encodeURIComponent(
    `[DECStudio Inquiry] ${formData.inquiryType || 'General'} from ${formData.fullName || 'Client'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nCompany: ${
      formData.company || 'N/A'
    }\nInquiry Type: ${formData.inquiryType}\nPreferred Contact: ${formData.preferredMethod}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#412D15]/40"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#412D15]/40 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E1DCC9]/60">
              06. Direct Communication
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#E1DCC9]">
              Let's Build Something Together
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E1DCC9]/70 max-w-md font-mono">
            Have a project, technical requirement, collaboration opportunity, or IT concern? Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-bold text-[#E1DCC9]">
                Get in Touch
              </h3>
              <p className="text-sm text-[#E1DCC9]/75 leading-relaxed">
                Whether you need a dedicated web application, mobile Android development, enterprise IT support, or custom automation pipelines, reach out directly.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              <div className="p-4 rounded-xl border border-[#412D15] bg-[#1F150C]/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-[#412D15] bg-[#2A1E11] flex items-center justify-center text-[#E1DCC9]">
                  ✉️
                </div>
                <div>
                  <span className="text-[#E1DCC9]/50 block text-[10px] uppercase">Official Email</span>
                  <a
                    href={`mailto:${data.profile.email}`}
                    className="text-[#E1DCC9] hover:underline font-semibold"
                  >
                    {data.profile.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl border border-[#412D15] bg-[#1F150C]/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-[#412D15] bg-[#2A1E11] flex items-center justify-center text-[#E1DCC9]">
                  📍
                </div>
                <div>
                  <span className="text-[#E1DCC9]/50 block text-[10px] uppercase">Base Location</span>
                  <span className="text-[#E1DCC9] font-semibold">{data.profile.location}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="p-4 rounded-xl border border-[#412D15] bg-[#1F150C]/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-[#412D15] bg-[#2A1E11] flex items-center justify-center text-[#E1DCC9]">
                  ⚡
                </div>
                <div>
                  <span className="text-[#E1DCC9]/50 block text-[10px] uppercase">Service Status</span>
                  <span className="text-emerald-400 font-semibold">{data.profile.availability}</span>
                </div>
              </div>
            </div>

            {/* Social Accounts Repeated */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/50">
                Connect on Social Platforms
              </span>
              <SocialLinks size="lg" />
            </div>
          </div>

          {/* RIGHT: Contact / Application Form */}
          <div className="lg:col-span-7 rounded-2xl border border-[#412D15] bg-[#1F150C]/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            {submitSuccess ? (
              /* Success State */
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full border border-emerald-500/50 bg-emerald-950/40 flex items-center justify-center text-2xl text-emerald-400">
                  ✓
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#E1DCC9]">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-[#E1DCC9]/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your inquiry regarding <strong>{formData.inquiryType}</strong> has been dispatched and logged. I will review and get in touch with you shortly via {formData.preferredMethod}.
                </p>
                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-lg border border-[#412D15] bg-[#2A1E11] text-xs font-semibold text-[#E1DCC9] hover:bg-[#412D15] transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <div className="space-y-6">
                {/* Error Banner with Mailto Fallback */}
                {submitError && (
                  <div className="p-4 rounded-xl border border-red-500/50 bg-red-950/40 text-xs font-mono space-y-2.5 text-[#E1DCC9]">
                    <div className="flex items-center gap-2 text-red-400 font-bold">
                      <span>⚠️ Transmission Error:</span>
                    </div>
                    <p className="text-red-200/90 text-[11px] leading-relaxed">
                      {submitError}
                    </p>
                    <div className="pt-1 flex flex-wrap items-center gap-2.5">
                      <a
                        href={mailtoFallbackUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#412D15] bg-[#2A1E11] text-xs text-white hover:bg-[#412D15] transition-colors"
                      >
                        <span>✉️ Send Directly via Email Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmitError(null)}
                        className="text-[11px] text-[#E1DCC9]/60 hover:text-[#E1DCC9] underline"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}

                <form
                  action={`https://formbold.com/s/${formBoldId}`}
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="name"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border bg-black/60 text-xs sm:text-sm text-[#E1DCC9] focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-[#412D15] focus:border-[#E1DCC9]'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-red-400 font-mono">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. hello@tailgrids.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border bg-black/60 text-xs sm:text-sm text-[#E1DCC9] focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-[#412D15] focus:border-[#E1DCC9]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 font-mono">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/80">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+63 9XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#412D15] bg-black/60 text-xs sm:text-sm text-[#E1DCC9] focus:outline-none focus:border-[#E1DCC9]"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1">
                    <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/80">
                      Company / Organization
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="e.g. Studio or Enterprise"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#412D15] bg-black/60 text-xs sm:text-sm text-[#E1DCC9] focus:outline-none focus:border-[#E1DCC9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Inquiry Type */}
                  <div className="space-y-1">
                    <label htmlFor="inquiryType" className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]">
                      Inquiry Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#412D15] bg-black text-xs sm:text-sm text-[#E1DCC9] focus:outline-none focus:border-[#E1DCC9]"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-1">
                    <label htmlFor="preferredMethod" className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]">
                      Preferred Method
                    </label>
                    <select
                      id="preferredMethod"
                      name="preferredMethod"
                      value={formData.preferredMethod}
                      onChange={(e) => setFormData({ ...formData, preferredMethod: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#412D15] bg-black text-xs sm:text-sm text-[#E1DCC9] focus:outline-none focus:border-[#E1DCC9]"
                    >
                      {contactMethods.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]">
                    Project Specifications / Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border bg-black/60 text-xs sm:text-sm text-[#E1DCC9] focus:outline-none transition-colors ${
                      errors.message
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#412D15] focus:border-[#E1DCC9]'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-400 font-mono">{errors.message}</span>
                  )}
                </div>

                {/* Optional File Attachment */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#E1DCC9]/80">
                    Optional File Attachment (Specs, Brief, Diagrams - max 10MB)
                  </label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="contact-file-input"
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#412D15] bg-black/40 text-xs text-[#E1DCC9] hover:bg-[#2A1E11] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span>{attachedFile ? 'Change File' : 'Attach File'}</span>
                    </label>
                    <input
                      id="contact-file-input"
                      name="attachment"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {attachedFile && (
                      <div className="flex items-center gap-2 text-xs font-mono text-[#E1DCC9]/80">
                        <span className="truncate max-w-[200px]">{attachedFile.name}</span>
                        <button
                          type="button"
                          onClick={() => setAttachedFile(null)}
                          className="text-red-400 hover:text-red-300 text-xs"
                          aria-label="Remove attached file"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                  {errors.file && (
                    <span className="text-[11px] text-red-400 font-mono">{errors.file}</span>
                  )}
                </div>

                {/* Checkbox agreement */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.agreeContact}
                      onChange={(e) =>
                        setFormData({ ...formData, agreeContact: e.target.checked })
                      }
                      className="mt-0.5 rounded border-[#412D15] bg-black text-[#412D15] focus:ring-0"
                    />
                    <span className="text-xs text-[#E1DCC9]/80">
                      I agree to be contacted regarding this inquiry. <span className="text-red-400">*</span>
                    </span>
                  </label>
                  {errors.agreeContact && (
                    <span className="block text-[11px] text-red-400 font-mono mt-1">
                      {errors.agreeContact}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-[#412D15] bg-[#2A1E11] hover:bg-[#412D15] text-sm font-semibold tracking-wide text-[#E1DCC9] shadow-lg transition-all duration-200 disabled:opacity-50 hover:border-[#E1DCC9]/40"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Dispatching Transmission...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
};
