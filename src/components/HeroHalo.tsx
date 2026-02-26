interface HeroHaloProps {
    className?: string;
}

const HeroHalo = ({ className = '' }: HeroHaloProps) => {
    return (
        <div
            className={`absolute inset-0 rounded-full ${className}`}
            style={{
                background: 'hsl(var(--electric-blue))',
                filter: 'blur(200px)',
                opacity: 0.08,
            }}
            aria-hidden="true"
        />
    );
};

export default HeroHalo;
