import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface AccessibleNavProps {
  items: NavItem[];
  className?: string;
}

const AccessibleNav: React.FC<AccessibleNavProps> = ({ items, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index + 1) % items.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index - 1 + items.length) % items.length);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <nav
      ref={navRef}
      className={`relative ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <button
        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="main-menu"
        aria-haspopup="true"
      >
        <span className="sr-only">Toggle menu</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="main-menu"
            className={`absolute top-full mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${i18n.language === 'ar' ? 'right-0' : 'left-0'
              }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="menu"
          >
            {items.map((item, index) => (
              <li key={item.href} role="none">
                <a
                  href={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                    ${activeIndex === index ? 'bg-gray-100' : ''}
                  `}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AccessibleNav; 