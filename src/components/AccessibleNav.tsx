import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

interface AccessibleNavProps {
  items: NavItem[];
  onItemClick?: (href: string) => void;
}

const AccessibleNav: React.FC<AccessibleNavProps> = ({ items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleButtonClick();
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev === null ? 0 : (prev + 1) % items.length));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev === null ? items.length - 1 : (prev - 1 + items.length) % items.length));
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(items.length - 1);
        break;
    }
  };

  const handleItemClick = (href: string) => {
    setIsOpen(false);
    onItemClick?.(href);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isOpen]);

  useEffect(() => {
    if (focusedIndex !== null && menuRef.current) {
      const menuItems = menuRef.current.querySelectorAll('a');
      menuItems[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls="main-menu"
        aria-haspopup="true"
        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="sr-only">Toggle menu</span>
        <svg
          aria-hidden="true"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
            ref={menuRef}
            id="main-menu"
            role="menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 left-0"
          >
            {items.map((item, index) => (
              <li key={item.href} role="none">
                <a
                  href={item.href}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => handleItemClick(item.href)}
                  className={`
                    flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                    ${focusedIndex === index ? 'bg-gray-100' : ''}
                  `}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibleNav; 