import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
    ArrowRight,
    Search,
    ChevronDown,
    ChevronRight,
    BookOpen,
    Cpu,
    Activity,
    Shield,
    FileCode2,
    Plug,
    Zap,
    Terminal,
    Menu,
    X,
} from 'lucide-react';

const sfPro =
    "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const cardEasing = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';

/* ── Sidebar Data ── */
interface DocLink {
    label: string;
    href?: string;
}

interface DocSection {
    title: string;
    icon: React.ElementType;
    links: DocLink[];
}

const docSections: DocSection[] = [
    {
        title: 'Getting Started',
        icon: BookOpen,
        links: [
            { label: 'Introduction' },
            { label: 'Quick Start Guide' },
            { label: 'System Requirements' },
            { label: 'Installation' },
            { label: 'Authentication' },
        ],
    },
    {
        title: 'API Reference',
        icon: Terminal,
        links: [
            { label: 'REST API Overview' },
            { label: 'WebSocket Streams' },
            { label: 'Authentication & Tokens' },
            { label: 'Rate Limits' },
            { label: 'Error Codes' },
        ],
    },
    {
        title: 'Device SDK',
        icon: Cpu,
        links: [
            { label: 'SDK Installation' },
            { label: 'Device Pairing' },
            { label: 'Firmware Updates' },
            { label: 'Channel Configuration' },
            { label: 'Signal Processing' },
        ],
    },
    {
        title: 'Clinical Protocols',
        icon: Activity,
        links: [
            { label: 'Safety Guidelines' },
            { label: 'Implantation Procedure' },
            { label: 'Post-Op Monitoring' },
            { label: 'Adverse Event Reporting' },
        ],
    },
    {
        title: 'Data Formats',
        icon: FileCode2,
        links: [
            { label: 'NWB Export' },
            { label: 'EDF/BDF Compatibility' },
            { label: 'Raw Binary Format' },
            { label: 'Metadata Schema' },
        ],
    },
    {
        title: 'Integrations',
        icon: Plug,
        links: [
            { label: 'MATLAB Toolbox' },
            { label: 'Python SDK' },
            { label: 'Jupyter Notebooks' },
            { label: 'Cloud Storage' },
            { label: 'Webhooks' },
        ],
    },
];

