import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  type?: 'text' | 'image' | 'card' | 'avatar';
  className?: string;
  width?: number | string;
  height?: number | string;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  className = '',
  width,
  height,
  count = 1
}) => {
  const getSkeletonStyles = () => {
    switch (type) {
      case 'text':
        return 'h-4 bg-gray-200 rounded';
      case 'image':
        return 'bg-gray-200 rounded-lg';
      case 'card':
        return 'bg-gray-200 rounded-lg p-4';
      case 'avatar':
        return 'bg-gray-200 rounded-full';
      default:
        return 'bg-gray-200 rounded';
    }
  };

  const renderSkeleton = () => {
    const baseStyles = getSkeletonStyles();
    const style = {
      width: width || (type === 'avatar' ? '40px' : '100%'),
      height: height || (type === 'avatar' ? '40px' : 'auto')
    };

    return (
      <motion.div
        className={`${baseStyles} ${className}`}
        style={style}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    );
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </div>
  );
};

export default Skeleton; 