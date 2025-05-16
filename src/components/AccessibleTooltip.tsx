import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibleTooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const AccessibleTooltip: React.FC<AccessibleTooltipProps> = ({
  content,
  children,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      switch (position) {
        case 'top':
          setCoords({
            x: rect.left + scrollX + rect.width / 2,
            y: rect.top + scrollY - 10
          });
          break;
        case 'bottom':
          setCoords({
            x: rect.left + scrollX + rect.width / 2,
            y: rect.bottom + scrollY + 10
          });
          break;
        case 'left':
          setCoords({
            x: rect.left + scrollX - 10,
            y: rect.top + scrollY + rect.height / 2
          });
          break;
        case 'right':
          setCoords({
            x: rect.right + scrollX + 10,
            y: rect.top + scrollY + rect.height / 2
          });
          break;
      }
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleFocus = () => {
    updatePosition();
    setIsVisible(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Only hide if focus is leaving the entire tooltip container
    if (!triggerRef.current?.contains(e.relatedTarget as Node)) {
      setIsVisible(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsVisible(false);
    }
  };

  // Clone the child element and add our event handlers
  const triggerElement = React.cloneElement(children, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    'aria-describedby': isVisible ? tooltipId : undefined
  });

  return (
    <div ref={triggerRef}>
      {triggerElement}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              left: coords.x,
              top: coords.y,
              transform: 'translate(-50%, -100%)',
              zIndex: 50,
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              pointerEvents: 'none'
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibleTooltip; 