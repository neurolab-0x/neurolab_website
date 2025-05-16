import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import TeamSection from '../components/TeamSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSection from '../components/TestimonialsSection';

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('about.title')}
        description={t('about.description')}
        type="website"
      />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t('about.title')}</h1>
        <div className="prose max-w-none">
          <p>{t('about.content')}</p>
        </div>
      </div>
      <TeamSection />
      <WhyChooseUs />
      <TestimonialsSection />
    </>
  );
} 