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
        {
            title: "Resources", links: [
                { name: "Documentation", href: "/documentation" },
                { name: "Blog", href: "https://neurolablog.blogspot.com", external: true },
                { name: "Support", href: "/support" }
            ]
        },
        {
            title: "Legal", links: [
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms-of-service" }
            ]
        }
    ];

    return (
        <footer className="bg-[#030329] border-t border-white/10 pt-12 pb-4 relative z-10">
            <div className="container mx-auto px-4">
                {/* Social icons row */}
                <div className="flex justify-center gap-6 mb-8">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white text-lg hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {footerLinks.map((section, idx) => (
                        <div key={idx}>
                            <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link, i) => (
                                    typeof link === 'string' ? (
                                        <li key={i} className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">{link}</li>
                                    ) : (
                                        <li key={i}>
                                            <a
                                                href={link.href}
                                                target={link.external ? "_blank" : undefined}
                                                rel={link.external ? "noopener noreferrer" : undefined}
                                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
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