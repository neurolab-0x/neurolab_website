import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ProjectsSection from '../components/ProjectsSection';
import FAQSection from '../components/FAQSection';

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('services.title')}
        description={t('services.description')}
        type="website"
      />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t('services.title')}</h1>
        <div className="prose max-w-none">
          <p>{t('services.content')}</p>
        </div>
      </div>
      <ServicesSection />
      <WhyChooseUs />
      <ProjectsSection />
      <FAQSection />
    </>
  );
} 