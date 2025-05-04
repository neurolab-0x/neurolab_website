import { motion } from "framer-motion";
import Card from "./Card";
import FadeInSection from "./FadeInSection";
import { FaBrain, FaMicrochip, FaRobot, FaFlask, FaCheckCircle } from "react-icons/fa";

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Custom BCI Hardware",
      description: "State-of-the-art brain-computer interface devices with high-precision sensors and real-time data acquisition capabilities.",
      icon: <FaMicrochip size={32} />,
      features: ["High-precision sensors", "Real-time acquisition", "Custom hardware solutions"]
    },
    {
      title: "AI Neural Processing",
      description: "Advanced machine learning algorithms for real-time neural signal processing and pattern recognition.",
      icon: <FaBrain size={32} />,
      features: ["Neural pattern detection", "Real-time processing", "Adaptive learning"]
    },
    {
      title: "Brain-Machine Interface",
      description: "Seamless integration between neural signals and machine control systems for various applications.",
      icon: <FaRobot size={32} />,
      features: ["Control systems", "Signal translation", "Application integration"]
    },
    {
      title: "Research & Development",
      description: "Cutting-edge research in BCI technology and custom solutions for academic and industrial applications.",
      icon: <FaFlask size={32} />,
      features: ["Custom solutions", "Research collaboration", "Technology transfer"]
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
                Our Core Technologies
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Comprehensive solutions combining hardware, AI, and brain-computer interface technology
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
