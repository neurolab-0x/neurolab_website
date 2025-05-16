import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import { ContactForm } from '../components/ContactForm';
import { useAppUtils } from '../hooks/useAppUtils';
import { contactSchema } from '../lib/validation';

export default function FAQ() {
  const { t } = useTranslation();
  const { handleError, handleSuccess } = useAppUtils();

  const handleSubmit = async (data: any) => {
    try {
      // Here you would typically send the form data to your backend
      console.log('Form data:', data);
      handleSuccess(t('contact.success'));
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return (
    <>
      <SEO
        title={t('faq.title')}
        description={t('faq.description')}
        type="website"
      />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t('faq.title')}</h1>
        <div className="prose max-w-none mb-16">
          <p>{t('faq.content')}</p>
        </div>
        <FAQSection />
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">{t('faq.contactTitle')}</h2>
          <div className="max-w-2xl mx-auto">
            <ContactForm
              schema={contactSchema}
              onSubmit={handleSubmit}
              submitText={t('contact.submit')}
            />
          </div>
        </div>
      </div>
    </>
  );
} 