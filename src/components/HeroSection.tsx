import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";

const HeroSection: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const words = [
    { text: "Advanced", gradient: "from-blue-400 to-purple-400" },
    { text: "EEG Data Processing", gradient: "" },
    { text: "with ", gradient: "" },
    { text: "AI", gradient: "from-purple-400 to-blue-400" }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030329]">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_50%)]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto text-center">
          <FadeInSection direction="up" delay={0.2}>
            <div className="space-y-10">
              {/* Subtle badge above title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block"
              >
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 backdrop-blur-sm">
                  🧠 Next-Gen Neural Analysis
                </span>
              </motion.div>
              {/* Enhanced title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2] tracking-tight">
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className={`${word.gradient
                      ? `text-transparent bg-clip-text bg-gradient-to-r ${word.gradient} font-extrabold`
                      : 'font-light text-gray-100'
                      } ${index === 1 ? 'block mt-2' : 'inline-block'}`}
                  >
                    {word.text}
                  </motion.span>
                ))}
              </h1>
              {/* Enhanced description */}
              <motion.p
                className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-wide max-w-2xl mx-auto font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Transform raw EEG data into meaningful insights with our cutting-edge AI-powered analysis platform. Experience real-time processing, accurate pattern recognition, and comprehensive brainwave analysis.
              </motion.p>
              {/* Enhanced CTA section */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 pt-8 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
              </motion.div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
