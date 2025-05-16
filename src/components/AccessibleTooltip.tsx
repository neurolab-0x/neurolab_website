import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface AccessibleTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const AccessibleTooltip: React.FC<AccessibleTooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleFocus = () => {
    updatePosition();
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getPositionStyles = () => {
    const baseStyles = 'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg';
    const arrowSize = 6;

    switch (position) {
      case 'top':
        return `
          ${baseStyles}
          transform -translate-x-1/2 -translate-y-full
          bottom-full mb-${arrowSize}
        `;
      case 'bottom':
        return `
          ${baseStyles}
          transform -translate-x-1/2
          top-full mt-${arrowSize}
        `;
      case 'left':
        return `
          ${baseStyles}
          transform -translate-x-full -translate-y-1/2
          right-full mr-${arrowSize}
        `;
      case 'right':
        return `
          ${baseStyles}
          transform -translate-y-1/2
          left-full ml-${arrowSize}
        `;
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        role="tooltip"
        tabIndex={0}
        className={className}
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={getPositionStyles()}
            style={{
              left: coords.x,
              top: coords.y
            }}
            role="tooltip"
          >
            {content}
          </motion.div>,
          document.body
        )}
    </>
  );
};

export default AccessibleTooltip; 