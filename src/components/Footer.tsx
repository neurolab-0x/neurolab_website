import { motion } from "framer-motion";
import { FaCopyright, FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    const socialLinks = [
        { icon: <FaLinkedin />, url: "https://linkedin.com/company/neurolab", label: "LinkedIn" },
        { icon: <FaXTwitter />, url: "https://x.com/neurolab", label: "Twitter" },
        { icon: <FaGithub />, url: "https://github.com/neurolab-0x", label: "GitHub" },
        { icon: <FaEnvelope />, url: "mailto:info@neurolab.cc", label: "Email" }
    ];

    const footerLinks = [
        { title: "About", links: ["Our Story", "Team", "Careers"] },
        { title: "Services", links: ["EEG Analysis", "AI Solutions", "Research"] },
        { title: "Resources", links: ["Documentation", "Blog", "Support"] },
        { title: "Legal", links: ["Privacy Policy", "Terms of Service"] }
    ];

    return (
        <footer className="py-8 bg-[#030329] relative overflow-hidden border-t border-white/10">
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

            <div className="container mx-auto px-4 relative">
                {/* Top Section: Logo and Social Links */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center mb-4 md:mb-0">
                        <img src="/logo.png" alt="Neurolab Logo" className="w-25 h-25" />
                        <span className="text-white font-bold text-xl">Neurolab</span>
                    </div>
                    <div className="flex gap-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white text-lg hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Middle Section: Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {footerLinks.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-3"
                        >
                            <h3 className="text-base font-semibold text-white">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <motion.li
                                        key={linkIndex}
                                        whileHover={{ x: 5 }}
                                        className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer text-sm"
                                    >
                                        {link}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Section: Address and Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2 text-gray-400"
                    >
                        <FaMapMarkerAlt className="text-blue-400" />
                        <p className="text-sm">
                            Kigali, Rwanda
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-2 text-gray-400"
                    >
                        <FaCopyright className="text-sm" />
                        <p className="text-sm">
                            {getCurrentYear()} Neurolab. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}