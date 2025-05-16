import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    document.documentElement.dir = languageCode === 'ar' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-white/10 text-white"
      >
        <span>{currentLanguage.flag}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800/90 backdrop-blur-xl border border-white/10 shadow-lg"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-700/50 transition-colors ${i18n.language === language.code ? 'bg-gray-700/50' : ''
                }`}
            >
              <span className="flex items-center space-x-2">
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 