/* ── Popular Doc Card ── */
const PopularCard = ({
    icon: Icon,
    title,
    desc,
}: {
    icon: React.ElementType;
    title: string;
    desc: string;
}) => (
    <div
        className="group flex flex-col rounded-2xl bg-secondary p-5 transition-all duration-500"
        style={{
            border: '0.5px solid hsl(213 27% 84%)',
            transitionTimingFunction: cardEasing,
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'hsl(215 25% 70%)';
            e.currentTarget.style.boxShadow = '0 2px 12px 0 hsl(213 27% 84% / 0.35)';
            e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'hsl(213 27% 84%)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
        }}
    >
        <Icon size={20} strokeWidth={1.2} className="mb-3 text-muted-foreground" />
        <h3
            className="mb-1.5 text-sm font-medium text-foreground"
            style={{ fontFamily: sfPro, letterSpacing: '-0.01em' }}
        >
            {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Read more <ArrowRight size={11} strokeWidth={1.5} />
        </div>
    </div>
);

/* ── Sidebar Section (Collapsible) ── */
const SidebarSection = ({
    section,
    activeDoc,
    onSelect,
}: {
    section: DocSection;
    activeDoc: string;
    onSelect: (label: string) => void;
}) => {
    const [expanded, setExpanded] = useState(
        section.title === 'Getting Started'
    );
    const Icon = section.icon;

    return (
        <div className="mb-1">
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-foreground transition-colors duration-200 hover:bg-secondary"
            >
                <Icon size={15} strokeWidth={1.3} className="text-muted-foreground" />
                <span className="flex-1" style={{ letterSpacing: '-0.01em' }}>
                    {section.title}
                </span>
                {expanded ? (
                    <ChevronDown size={13} strokeWidth={1.5} className="text-muted-foreground" />
                ) : (
                    <ChevronRight size={13} strokeWidth={1.5} className="text-muted-foreground" />
                )}
            </button>
            <div
                className="overflow-hidden transition-all duration-300"
                style={{
                    maxHeight: expanded ? `${section.links.length * 36}px` : '0',
                    opacity: expanded ? 1 : 0,
                    transitionTimingFunction: cardEasing,
                }}
            >
                <div className="ml-[22px] border-l border-border pl-3 pt-0.5">
                    {section.links.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => onSelect(link.label)}
                            className="block w-full rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors duration-200"
                            style={{
                                color:
                                    activeDoc === link.label
                                        ? 'hsl(var(--foreground))'
                                        : 'hsl(var(--muted-foreground))',
                                background:
                                    activeDoc === link.label
                                        ? 'hsl(var(--secondary))'
                                        : 'transparent',
                                fontWeight: activeDoc === link.label ? 500 : 400,
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ── Main Docs Page ── */
const Docs = () => {
    const [activeDoc, setActiveDoc] = useState('Introduction');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { ref: contentRef, isVisible: contentVis } = useScrollReveal(0.05);

    const filteredSections = searchQuery
        ? docSections
            .map((s) => ({
                ...s,
                links: s.links.filter((l) =>
                    l.label.toLowerCase().includes(searchQuery.toLowerCase())
                ),
            }))
            .filter((s) => s.links.length > 0)
        : docSections;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="flex h-[calc(100vh-48px)] pt-12">
                {/* ── SIDEBAR ── */}
                {/* Mobile toggle */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg transition-all duration-300 hover:scale-105 lg:hidden"
                    style={{ transitionTimingFunction: cardEasing }}
                >
                    {sidebarOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                </button>

                {/* Sidebar panel */}
                <aside
                    className={`fixed left-0 top-12 z-30 h-[calc(100vh-48px)] w-72 flex-shrink-0 overflow-y-auto bg-background transition-transform duration-500 lg:sticky lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    style={{
                        borderRight: '0.5px solid hsl(213 27% 84%)',
                        transitionTimingFunction: cardEasing,
                    }}
                >
                    {/* Search */}
                    <div className="px-4 pb-3 pt-6">
                        <div
                            className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2"
                            style={{ border: '0.5px solid hsl(213 27% 84%)' }}
                        >
                            <Search size={14} strokeWidth={1.5} className="text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search docs…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                            />
                        </div>
                    </div>

                    {/* Nav sections */}
                    <nav className="px-2 pb-8">
                        {filteredSections.map((section) => (
                            <SidebarSection
                                key={section.title}
                                section={section}
                                activeDoc={activeDoc}
                                onSelect={(label) => {
                                    setActiveDoc(label);
                                    setSidebarOpen(false);
                                }}
                            />
                        ))}
                        {filteredSections.length === 0 && (
                            <p className="px-4 py-6 text-sm text-muted-foreground">No results found.</p>
                        )}
                    </nav>
                </aside>

                {/* Mobile overlay backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* ── MAIN CONTENT ── */}
                <main className="flex-1 overflow-y-auto px-6 pb-32 lg:px-12">
                    <div
                        ref={contentRef}
                        className="mx-auto max-w-3xl pt-12 transition-all duration-[600ms]"
                        style={{
                            opacity: contentVis ? 1 : 0,
                            transform: contentVis ? 'translateY(0)' : 'translateY(16px)',
                            transitionTimingFunction: cardEasing,
                        }}
                    >
                        {/* Header */}
                        <div className="mb-12">
                            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                Documentation
                            </p>
                            <h1
                                className="mb-4 text-foreground"
                                style={{
                                    fontFamily: sfPro,
                                    fontSize: 'clamp(28px, 4vw, 42px)',
                                    fontWeight: 500,
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1.2,
                                }}
                            >
                                Neurolab Docs
                            </h1>
                            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                                Everything you need to integrate with our neural interface platform — from
                                device pairing to real-time data streaming and cloud analysis.
                            </p>
                        </div>

                        {/* Popular Section */}
                        <section className="mb-16">
                            <h2
                                className="mb-6 text-foreground"
                                style={{
                                    fontFamily: sfPro,
                                    fontSize: '20px',
                                    fontWeight: 500,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Popular
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <PopularCard
                                    icon={Zap}
                                    title="Quick Start Guide"
                                    desc="Get up and running with device pairing, authentication, and your first data stream in under 10 minutes."
                                />
                                <PopularCard
                                    icon={Terminal}
                                    title="REST API Overview"
                                    desc="Explore endpoints for session management, patient records, and neural data retrieval."
                                />
                                <PopularCard
                                    icon={Cpu}
                                    title="Device SDK"
                                    desc="Install and configure the Neurolab SDK for real-time electrode management and signal processing."
                                />
                                <PopularCard
                                    icon={Plug}
                                    title="Python SDK"
                                    desc="Connect to Neurolab APIs from Python with our official SDK, including async support and Jupyter integration."
                                />
                            </div>
                        </section>

                        {/* Divider */}
                        <div
                            className="mb-16"
                            style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }}
                        />

                        {/* API Basics section */}
                        <section className="mb-16">
                            <h2
                                className="mb-4 text-foreground"
                                style={{
                                    fontFamily: sfPro,
                                    fontSize: '20px',
                                    fontWeight: 500,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                API Basics
                            </h2>
                            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                The Neurolab API uses RESTful conventions with JSON payloads. All requests
                                require a Bearer token obtained through OAuth 2.0. WebSocket endpoints are
                                available for real-time neural data streaming.
                            </p>

                            {/* Code block */}
                            <div
                                className="overflow-hidden rounded-2xl"
                                style={{ border: '0.5px solid hsl(213 27% 84%)' }}
                            >
                                <div
                                    className="flex items-center justify-between px-4 py-2.5"
                                    style={{ borderBottom: '0.5px solid hsl(213 27% 84%)', background: 'hsl(var(--secondary))' }}
                                >
                                    <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                                        Example Request
                                    </span>
                                    <span className="rounded-md bg-card px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                                        style={{ border: '0.5px solid hsl(213 27% 84%)' }}>
                                        bash
                                    </span>
                                </div>
                                <pre className="overflow-x-auto bg-[#0a0f1c] p-5 text-[13px] leading-relaxed">
                                    <code className="text-slate-300">
                                        {`curl -X GET https://api.neurolab.cc/v1/sessions \\
  -H "Authorization: Bearer <YOUR_TOKEN>" \\
  -H "Content-Type: application/json"`}
                                    </code>
                                </pre>
                            </div>
                        </section>

                        {/* Divider */}
                        <div
                            className="mb-16"
                            style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }}
                        />

                        {/* Data Streaming */}
                        <section className="mb-16">
                            <h2
                                className="mb-4 text-foreground"
                                style={{
                                    fontFamily: sfPro,
                                    fontSize: '20px',
                                    fontWeight: 500,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Real-Time Data Streaming
                            </h2>
                            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                Connect to our WebSocket endpoint to receive live neural data. Each message
                                contains timestamped spike trains and LFP signals from all active channels.
                            </p>

                            <div
                                className="overflow-hidden rounded-2xl"
                                style={{ border: '0.5px solid hsl(213 27% 84%)' }}
                            >
                                <div
                                    className="flex items-center justify-between px-4 py-2.5"
                                    style={{ borderBottom: '0.5px solid hsl(213 27% 84%)', background: 'hsl(var(--secondary))' }}
                                >
                                    <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                                        WebSocket Connection
                                    </span>
                                    <span className="rounded-md bg-card px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                                        style={{ border: '0.5px solid hsl(213 27% 84%)' }}>
                                        javascript
                                    </span>
                                </div>
                                <pre className="overflow-x-auto bg-[#0a0f1c] p-5 text-[13px] leading-relaxed">
                                    <code className="text-slate-300">
                                        {`const ws = new WebSocket("wss://stream.neurolab.cc/v1/neural");

ws.onopen = () => {
  ws.send(JSON.stringify({
    action: "subscribe",
    channels: [0, 1, 2, 3],
    sample_rate: 30000
  }));
};

ws.onmessage = (event) => {
  const { timestamp, spikes, lfp } = JSON.parse(event.data);
  console.log(\`Received \${spikes.length} spikes at \${timestamp}\`);
};`}
                                    </code>
                                </pre>
                            </div>
                        </section>

                        {/* Help section */}
                        <section
                            className="rounded-2xl bg-secondary p-8 text-center"
                            style={{ border: '0.5px solid hsl(213 27% 84%)' }}
                        >
                            <Shield size={24} strokeWidth={1.2} className="mx-auto mb-4 text-muted-foreground" />
                            <h3
                                className="mb-2 text-foreground"
                                style={{
                                    fontFamily: sfPro,
                                    fontSize: '18px',
                                    fontWeight: 500,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Need help?
                            </h3>
                            <p className="mx-auto mb-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                                If you have questions or run into issues, our engineering team is here to help.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
                                style={{
                                    background: '#0060E9',
                                    transitionTimingFunction: cardEasing,
                                }}
                            >
                                Contact Support
                                <ArrowRight size={14} strokeWidth={1.5} />
                            </Link>
                        </section>
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default Docs;
