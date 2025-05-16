import { motion } from 'framer-motion';

interface LoadingStateProps {
  variant?: 'spinner' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingState({ variant = 'spinner', size = 'md', className = '' }: LoadingStateProps) {
  const renderSpinner = () => (
    <motion.div
      className={`border-2 border-gray-200 border-t-indigo-600 rounded-full ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  const renderDots = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`bg-indigo-600 rounded-full ${sizeClasses[size]}`}
          animate={{
            y: ['0%', '-50%', '0%'],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={`bg-indigo-600 rounded-full ${sizeClasses[size]} ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ opacity: 1 }}
    />
  );

  switch (variant) {
    case 'dots':
      return renderDots();
    case 'pulse':
      return renderPulse();
    case 'spinner':
    default:
      return renderSpinner();
  }
} 