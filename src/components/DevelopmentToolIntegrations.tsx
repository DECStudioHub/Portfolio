import React from 'react';
import { PortfolioConfig } from '../data/portfolioData';
import { SkillCategoryIntegrations } from './SkillCategoryIntegrations';

interface DevelopmentToolIntegrationsProps {
  skills: PortfolioConfig['skills'][0]['skills'];
}

export const DevelopmentToolIntegrations: React.FC<DevelopmentToolIntegrationsProps> = ({ skills }) => {
  return (
    <SkillCategoryIntegrations
      categoryTitle="Development Tool"
      categoryDescription="Everyday developer workflow tools, version control, and production software."
      skills={skills}
    />
  );
};

export { SkillCategoryIntegrations };
