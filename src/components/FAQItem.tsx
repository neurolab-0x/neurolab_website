import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqCardProps {
  description: string;
  icon: string;
  explanation: string;
}

const FaqCard = ({ description, icon, explanation }: FaqCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
      >
        <h3 className="text-lg font-medium text-white text-left">{description}</h3>
        <motion.span
          animate={{ rotate: isExpanded ? 45 : 0 }}
          className="text-2xl text-blue-400"
        >
          {icon}
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-gray-300 leading-relaxed">{explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqCard;
