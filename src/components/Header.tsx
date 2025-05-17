import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "../utils/smoothScroll";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNavbar from './MobileNavbar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      // Only update active section if we're on the home page
      if (location.pathname === '/') {
        const sections = ["home", "services", "projects", "team", "testimonials", "faq", "contact"];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Handle route changes
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      const hash = location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
      } else {
        setActiveSection('home');
      }
    }
  }, [location]);

  const handleNavigation = (path: string) => {
    if (path === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/products') {
      navigate('/products');
    } else {
      const sectionId = path.replace('/#', '');
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  const tabs = [
    { name: t('common.home'), path: "/", section: "home" },
    { name: t('common.services'), path: "/#services", section: "services" },
    { name: t('common.products'), path: "/#projects", section: "projects" },
    { name: t('common.team'), path: "/#team", section: "team" },
    { name: t('common.testimonials'), path: "/#testimonials", section: "testimonials" },
    { name: t('common.faq'), path: "/#faq", section: "faq" },
    { name: t('common.contact'), path: "/#contact", section: "contact" },
    { name: t('common.blog'), path: "https://neurolabog.blogspot.com", isExternal: true }
  ];

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.1
      }
    })
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#030329]/50 backdrop-blur-xl border-b border-white/10"
        : "bg-transparent"
        }`}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between space-x-2 cursor-pointer"
          >
            <div className="w-12 h-12 relative gap-10">
              <img
                src="/logo.png"
                alt="NeuroLab Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-tight">
              Neurolab
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {tabs.map((tab, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  onClick={() => {
                    if (tab.isExternal) {
                      window.open(tab.path, '_blank', 'noopener,noreferrer');
                    } else {
                      handleNavigation(tab.path);
                    }
                  }}
                  className={`relative px-2 py-1 text-sm font-medium transition-colors tracking-wide ${activeSection === tab.section
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-blue-400"
                    }`}
                >
                  {tab.name}
                  {activeSection === tab.section && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Navigation */}
          <MobileNavbar />
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
