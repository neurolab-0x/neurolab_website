import { motion } from "framer-motion";
import "../index.css";
import { FaHandshake } from "react-icons/fa";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full page background image */}
      <div className="absolute inset-0">
        <img
          src="/hero.webp"
          alt="NeuroLab Technology"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom shadow/gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to top, #030329 80%, transparent 100%)' }} />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex items-center min-h-screen">
        <div className="w-full max-w-2xl px-6 md:px-16 lg:px-24 py-16">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Empowering <span className="futuristic-gradient-animate">Neural Innovation</span> with AI & Hardware
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Unlock the future of brain-computer interfaces with real-time neural data processing, advanced AI algorithms, and custom hardware solutions. Seamless brain-machine communication starts here.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold tracking-wide hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              <FaHandshake className="mr-2" />
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
