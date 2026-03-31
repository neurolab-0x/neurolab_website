import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('neurolab_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('neurolab_cookie_consent', 'all');
        setIsVisible(false);
    };

    const handleAcceptNecessary = () => {
        localStorage.setItem('neurolab_cookie_consent', 'necessary');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-48px)] max-w-3xl -translate-x-1/2"
                >
                    <div
                        className="relative overflow-hidden rounded-2xl border border-slate-500/20 bg-[#05050A]/90 p-4 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8"
                    >
                        {/* Animated loading indicator */}
                        <div className="absolute top-0 left-0 h-[1px] w-full overflow-hidden opacity-30">
                            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-slate-400 to-transparent flex animate-[surgical-shimmer_3s_ease-in-out_infinite]" />
                        </div>

                        {/* Ambient glow effect */}
                        <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl opacity-50 pointer-events-none" />

                        <div className="relative z-10 flex-1 flex flex-col pl-2 py-1">
                            <p
                                style={{ fontFamily: sfPro, letterSpacing: '-0.01em' }}
                                className="text-sm text-slate-300 leading-relaxed md:pr-4"
                            >
                                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                            </p>
                        </div>

                        <div className="relative z-10 flex w-full md:w-auto items-center justify-end gap-3 shrink-0">
                            <button
                                onClick={handleAcceptNecessary}
                                className="h-10 px-4 text-[12px] font-medium text-slate-400 transition-all hover:text-white"
                                style={{ fontFamily: sfPro }}
                            >
                                Essential Only
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="h-10 rounded-full px-6 text-[12px] font-semibold text-[#05050A] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                                style={{ background: '#F8FAFC', fontFamily: sfPro }}
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
