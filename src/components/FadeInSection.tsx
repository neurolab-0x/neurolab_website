import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = ""
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: 50 };
      case "right":
        return { opacity: 0, x: -50 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
        return { opacity: inView ? 1 : 0, y: inView ? 0 : 50 };
      case "down":
        return { opacity: inView ? 1 : 0, y: inView ? 0 : -50 };
      case "left":
        return { opacity: inView ? 1 : 0, x: inView ? 0 : 50 };
      case "right":
        return { opacity: inView ? 1 : 0, x: inView ? 0 : -50 };
      default:
        return { opacity: inView ? 1 : 0, y: inView ? 0 : 50 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={getAnimatePosition()}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom easing for smoother animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
