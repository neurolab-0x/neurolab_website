import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInSection from './FadeInSection';
import { FaExternalLinkAlt, FaHandshake, FaCheckCircle } from 'react-icons/fa';

interface Partner {
  name: string;
  logo: string;
  description: string;
  website: string;
  achievements?: string[];
  collaboration?: string;
}

const partners: Partner[] = [
  {
    name: 'Rwanda Coding Academy',
    logo: '/partners/rca.png',
    description: 'Leading provider of quality coding education',
    website: 'https://rca.ac.rw',
    achievements: [
      'Pioneering coding education in Rwanda',
      'Producing top-tier software engineers',
      'Innovative curriculum development'
    ],
    collaboration: 'Educational Partnership & Research'
  },
  {
    name: 'Benax Technologies',
    logo: '/partners/benax.png',
    description: 'Specialized in advanced IoT solutions',
    website: 'https://benax.rw',
    achievements: [
      'Cutting-edge IoT implementations',
      'Smart city solutions',
      'Hardware-software integration'
    ],
    collaboration: 'Hardware Development & Integration'
  },
  {
    name: 'SandTech Technologies',
    logo: '/partners/sandtech.png',
    description: 'Pioneers in cybersecurity and software development with AI',
    website: 'https://sandtech.com',
    achievements: [
      'Advanced AI implementations',
      'Enterprise security solutions',
      'Cloud infrastructure expertise'
    ],
    collaboration: 'AI Integration & Security'
  },
  {
    name: 'Neuralink Technologies',
    logo: '/partners/neuralink.png',
    description: 'Leading provider of invasive EEG hardware and software solutions',
    website: 'https://neuralink.com',
    achievements: [
      'Breakthrough neural interfaces',
      'Advanced EEG technology',
      'Medical device innovation'
    ],
    collaboration: 'Hardware Development & Research'
  }
];

const PartnerSection: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <section className="py-20 bg-[#030329] relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <FadeInSection direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Our Partners
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
                We collaborate with industry leaders to bring you the best in EEG analysis technology.
                Our partnerships ensure cutting-edge solutions and continuous innovation.
              </p>
            </motion.div>
          </div>
        </FadeInSection>

        <div className="max-w-7xl mx-auto">
          <FadeInSection direction="up" delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredPartner(partner.name)}
                  onHoverEnd={() => setHoveredPartner(null)}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="h-full p-6 bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 group-hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedPartner(partner)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 mb-4 relative group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredPartner === partner.name ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {partner.description}
                      </p>
                      <div className="flex items-center space-x-2 text-blue-400">
                        <FaHandshake className="text-sm" />
                        <span className="text-sm font-medium">{partner.collaboration}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </FadeInSection>

          <AnimatePresence>
            {selectedPartner && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedPartner(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative bg-[#030329] rounded-2xl p-8 max-w-2xl w-full border border-white/10 overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20">
                    <div className="absolute inset-0 bg-[#030329] rounded-2xl" />
                  </div>

                  {/* Content container */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm" />
                          <img
                            src={selectedPartner.logo}
                            alt={selectedPartner.name}
                            className="relative w-20 h-20 object-contain rounded-xl"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{selectedPartner.name}</h3>
                          <div className="flex items-center space-x-2 text-blue-400">
                            <FaHandshake className="text-sm" />
                            <span className="text-sm font-medium">{selectedPartner.collaboration}</span>
                          </div>
                        </div>
                      </div>
                      <motion.a
                        href={selectedPartner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <FaExternalLinkAlt size={20} />
                      </motion.a>
                    </div>

                    <div className="space-y-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg" />
                        <p className="relative text-gray-300 p-4 leading-relaxed">
                          {selectedPartner.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white flex items-center">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                            Key Achievements
                          </span>
                        </h4>
                        <ul className="space-y-3">
                          {selectedPartner.achievements?.map((achievement, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start space-x-3 text-gray-300 group"
                            >
                              <FaCheckCircle className="text-blue-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                              <span className="group-hover:text-white transition-colors">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Close button */}
                    <motion.button
                      onClick={() => setSelectedPartner(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <FadeInSection direction="up" delay={0.6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-400 mb-6">
                Interested in becoming a partner?
              </p>
              <motion.a
                href="/request-partnership"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold tracking-wide hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                <FaHandshake className="mr-2" />
                Get in Touch
              </motion.a>
            </motion.div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection; 