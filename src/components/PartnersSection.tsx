import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Using correct type definition for dynamic list
type Partner = { name: string; domain?: string; icon?: string; logo?: string };

const PartnerLogo = ({ partner }: { partner: Partner }) => {
    const [imgSrc, setImgSrc] = useState(partner.logo || (partner.domain ? `https://logo.clearbit.com/${partner.domain}` : ''));

    return (
        <div className="flex items-center gap-3 text-slate-400 grayscale transition-all duration-300 hover:text-slate-800 hover:grayscale-0">
            <img
                src={imgSrc}
                alt={`${partner.name} logo`}
                className="h-8 w-auto object-contain rounded-sm mix-blend-multiply"
                onError={() => {
                    if (imgSrc.includes('clearbit')) {
                        setImgSrc(`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`);
                    }
                }}
            />
            <span className="text-xl font-medium">{partner.name}</span>
        </div>
    );
};

const PartnersSection = () => {
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        // Fetch dynamically added partners from the CMS output
        import('@/content/partners/data.json')
            .then((module) => {
                if (module.partners && Array.isArray(module.partners)) {
                    setPartners(module.partners);
                }
            })
            .catch((err) => console.error("Could not load partners data:", err));
    }, []);

    if (partners.length === 0) return null;

    return (
        <section className="border-t border-slate-100 bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                        Trusted by pioneering institutions worldwide
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Our Partners
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-6xl relative overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                    <motion.div
                        className="flex flex-none gap-16 pr-16"
                        animate={{ x: '-100%' }}
                        transition={{
                            duration: 50,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {[...partners, ...partners].map((partner, index) => (
                            <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
                        ))}
                    </motion.div>
                    {/* Duplicate for seamless infinite scroll */}
                    <motion.div
                        className="flex flex-none gap-16 pr-16"
                        animate={{ x: '-100%' }}
                        transition={{
                            duration: 50,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {[...partners, ...partners].map((partner, index) => (
                            <PartnerLogo key={`second-${partner.name}-${index}`} partner={partner} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
