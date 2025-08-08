import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccessibleTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  onChange?: (tabId: string) => void;
}

const AccessibleTabs: React.FC<AccessibleTabsProps> = ({
  tabs,
  defaultTab,
  className = '',
  onChange
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === tabId);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    const newTab = tabs[newIndex];
    if (!newTab.disabled) {
      handleTabClick(newTab.id);
    }
  };

  return (
    <div className={className}>
      <div className="tab-buttons flex space-x-2">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            aria-disabled={tab.disabled}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            className={`px-4 py-2 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${activeTab === tab.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: tab.disabled ? 1 : 1.05 }}
            whileTap={{ scale: tab.disabled ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      <div className="tab-panels mt-4">
        <AnimatePresence mode="wait">
          {tabs.map(tab => (
            <motion.div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeTab === tab.id ? 1 : 0,
                y: activeTab === tab.id ? 0 : 20
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={activeTab === tab.id ? 'block' : 'hidden'}
            >
              {tab.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccessibleTabs;