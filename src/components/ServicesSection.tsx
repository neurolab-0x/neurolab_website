import { motion } from "framer-motion";
import Card from "./Card";
import FadeInSection from "./FadeInSection";
import { FaBolt, FaBrain, FaChartBar, FaFlask, FaCheckCircle } from "react-icons/fa";

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Real-time EEG Processing",
      description: "Advanced algorithms for real-time EEG signal processing and noise reduction, ensuring high-quality data analysis.",
      icon: <FaBolt size={32} />,
      features: ["Real-time filtering", "Noise reduction", "Signal enhancement"]
    },
    {
      title: "AI Pattern Recognition",
      description: "State-of-the-art machine learning models for detecting and classifying EEG patterns and anomalies.",
      icon: <FaBrain size={32} />,
      features: ["Pattern detection", "Anomaly classification", "Predictive analytics"]
    },
    {
      title: "Data Visualization",
      description: "Interactive 3D brain mapping and comprehensive visualization tools for EEG data analysis.",
      icon: <FaChartBar size={32} />,
      features: ["3D brain mapping", "Interactive charts", "Custom dashboards"]
    },
    {
      title: "Research Integration",
      description: "Seamless integration with research databases and export capabilities for academic collaboration.",
      icon: <FaFlask size={32} />,
      features: ["Database integration", "Data export", "Collaboration tools"]
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#030329] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        {/* Floating circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto relative">
        <FadeInSection direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Our Core Features
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Powerful tools designed to transform EEG data analysis and research
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <FadeInSection
              key={index}
              direction="up"
              delay={0.2 + index * 0.1}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
                style={{
                  transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                }}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Card
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  height="auto"
                  width="100%"
                  className="group hover:scale-105 transition-all duration-300 hover:shadow-xl"
                  iconClassName="mb-4 group-hover:scale-110 transition-transform duration-300"
                  titleClassName="text-xl font-bold mb-2 text-white tracking-tight"
                  descriptionClassName="text-gray-300 mb-4 leading-relaxed tracking-wide"
                >
                  <div className="mt-4 space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <FaCheckCircle
                          className="text-blue-400 flex-shrink-0 drop-shadow-glow"
                        />
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
