import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('neurolab_cookie_consent');
        if (!consent) {
            // Delay showing the banner for a better UX
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
                    initial={{ opacity: 0, y: 100, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[420px] z-[100]"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/80 p-6 shadow-2xl backdrop-blur-xl">
                        {/* Background subtle glow */}
                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-50" />

                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Cookie size={20} />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-foreground tracking-tight">We Value Your Experience</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        We use cookies to improve your experience on our app. <a href="#" className="text-primary hover:underline underline-offset-4 transition-colors">Learn more</a>
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAcceptNecessary}
                                        className="h-9 px-4 text-xs font-medium border-border/50 bg-background/50 hover:bg-accent transition-colors"
                                    >
                                        Accept necessary only
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={handleAcceptAll}
                                        className="h-9 px-4 text-xs font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                    >
                                        Accept all
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
