import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Brain, ArrowRight, Sparkles, Triangle, Box, Circle, Hexagon, Diamond, Octagon, Stethoscope, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';

const AIPlatform = () => {
    const { ref: heroRef, isVisible: heroVis } = useScrollReveal(0.2);
    const { ref: sandboxRef, isVisible: sandboxVis } = useScrollReveal(0.1);
    const [activeVariant, setActiveVariant] = useState<'doctor' | 'patient'>('doctor');
    const { theme, setTheme } = useTheme();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const desktopRef = useRef<HTMLDivElement>(null);

    // Window state: position and size
    const [windowPos, setWindowPos] = useState({ x: 100, y: 50 });
    const [windowSize, setWindowSize] = useState({ width: 1000, height: 600 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Fallback to localhost if env var is not set
    const platformUrl = import.meta.env.VITE_PLATFORM_URL || 'http://localhost:8084';
    const sandboxUrl = `${platformUrl}?sandbox=${activeVariant}&theme=${theme}`;

    // Mouse handlers for dragging
    const handleDragStart = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.window-controls')) return;
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - windowPos.x,
            y: e.clientY - windowPos.y
        });
    };

    // Mouse handlers for resizing
    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setWindowPos({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                });
            }
            if (isResizing) {
                setWindowSize({
                    width: Math.max(600, e.clientX - windowPos.x),
                    height: Math.max(400, e.clientY - windowPos.y)
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, dragOffset, windowPos]);

    // Handle messages FROM the sandbox iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'THEME_UPDATE') {
                const newTheme = event.data.theme;
                if (newTheme === 'light' || newTheme === 'dark') {
                    setTheme(newTheme);
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [setTheme]);

    // Send theme updates TO the sandbox iframe when page theme changes
    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type: 'THEME_UPDATE',
                theme: theme
            }, '*');
        }
    }, [theme]);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />
            <main className="relative pt-24 pb-32 overflow-hidden">
                {/* Global ambient lighting */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

                {/* Hero Section */}
                <section className="relative z-10 px-6 pt-20 pb-16 md:pt-32 md:pb-20 max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div
                        ref={heroRef}
                        className="flex flex-col items-center transition-all duration-[800ms] ease-out"
                        style={{
                            opacity: heroVis ? 1 : 0,
                            transform: heroVis ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                        }}
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                            <Sparkles size={16} className="text-primary" />
                            <span>Introducing Neurolab Workspace</span>
                        </div>

                        <h1 className="mb-6 max-w-6xl text-[4rem] font-extrabold leading-[1] tracking-tight sm:text-[5.5rem] lg:text-[6.5rem] bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground/60 transition-all duration-500 text-center">
                            The clinical OS for <br /><span className="text-foreground">neurological intelligence</span>
                        </h1>

                        <p className="mb-10 max-w-2xl text-lg sm:text-xl text-muted-foreground/80 leading-relaxed transition-all duration-500 text-center font-medium mx-auto">
                            The first purpose-built workspace for planning, building, and scaling neurological insights. Designed with AI assistants at the core.
                        </p>
                    </div>
                </section>

                {/* Interactive Desktop Section */}
                <section className="relative z-10 w-full min-h-[900px] px-4 py-20 overflow-hidden">
                    <div
                        ref={desktopRef}
                        className="relative w-full max-w-[1700px] h-[850px] mx-auto rounded-[32px] border border-white/5 bg-zinc-950/50 overflow-hidden shadow-2xl group"
                    >
                        {/* Environment background layer */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
                            style={{ backgroundImage: 'url("/desktop.png")' }}
                        />
                        <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px]" />

                        {/* Desktop Icons (Decoration) */}
                        <div className="absolute top-12 left-12 flex flex-col gap-8 opacity-40 hover:opacity-100 transition-opacity">
                            <div className="flex flex-col items-center gap-1 cursor-pointer group/icon">
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/icon:bg-white/20 transition-colors">
                                    <Brain size={24} className="text-white" />
                                </div>
                                <span className="text-[10px] font-medium text-white/60">Core_OS</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 cursor-pointer group/icon">
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/icon:bg-white/20 transition-colors">
                                    <Box size={24} className="text-white" />
                                </div>
                                <span className="text-[10px] font-medium text-white/60">Assets</span>
                            </div>
                        </div>

                        {/* Draggable Sandbox Window */}
                        <div
                            ref={sandboxRef}
                            style={{
                                position: 'absolute',
                                left: `${windowPos.x}px`,
                                top: `${windowPos.y}px`,
                                width: `${windowSize.width}px`,
                                height: `${windowSize.height}px`,
                                opacity: sandboxVis ? 1 : 0,
                                transform: sandboxVis ? 'scale(1)' : 'scale(0.95)',
                                transition: isDragging || isResizing ? 'none' : 'opacity 1s ease-out, transform 1s ease-out'
                            }}
                            className={`z-20 flex flex-col rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/20 bg-background/90 backdrop-blur-3xl ${isDragging ? 'cursor-grabbing select-none' : ''}`}
                        >
                            {/* Window Header (Title Bar) */}
                            <div
                                onMouseDown={handleDragStart}
                                className="h-11 flex items-center justify-between px-4 bg-zinc-900/40 border-b border-white/5 cursor-grab active:cursor-grabbing backdrop-blur-md"
                            >
                                <div className="flex gap-2 window-controls">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner" />
                                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner" />
                                    <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-1.5 text-[11px] font-medium text-white/50 border border-white/5">
                                        <Brain size={12} className="opacity-50" />
                                        <span>sandbox.neurolab.inc — {activeVariant}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {/* Variant Toggle inside Window */}
                                    <div className="flex items-center p-0.5 rounded-lg bg-black/20 border border-white/5">
                                        <button
                                            onClick={() => setActiveVariant('doctor')}
                                            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${activeVariant === 'doctor' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                                        >
                                            DOCTOR
                                        </button>
                                        <button
                                            onClick={() => setActiveVariant('patient')}
                                            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${activeVariant === 'patient' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                                        >
                                            PATIENT
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Window Content (Iframe) */}
                            <div className="flex-1 relative bg-black/40">
                                <div className="absolute inset-0 flex items-center justify-center z-0">
                                    <div className="flex flex-col items-center gap-4 opacity-20 text-white animate-pulse">
                                        <Brain size={48} strokeWidth={1} />
                                        <p className="text-xs font-bold tracking-widest uppercase">Initializing Neural_Env v2.0</p>
                                    </div>
                                </div>
                                <iframe
                                    key={activeVariant}
                                    ref={iframeRef}
                                    src={sandboxUrl}
                                    className="relative z-10 w-full h-full border-0 bg-transparent"
                                    title={`Neurolab Sandbox`}
                                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                                />
                            </div>

                            {/* Resize Handle */}
                            <div
                                onMouseDown={handleResizeStart}
                                className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-30 flex items-center justify-center"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 mb-1 mr-1" />
                            </div>
                        </div>

                        {/* Environment taskbar */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-6 shadow-2xl z-10 transition-transform duration-500 hover:scale-105">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30"><Sparkles size={18} className="text-primary" /></div>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeVariant === 'doctor' ? 'bg-white/10' : 'hover:bg-white/5'}`}><Stethoscope size={18} className="text-white/80" /></div>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeVariant === 'patient' ? 'bg-white/10' : 'hover:bg-white/5'}`}><Users size={18} className="text-white/80" /></div>
                            </div>
                        </div>
                    </div>

                    {/* Shadow for the desktop container */}
                    <div className="absolute -inset-x-20 bottom-0 h-1/2 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
                </section>

                {/* Logo Strip */}
                <section className="relative z-10 w-full mt-32 px-6">
                    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img src="/uploads/rca-logo.png" alt="RCA" className="h-8 w-auto object-contain" />
                            <span className="text-xl font-bold tracking-tight text-foreground">Rwanda Coding Academy</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <img src="https://www.google.com/s2/favicons?domain=nvidia.com&sz=128" alt="NVIDIA" className="h-8 w-auto object-contain" />
                            <span className="text-xl font-bold text-foreground">NVIDIA</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <img src="https://www.google.com/s2/favicons?domain=upsidedownlabs.tech&sz=128" alt="UPSIDEDOWN LABS" className="h-8 w-auto object-contain" />
                            <span className="text-xl font-medium tracking-wide text-foreground">UPSIDEDOWN LABS</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <img src="/uploads/aphezis-logo.png" alt="APHEZIS" className="h-8 w-auto object-contain" />
                            <span className="text-xl font-semibold text-foreground">APHEZIS TECH LTD</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <img src="https://www.google.com/s2/favicons?domain=openbci.com&sz=128" alt="OPENBCI" className="h-8 w-auto object-contain" />
                            <span className="text-xl font-bold tracking-widest text-foreground">OPENBCI</span>
                        </div>
                    </div>
                </section>

                {/* "New Species" Section */}
                <section className="relative z-10 px-6 pt-32 pb-24 max-w-6xl mx-auto">
                    <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.02em] font-medium text-left w-full">
                        <span className="text-foreground font-semibold">A new species of clinical tool.</span>{' '}
                        <span className="text-muted-foreground">Purpose-built for modern medical teams with predictive AI workflows at its core, Neurolab sets a new standard for neurological analysis.</span>
                    </h2>
                </section>

                {/* Feature Wireframe Cards */}
                <section className="relative z-10 px-6 pb-32 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/50 border border-border/50 rounded-2xl overflow-hidden">

                        {/* Card 1 */}
                        <div className="bg-background/80 backdrop-blur-sm p-8 flex flex-col items-start justify-between min-h-[350px] group relative overflow-hidden">
                            <span className="text-[10px] font-mono tracking-widest text-muted-foreground/60 mb-12">FIG 0.1</span>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                <svg width="200" height="200" viewBox="0 0 100 100" className="stroke-muted-foreground/50 fill-none" strokeWidth="0.5">
                                    <path d="M50 20 L80 35 L50 50 L20 35 Z" />
                                    <path d="M50 30 L80 45 L50 60 L20 45 Z" />
                                    <path d="M50 40 L80 55 L50 70 L20 55 Z" />
                                    <path d="M50 50 L80 65 L50 80 L20 65 Z" />
                                    <circle cx="50" cy="35" r="10" strokeDasharray="2 2" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-background/80 backdrop-blur-sm p-8 flex flex-col items-start justify-between min-h-[350px] group relative overflow-hidden">
                            <span className="text-[10px] font-mono tracking-widest text-muted-foreground/60 mb-12">FIG 0.2</span>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                <svg width="200" height="200" viewBox="0 0 100 100" className="stroke-muted-foreground/50 fill-none" strokeWidth="0.5">
                                    <path d="M30 40 L45 30 L60 40 L45 50 Z" />
                                    <path d="M30 40 V60 L45 70 V50" />
                                    <path d="M60 40 V60 L45 70" />

                                    <path d="M50 20 L65 10 L80 20 L65 30 Z" />
                                    <path d="M50 20 V40 L65 50 V30" />
                                    <path d="M80 20 V40 L65 50" />

                                    <path d="M40 60 L55 50 L70 60 L55 70 Z" />
                                    <path d="M40 60 V80 L55 90 V70" />
                                    <path d="M70 60 V80 L55 90" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-background/80 backdrop-blur-sm p-8 flex flex-col items-start justify-between min-h-[350px] group relative overflow-hidden">
                            <span className="text-[10px] font-mono tracking-widest text-muted-foreground/60 mb-12">FIG 0.3</span>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                <svg width="200" height="200" viewBox="0 0 100 100" className="stroke-muted-foreground/50 fill-none" strokeWidth="0.5">
                                    <path d="M20 80 L80 80 L80 75 L20 75 Z" />
                                    <path d="M25 75 L75 75 L75 70 L25 70 Z" />
                                    <path d="M30 70 L70 70 L70 65 L30 65 Z" />
                                    <path d="M35 65 L65 65 L65 60 L35 60 Z" />
                                    <path d="M40 60 L60 60 L60 55 L40 55 Z" />
                                    <path d="M45 55 L55 55 L55 50 L45 50 Z" />
                                    <path d="M80 75 L90 50 L60 20 L55 50" strokeDasharray="1 2" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- Scroll-linked sections --- */}

                {/* Section 1: Intake */}
                <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto flex flex-col gap-16 border-t border-border/10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-between items-start">
                        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.02em] font-medium text-foreground max-w-lg">
                            Make protocol operations self-driving
                        </h2>
                        <div className="max-w-md flex flex-col gap-6">
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Turn conversations and patient feedback into actionable insights that are routed, labeled, and prioritized for the right clinical team.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
                                <span className="font-mono text-xs opacity-50">1.0</span>
                                <span>Intake</span>
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                    {/* Mock UI: Inbox / Kanban */}
                    <div className="w-full h-[500px] rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden flex relative">
                        {/* Fake Sidebar */}
                        <div className="w-1/3 max-w-[320px] h-full border-r border-border/50 bg-background/50 p-4 flex flex-col gap-4">
                            <div className="text-xs font-semibold text-muted-foreground mb-4 pl-2">Thread in #consultations</div>
                            <div className="flex gap-3 bg-secondary/50 p-3 rounded-lg border border-border/50">
                                <div className="w-8 h-8 rounded-full bg-primary/20 shrink-0" />
                                <div className="space-y-2 w-full">
                                    <div className="flex justify-between w-full"><span className="text-sm font-semibold text-foreground">Dr. Sarah</span> <span className="text-xs text-muted-foreground">7:53 PM</span></div>
                                    <div className="text-sm text-muted-foreground">Anyone else noticing the baseline shift during the deep sleep phase in Patient A's latest recording?</div>
                                </div>
                            </div>
                            <div className="flex gap-3 p-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 shrink-0" />
                                <div className="space-y-2 w-full">
                                    <div className="flex justify-between w-full"><span className="text-sm font-semibold text-foreground">Dr. Vance</span> <span className="text-xs text-muted-foreground">7:55 PM</span></div>
                                    <div className="text-sm text-muted-foreground">Yes, looks like alpha intrusion. Worth tagging the sleep specialist.</div>
                                </div>
                            </div>
                            <div className="mt-auto p-3 border border-border/50 rounded-lg bg-background flex items-center gap-2">
                                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">@Neurolab</span>
                                <span className="text-sm text-muted-foreground focus:outline-none">Tag issue as priority...</span>
                            </div>
                        </div>
                        {/* Fake Kanban */}
                        <div className="flex-1 p-8 grid grid-cols-2 gap-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]">
                            <div className="space-y-3">
                                <div className="text-xs font-medium text-muted-foreground flex items-center gap-2"><Circle size={12} /> Todo <span className="opacity-50">12</span></div>
                                <div className="bg-background/80 p-4 rounded-xl border border-border/50 text-sm space-y-3">
                                    <div className="text-muted-foreground text-xs font-mono">NEU-908</div>
                                    <div className="text-foreground font-medium">Review EEG Inconsistencies</div>
                                    <div className="flex gap-2"><span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs">Bug</span></div>
                                </div>
                                <div className="bg-background/80 p-4 rounded-xl border border-border/50 text-sm space-y-3">
                                    <div className="text-muted-foreground text-xs font-mono">NEU-2035</div>
                                    <div className="text-foreground font-medium">Spike detection failing on Channel 4</div>
                                    <div className="flex gap-2"><span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs">Bug</span></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-xs font-medium text-yellow-600 dark:text-yellow-500 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500" /> In Progress <span className="opacity-50 text-muted-foreground">3</span></div>
                                <div className="bg-background/80 p-4 rounded-xl border border-border/50 text-sm space-y-3">
                                    <div className="text-muted-foreground text-xs font-mono">NEU-1487</div>
                                    <div className="text-foreground font-medium">Remove noise artifacts from API</div>
                                    <div className="flex gap-2"><span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs">Resolved</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Plan */}
                <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto flex flex-col gap-16 border-t border-border/10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-between items-start">
                        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.02em] font-medium text-foreground max-w-lg">
                            Define the clinical direction
                        </h2>
                        <div className="max-w-md flex flex-col gap-6">
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Plan and navigate from diagnosis to treatment. Align your team with clinical initiatives, strategic roadmaps, and clear, up-to-date patient records.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
                                <span className="font-mono text-xs opacity-50">2.0</span>
                                <span>Plan</span>
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                    {/* Mock UI: Timeline */}
                    <div className="w-full h-[500px] rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden p-8 flex flex-col">
                        <div className="flex justify-between text-xs font-mono text-muted-foreground border-b border-border/50 pb-4 mb-4">
                            <span>FEB 2</span><span>FEB 16</span><span>MAR 2</span><span>MAR 16</span><span>APR 6</span><span>APR 20</span><span>MAY 4</span><span>MAY 18</span><span>JUN 1</span>
                        </div>
                        <div className="relative flex-1 flex">
                            {/* Initiatives sidebar */}
                            <div className="w-64 border border-border/50 rounded-xl bg-background/80 p-4 flex flex-col gap-4 z-10">
                                <div className="text-xs font-semibold text-foreground">Initiatives</div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm text-muted-foreground"><span className="flex items-center gap-2 text-blue-600 dark:text-blue-400"><Triangle size={14} className="fill-current" /> Core Platform</span> <span className="font-mono text-xs">88</span></div>
                                    <div className="flex justify-between items-center text-sm text-muted-foreground pl-4"><span className="flex items-center gap-2"><Box size={14} /> Stability</span> <span className="font-mono text-xs">28</span></div>
                                    <div className="flex justify-between items-center text-sm text-muted-foreground pl-4"><span className="flex items-center gap-2"><Brain size={14} /> Autonomous Systems</span> <span className="font-mono text-xs">16</span></div>
                                    <div className="hidden md:flex justify-between items-center text-sm text-muted-foreground"><span className="flex items-center gap-2 text-red-600 dark:text-red-400"><Circle size={14} /> Clinical Trials</span> <span className="font-mono text-xs">21</span></div>
                                </div>
                            </div>
                            {/* Gantt Area */}
                            <div className="absolute inset-y-0 left-64 right-0 pl-8 pt-8 space-y-12">
                                <div className="relative h-2 w-full">
                                    <div className="absolute top-0 left-10 w-64 h-2 bg-blue-500/20 rounded-full border border-blue-500/50"></div>
                                    <div className="absolute -top-6 left-10 text-xs font-medium text-foreground flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Core Engine V2</div>
                                    <div className="absolute top-4 left-24 text-[10px] text-muted-foreground">Internal Testing</div>
                                    <div className="absolute top-4 left-60 text-[10px] text-muted-foreground">Public Beta</div>
                                </div>
                                <div className="relative h-2 w-full">
                                    <div className="absolute top-0 left-[300px] w-96 h-2 bg-green-500/20 rounded-full border border-green-500/50"></div>
                                    <div className="absolute -top-6 left-[300px] text-xs font-medium text-foreground flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Autonomous Diagnostics Clarity</div>
                                    <div className="absolute top-4 left-[380px] text-[10px] text-muted-foreground">Alpha</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Build */}
                <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto flex flex-col gap-16 border-t border-border/10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-between items-start">
                        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.02em] font-medium text-foreground max-w-lg">
                            Move work forward alongside AI assistants
                        </h2>
                        <div className="max-w-md flex flex-col gap-6">
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Utilize AI assistants that work alongside your clinical team. Work on complex tasks together or request comprehensive diagnostic reviews.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
                                <span className="font-mono text-xs opacity-50">3.0</span>
                                <span>Build</span>
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                    {/* Mock UI: Assistant assignment */}
                    <div className="w-full h-[500px] rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden flex items-center justify-center relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]">
                        <div className="absolute top-8 left-8 right-1/2 bottom-8 border border-border/50 rounded-xl bg-background/50 p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-foreground font-medium"><Brain size={16} /> Neurolab Assistant</div>
                            <div className="mt-8 space-y-4 text-sm font-mono text-muted-foreground">
                                <p>On it! I've received your request.</p>
                                <p>Running a diagnostic analysis in <span className="bg-secondary px-1 rounded">clinical-env-1</span>.</p>
                                <p>Searching for anomalous spike patterns...</p>
                                <p className="opacity-50">Loading initialization logic for patient_state</p>
                                <div className="flex items-center gap-2 mt-4"><Sparkles size={14} className="animate-pulse text-primary" /> Thinking...</div>
                            </div>
                        </div>

                        {/* Assign dropdown floating over it */}
                        <div className="absolute right-32 top-32 w-80 bg-[#1A1A24] border border-border/70 shadow-2xl rounded-xl custom-shadow overflow-hidden z-20">
                            <div className="px-4 py-3 border-b border-border/50 text-xs text-muted-foreground font-medium">Assign to...</div>
                            <div className="p-2 space-y-1 text-sm bg-background/50">
                                <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10 text-foreground cursor-pointer hover:bg-primary/20">
                                    <div className="flex items-center gap-3"><Brain size={16} className="text-primary" /><span className="font-medium">Neurolab</span> <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground uppercase tracking-wider">Assistant</span></div>
                                    <ArrowRight size={14} className="text-primary" />
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg text-muted-foreground hover:bg-secondary cursor-pointer">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/20" /> Dr. Stevens
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg text-muted-foreground hover:bg-secondary cursor-pointer">
                                    <div className="w-5 h-5 rounded-full bg-purple-500/20" /> Dr. Emma
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg text-muted-foreground hover:bg-secondary cursor-pointer">
                                    <Hexagon size={16} className="text-muted-foreground" /><span>Data Sync</span> <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground uppercase tracking-wider">Assistant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Diffs */}
                <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto flex flex-col gap-16 border-t border-border/10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-between items-start">
                        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.02em] font-medium text-foreground max-w-lg">
                            Review findings and AI insights
                        </h2>
                        <div className="max-w-md flex flex-col gap-6">
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Understand neural changes at a glance with structural diffs for human and AI output. Review, discuss, and implement — all within Neurolab.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
                                <span className="font-mono text-xs opacity-50">4.0</span>
                                <span>Diffs (Coming soon)</span>
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                    {/* Mock UI: Diff view */}
                    <div className="w-full h-[500px] rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden p-6 flex flex-col">
                        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-6">
                            <Box size={14} /> clinical-workspace/config/patient_thresholds.json
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-border/50 rounded-lg overflow-hidden flex-1 font-mono text-xs leading-loose">
                            {/* Left Pane (Red) */}
                            <div className="bg-background/90 p-4">
                                <div className="text-muted-foreground flex items-center"><span className="w-8 text-right pr-4 opacity-50">12</span> <span className="pl-2">"alpha_wave_threshold": 0.45,</span></div>
                                <div className="bg-red-500/10 text-red-600 dark:text-red-200 flex items-center"><span className="w-8 text-right pr-4 opacity-50 border-r border-red-500/30">13</span> <span className="pl-2">- "beta_band_filter": "standard",</span></div>
                                <div className="bg-red-500/10 text-red-600 dark:text-red-200 flex items-center"><span className="w-8 text-right pr-4 opacity-50 border-r border-red-500/30">14</span> <span className="pl-2">- "artifact_suppression": false,</span></div>
                                <div className="text-muted-foreground flex items-center"><span className="w-8 text-right pr-4 opacity-50">15</span> <span className="pl-2">"sampling_rate": 256</span></div>
                            </div>
                            {/* Right Pane (Green) */}
                            <div className="bg-background/90 p-4">
                                <div className="text-muted-foreground flex items-center"><span className="w-8 text-right pr-4 opacity-50">12</span> <span className="pl-2">"alpha_wave_threshold": 0.45,</span></div>
                                <div className="bg-green-500/10 text-green-600 dark:text-green-200 flex items-center"><span className="w-8 text-right pr-4 opacity-50 border-r border-green-500/30">13</span> <span className="pl-2">+ "beta_band_filter": "aggressive",</span></div>
                                <div className="bg-green-500/10 text-green-600 dark:text-green-200 flex items-center"><span className="w-8 text-right pr-4 opacity-50 border-r border-green-500/30">14</span> <span className="pl-2">+ "artifact_suppression": true,</span></div>
                                <div className="bg-green-500/10 text-green-600 dark:text-green-200 flex items-center"><span className="w-8 text-right pr-4 opacity-50 border-r border-green-500/30">15</span> <span className="pl-2">+ "suppression_model": "AI_v2_deep",</span></div>
                                <div className="text-muted-foreground flex items-center"><span className="w-8 text-right pr-4 opacity-50">16</span> <span className="pl-2">"sampling_rate": 256</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Monitor */}
                <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto flex flex-col gap-16 border-t border-border/10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-between items-start">
                        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.02em] font-medium text-foreground max-w-lg">
                            Understand progress at scale
                        </h2>
                        <div className="max-w-md flex flex-col gap-6">
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Take the guesswork out of clinical development with patient updates, analytics, and dashboards that surface what needs your attention.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
                                <span className="font-mono text-xs opacity-50">5.0</span>
                                <span>Monitor</span>
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                    {/* Mock UI: Charts */}
                    <div className="w-full h-[500px] flex gap-6">
                        {/* Weekly Pulse */}
                        <div className="w-1/3 rounded-2xl bg-card border border-border/50 shadow-2xl p-6 hidden md:flex flex-col">
                            <div className="flex justify-between items-center border-b border-border/50 pb-4 mb-4">
                                <span className="text-sm font-medium text-foreground">Weekly Pulse for Mar 10</span>
                                <span className="px-2 py-1 bg-secondary rounded text-xs text-foreground">Listen 1.0x</span>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm font-medium text-foreground mb-2">Protocol updates</div>
                                    <div className="text-xs text-red-600 dark:text-red-400 flex items-center gap-2 mb-2"><Circle size={10} className="fill-current" /> At risk <span className="text-muted-foreground">By Dr. Chen · 1 day ago</span></div>
                                    <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
                                        <li>Hardware integration is mostly complete, but firmware updates are still work in progress</li>
                                        <li>Risk of timeline slip if remaining ethical approvals aren't finalized soon</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground mb-2">Tokyo Clinic Launch</div>
                                    <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-2 mb-2"><Circle size={10} className="fill-current" /> On track <span className="text-muted-foreground">By Julian · 3 hours ago</span></div>
                                    <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
                                        <li>Localization efforts have been completed</li>
                                        <li>Everything else on track for launch in early September</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Scatter Chart */}
                        <div className="flex-1 rounded-2xl bg-card border border-border/50 shadow-2xl p-6 flex flex-col overflow-hidden relative">
                            <div className="text-sm font-medium text-foreground mb-8">Cycle time by AI assistant</div>
                            <div className="flex-1 border-t border-l border-border/50 relative flex justify-around items-end pb-8">
                                {/* Grid lines background */}
                                <div className="absolute inset-0 flex flex-col justify-between items-end pointer-events-none opacity-20">
                                    <div className="w-full border-t border-dashed border-white"></div>
                                    <div className="w-full border-t border-dashed border-white"></div>
                                    <div className="w-full border-t border-dashed border-white"></div>
                                    <div className="w-full border-t border-dashed border-white"></div>
                                </div>
                                {/* Scatter Columns */}
                                <div className="w-10 h-full flex flex-col justify-end space-y-1 relative z-10">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 absolute bottom-[20%] left-4"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 absolute bottom-[30%] left-5"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 absolute bottom-[50%] left-3"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500/50 absolute bottom-[60%] left-6"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 absolute bottom-[80%] left-4"></div>
                                    <span className="absolute -bottom-6 left-0 text-xs text-muted-foreground">Standard Workflow</span>
                                </div>
                                <div className="w-10 h-full flex flex-col justify-end space-y-1 relative z-10">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 absolute bottom-[10%] left-4"></div>
                                    <div className="w-2 h-2 rounded-full bg-orange-500 absolute bottom-[40%] left-6"></div>
                                    <div className="w-2 h-2 rounded-full bg-orange-500 absolute bottom-[55%] left-3"></div>
                                    <div className="w-2 h-2 rounded-full bg-orange-500 absolute bottom-[70%] left-5"></div>
                                    <div className="w-2 h-2 rounded-full bg-orange-500/50 absolute bottom-[85%] left-4"></div>
                                    <span className="absolute -bottom-6 left-0 text-xs text-muted-foreground">Neurolab</span>
                                </div>
                                <div className="w-10 h-full flex flex-col justify-end space-y-1 relative z-10">
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground absolute bottom-[15%] left-5"></div>
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground absolute bottom-[25%] left-3"></div>
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground absolute bottom-[35%] left-6"></div>
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground absolute bottom-[45%] left-4"></div>
                                    <span className="absolute -bottom-6 -left-2 text-xs text-muted-foreground text-nowrap">Manual</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial Cards */}
                <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto border-t border-border/10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 mb-20">
                        {/* Blue Card */}
                        <div className="bg-[#E5EEFF] rounded-[32px] p-10 md:p-14 flex flex-col justify-between min-h-[400px] text-zinc-900 relative overflow-hidden group">
                            <Brain size={400} className="absolute -right-20 -bottom-20 text-[#D8E6FF] transition-transform duration-700 group-hover:scale-105" strokeWidth={0.5} />
                            <h3 className="text-[2rem] md:text-[2.75rem] leading-[1.1] font-medium max-w-xl relative z-10 tracking-tight">
                                "You just have to use it and you will see, you will just feel it."
                            </h3>
                            <div className="flex items-center gap-4 mt-12 relative z-10">
                                <Hexagon className="text-zinc-900 fill-zinc-900" />
                                <div>
                                    <div className="font-semibold text-sm">Dr. Sarah Chen</div>
                                    <div className="text-zinc-600 text-sm">Head of Neurology, Mayo Clinic</div>
                                </div>
                            </div>
                        </div>
                        {/* Yellow Card */}
                        <div className="bg-[#DDFC27] rounded-[32px] p-10 md:p-14 flex flex-col justify-between min-h-[400px] text-zinc-900 relative overflow-hidden group">
                            <Box size={300} className="absolute -right-10 -bottom-10 text-[#CFEC24] transition-transform duration-700 group-hover:scale-105" strokeWidth={0.5} />
                            <h3 className="text-[2rem] md:text-[2.75rem] leading-[1.1] font-medium relative z-10 tracking-tight">
                                "Our analytical speed is intense and Neurolab helps us be action biased."
                            </h3>
                            <div className="flex items-center gap-4 mt-12 relative z-10">
                                <Triangle className="text-zinc-900 fill-zinc-900 rotate-180" />
                                <div>
                                    <div className="font-semibold text-sm">Dr. Marcus Vance</div>
                                    <div className="text-zinc-700 text-sm">Director of Research, Johns Hopkins</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground border-t border-border/20 pt-8">
                        <div>Neurolab powers over 25,000 medical teams. From ambitious clinics to major enterprises.</div>
                        <div className="flex items-center gap-2 group cursor-pointer hover:text-foreground transition-colors mt-4 md:mt-0">
                            Customer stories <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </section>

                {/* Massive Pre-Footer CTA */}
                <section className="relative z-10 w-full px-6 py-40 flex flex-col items-center justify-center border-t border-border/10 bg-background overflow-hidden">
                    {/* Background glow for CTA */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-10 blur-[100px] bg-gradient-to-b from-primary via-blue-500/50 to-transparent rounded-full pointer-events-none" />

                    <h1 className="text-[4rem] md:text-[6rem] lg:text-[7rem] font-extrabold tracking-[-0.04em] leading-[1] text-center text-foreground mb-12">
                        Built for the future.<br />Available today.
                    </h1>

                    <div className="flex items-center gap-4 relative z-10">
                        <Link
                            to="/docs"
                            className="h-12 px-8 rounded-full bg-foreground text-background text-sm font-semibold flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            Get started
                        </Link>
                        <Link
                            to="/contact"
                            className="h-12 px-8 rounded-full bg-secondary/80 border border-border/50 text-foreground text-sm font-medium flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                            Contact sales
                        </Link>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default AIPlatform;
