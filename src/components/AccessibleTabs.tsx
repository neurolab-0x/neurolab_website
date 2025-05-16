import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

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
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [focusedTab, setFocusedTab] = useState<string | null>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === tabId);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
    }

    const newTab = tabs[newIndex];
    if (!newTab.disabled) {
      handleTabClick(newTab.id);
      setFocusedTab(newTab.id);
    }
  };

  return (
    <div className={className}>
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Tabs"
        className="flex border-b border-gray-200"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            onFocus={() => setFocusedTab(tab.id)}
            onBlur={() => setFocusedTab(null)}
            className={`
              px-4 py-2 text-sm font-medium border-b-2 -mb-px
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className="mt-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {tab.content}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AccessibleTabs;