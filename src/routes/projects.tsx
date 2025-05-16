import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import ProjectsSection from '../components/ProjectsSection';
import PartnerSection from '../components/PartnerSection';
import TestimonialsSection from '../components/TestimonialsSection';

export default function Projects() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('projects.title')}
        description={t('projects.description')}
        type="website"
      />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t('projects.title')}</h1>
        <div className="prose max-w-none">
          <p>{t('projects.content')}</p>
        </div>
      </div>
      <ProjectsSection />
      <PartnerSection />
      <TestimonialsSection />
    </>
  );
} 