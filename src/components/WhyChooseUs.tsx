import { motion } from "framer-motion";
import Card from './Card'
import FadeInSection from './FadeInSection'
import { FaBullseye, FaBolt, FaBook, FaUniversity, FaShieldAlt, FaChartLine, FaCheck } from "react-icons/fa";

export default function WhyUs() {
    const numbers = [
        {
            number: "94.6%",
            text: "Accuracy Rate",
            icon: <FaBullseye size={32} />,
            description: "Industry-leading accuracy in EEG pattern recognition"
        },
        {
            number: "50ms",
            text: "Processing Speed",
            icon: <FaBolt size={32} />,
            description: "Near real-time processing of complex EEG data"
        },
        {
            number: "100+",
            text: "Research Papers",
            icon: <FaBook size={32} />,
            description: "Backed by extensive academic research"
        },
        {
            number: "50+",
            text: "Universities",
            icon: <FaUniversity size={32} />,
            description: "Trusted by leading academic institutions"
        }
    ];

    const cardContent = [
        {
            icon: <FaBolt size={32} />,
            title: "High-Performance Processing",
            descriptions: "Our platform processes EEG data in real-time with minimal latency, ensuring immediate insights.",
            width: "100%",
            height: "auto",
            features: ["Real-time analysis", "Low latency", "High throughput"]
        },
        {
            icon: <FaShieldAlt size={32} />,
            title: "Secure & Compliant",
            descriptions: "Enterprise-grade security with HIPAA compliance and advanced encryption for data protection.",
            width: "100%",
            height: "auto",
            features: ["HIPAA compliant", "End-to-end encryption", "Regular audits"]
        },
        {
            icon: <FaChartLine size={32} />,
            title: "Advanced Analytics",
            descriptions: "Comprehensive analytics suite with customizable reports and research-grade data export.",
            width: "100%",
            height: "auto",
            features: ["Custom reports", "Data visualization", "Export options"]
        }
    ];

    return (
        <section className="py-20 bg-[#030329] relative overflow-hidden">
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
                    className="absolute top-2/4 left-2/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
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

            <div className="container mx-auto px-4 relative">
                <FadeInSection direction="up" delay={0.2}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Why Choose Our Products
                            </span>
                        </h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed tracking-wide">
                            Our EEG data processing platform combines cutting-edge AI with advanced signal processing techniques.
                            We provide researchers and clinicians with powerful tools for brainwave analysis, pattern recognition,
                            and data visualization.
                        </p>
                    </div>
                </FadeInSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <FadeInSection direction="right" delay={0.4}>
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                {numbers.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        className="group relative p-6 backdrop-blur-xl border border-white/10 rounded-xl"
                                        style={{
                                            transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                                        }}
                                    >
                                        {/* Card glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="mb-4">{item.icon}</div>
                                        <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                            {item.number}
                                        </h3>
                                        <p className="text-gray-300 font-medium">{item.text}</p>
                                        <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </FadeInSection>

                    <FadeInSection direction="left" delay={0.6}>
                        <div className="space-y-6">
                            {cardContent.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="group relative"
                                    style={{
                                        transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                                    }}
                                >
                                    {/* Card glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <Card
                                        icon={item.icon}
                                        title={item.title}
                                        description={item.descriptions}
                                        width={item.width}
                                        height={item.height}
                                        className="group hover:scale-105 transition-all duration-300 hover:shadow-xl"
                                        iconClassName="mb-4 group-hover:scale-110 transition-transform duration-300"
                                        titleClassName="text-xl font-bold mb-2 text-white tracking-tight"
                                        descriptionClassName="text-gray-300 mb-4 leading-relaxed tracking-wide"
                                    >
                                        <div className="mt-4 space-y-2">
                                            {item.features.map((feature, featureIndex) => (
                                                <motion.div
                                                    key={featureIndex}
                                                    whileHover={{ x: 5 }}
                                                    className="flex items-center gap-2 text-gray-300"
                                                >
                                                    <div className="text-blue-400 flex-shrink-0 drop-shadow-glow">
                                                        <FaCheck size={18} />
                                                    </div>
                                                    <span className="text-sm">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </section>
    );
}