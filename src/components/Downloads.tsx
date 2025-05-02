import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { FaCheckCircle, FaGooglePlay, FaApple, FaWindows, FaLinux, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Downloads() {
    const [showDialog, setShowDialog] = useState(false);

    const handleDownloadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowDialog(true);
    };

    const downloads = [
        {
            title: "Download Mobile",
            description: "Experience our advanced EEG analysis on the go. Perfect for patients and general users who want to monitor their brain activity anywhere, anytime.",
            icon: "📱",
            gradient: "from-blue-500 to-purple-500",
            features: ["Real-time monitoring", "User-friendly interface", "Secure data storage"],
            downloadOptions: [
                {
                    platform: "Google Play",
                    icon: <FaGooglePlay className="w-7 h-7" />,
                    link: "#"
                },
                {
                    platform: "Apple Store",
                    icon: <FaApple className="w-7 h-7" />,
                    link: "#"
                }
            ]
        },
        {
            title: "Download Desktop",
            description: "Access comprehensive EEG analysis tools and detailed patient data. Designed for medical professionals who need advanced diagnostic capabilities.",
            icon: "💻",
            gradient: "from-purple-500 to-blue-500",
            features: ["Advanced analytics", "Multi-patient management", "Research tools"],
            downloadOptions: [
                {
                    platform: "Windows",
                    icon: <FaWindows className="w-7 h-7" />,
                    link: "#"
                },
                {
                    platform: "Linux",
                    icon: <FaLinux className="w-7 h-7" />,
                    link: "#"
                }
            ]
        }
    ];

    return (
        <section className="py-20 bg-[#030329] relative overflow-hidden">
            {/* Enhanced background elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_50%)]" />

                {/* Enhanced floating circles */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-4 relative">
                <FadeInSection direction="up" delay={0.2}>
                    <div className="text-center mb-20">
                        {/* Enhanced badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="inline-block mb-6"
                        >
                            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 backdrop-blur-sm">
                                🚀 Choose Your Platform
                            </span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Download Our Apps
                            </span>
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Experience NeuroLab's cutting-edge EEG analysis technology across platforms. Choose the version that best suits your needs.
                        </p>
                    </div>
                </FadeInSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {downloads.map((item, index) => (
                        <FadeInSection key={index} direction="up" delay={0.2 + index * 0.1}>
                            <motion.div
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl overflow-hidden"
                            >
                                {/* Enhanced card glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative flex flex-col items-center text-center">
                                    {/* Enhanced icon */}
                                    <motion.div
                                        className="text-5xl mb-6 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {item.icon}
                                    </motion.div>

                                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed">{item.description}</p>

                                    {/* Features list */}
                                    <div className="w-full space-y-3 mb-8">
                                        {item.features.map((feature, i) => (
                                            <div key={i} className="flex items-center justify-center space-x-2">
                                                <FaCheckCircle className="text-blue-400 w-4 h-4" />
                                                <span className="text-gray-300 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="w-full mb-8 gap-4 border-t border-white/10 pt-4">
                                        <div className="flex flex-row items-center justify-center gap-6">
                                            {item.downloadOptions.map((option, i) => (
                                                <motion.a
                                                    key={i}
                                                    href={option.link}
                                                    onClick={handleDownloadClick}
                                                    className="inline-flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm border border-white/10 text-white transition-all duration-300 cursor-pointer"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {option.icon}
                                                    <div className="text-left">
                                                        <div className="text-sm sm:text-base font-semibold">{option.platform}</div>
                                                    </div>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </FadeInSection>
                    ))}
                </div>
            </div>

            {/* Development Dialog */}
            <AnimatePresence>
                {showDialog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setShowDialog(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-white">Under Development</h3>
                                <button
                                    onClick={() => setShowDialog(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            <p className="text-gray-300 mb-6">
                                Our application is currently under development. We're working hard to bring you the best experience possible. Please check back soon!
                            </p>
                            <div className="flex justify-end">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowDialog(false)}
                                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
                                >
                                    I Understand
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}