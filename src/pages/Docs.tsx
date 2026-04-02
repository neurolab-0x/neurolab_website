import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
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

const slugify = (label: string) =>
    label
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[\s/+]+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

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
            { label: 'Introduction', href: '#introduction' },
            { label: 'Quick Start Guide', href: '#authentication' },
            { label: 'System Requirements', href: '#authentication' },
            { label: 'Installation', href: '#authentication' },
            { label: 'Authentication', href: '#authentication' },
        ],
    },
    {
        title: 'API Reference',
        icon: Terminal,
        links: [
            { label: 'REST API Overview', href: '#api-reference' },
            { label: 'WebSocket Streams', href: '#real-time-streaming' },
            { label: 'Authentication & Tokens', href: '#authentication' },
            { label: 'Rate Limits', href: '#api-reference' },
            { label: 'Error Codes', href: '#api-reference' },
        ],
    },
    {
        title: 'Device SDK',
        icon: Cpu,
        links: [
            { label: 'SDK Installation', href: '#official-sdks' },
            { label: 'Device Pairing', href: '#official-sdks' },
            { label: 'Firmware Updates', href: '#official-sdks' },
            { label: 'Channel Configuration', href: '#official-sdks' },
            { label: 'Signal Processing', href: '#official-sdks' },
        ],
    },
    {
        title: 'Clinical Protocols',
        icon: Activity,
        links: [
            { label: 'Safety Guidelines', href: '#system-status' },
            { label: 'Implantation Procedure', href: '#system-status' },
            { label: 'Post-Op Monitoring', href: '#system-status' },
            { label: 'Adverse Event Reporting', href: '#system-status' },
        ],
    },
    {
        title: 'Data Formats',
        icon: FileCode2,
        links: [
            { label: 'NWB Export', href: '#system-status' },
            { label: 'EDF/BDF Compatibility', href: '#system-status' },
            { label: 'Raw Binary Format', href: '#system-status' },
            { label: 'Metadata Schema', href: '#system-status' },
        ],
    },
    {
        title: 'Integrations',
        icon: Plug,
        links: [
            { label: 'MATLAB Toolbox', href: '#official-sdks' },
            { label: 'Python SDK', href: '#official-sdks' },
            { label: 'Jupyter Notebooks', href: '#official-sdks' },
            { label: 'Cloud Storage', href: '#official-sdks' },
            { label: 'Webhooks', href: '#webhooks' },
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
                    {section.links.map((link) => {
                        const linkHash = link.href || `#${slugify(link.label)}`;
                        return (
                            <Link
                                key={link.label}
                                to={linkHash}
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
                            </Link>
                        );
                    })}
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
    const location = useLocation();
    const { ref: contentRef, isVisible: contentVis } = useScrollReveal(0.05);

    useEffect(() => {
        if (!location.hash) {
            setActiveDoc('Introduction');
            return;
        }

        const normalizedHash = location.hash.startsWith('#') ? location.hash : `#${location.hash}`;
        const findMatch = docSections
            .flatMap((section) => section.links)
            .find((link) => (link.href || `#${slugify(link.label)}`) === normalizedHash);

        if (findMatch) {
            setActiveDoc(findMatch.label);
        }
    }, [location.hash]);

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
        <div className="flex h-screen flex-col overflow-hidden bg-background">
            <SEO
                title="Documentation"
                description="Comprehensive guides for integrating with the NeuroLab API, SDKs, and clinical platform."
                canonical="/docs"
            />
            <Navbar />
            <div className="flex flex-1 overflow-hidden pt-12">
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
                    className={`fixed left-0 top-12 z-30 h-full w-72 flex-shrink-0 overflow-y-auto bg-background transition-transform duration-500 lg:static lg:block lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
                        className="mx-auto max-w-4xl pt-12 transition-all duration-[600ms]"
                        style={{
                            opacity: contentVis ? 1 : 0,
                            transform: contentVis ? 'translateY(0)' : 'translateY(16px)',
                            transitionTimingFunction: cardEasing,
                        }}
                    >
                        {/* Introduction */}
                        <section id="introduction" className="mb-12 scroll-m-24">
                            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
                                Official Documentation
                            </p>
                            <h1
                                className="mb-4 text-foreground"
                                style={{
                                    fontFamily: sfPro,
                                    fontSize: 'clamp(32px, 5vw, 48px)',
                                    fontWeight: 600,
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1.1,
                                }}
                            >
                                Neurolab API & Platform Docs
                            </h1>
                            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                                Everything you need to integrate your applications with the world's most advanced clinical-grade neural interface platform. Follow the guides below to authenticate, stream real-time data, and run predictive analysis.
                            </p>
                        </section>

                        {/* Divider */}
                        <div className="mb-16 border-b border-surface-border w-full" />

                        {/* Authentication */}
                        <section id="authentication" className="mb-20 scroll-m-24">
                            <h2
                                className="mb-4 text-2xl font-semibold text-foreground tracking-tight"
                                style={{ fontFamily: sfPro }}
                            >
                                Authentication
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                                All API requests require a Bearer token. You can generate a persistent API Key from your developer dashboard, or use OAuth 2.0 flows for user-delegated access. Include the token in the <code className="bg-secondary px-1.5 py-0.5 rounded text-sm text-foreground">Authorization</code> header.
                            </p>

                            <div className="overflow-hidden rounded-xl border border-surface-border bg-card">
                                <div className="flex items-center px-4 py-3 border-b border-surface-border bg-secondary/50">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Authentication Header Example</span>
                                </div>
                                <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
                                    <code>
                                        {`curl -X GET https://api.neurolab.inc/v1/sessions \\
  -H "Authorization: Bearer dev_sk_abc1234567890def..." \\
  -H "Content-Type: application/json"`}
                                    </code>
                                </pre>
                            </div>
                        </section>

                        {/* REST API Endpoints */}
                        <section id="api-reference" className="mb-20 scroll-m-24">
                            <h2
                                className="mb-4 text-2xl font-semibold text-foreground tracking-tight"
                                style={{ fontFamily: sfPro }}
                            >
                                Core REST APIs
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                                Manage patient records, retrieve historical EEG sessions, and query predictive analysis results. The base URL for all endpoints is <code className="bg-secondary px-1.5 py-0.5 rounded text-sm text-foreground">https://api.neurolab.inc/v1</code>.
                            </p>

                            <div className="space-y-8">
                                {/* Endpoint 1 */}
                                <div className="rounded-xl border border-surface-border bg-card overflow-hidden">
                                    <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border bg-secondary/50">
                                        <span className="rounded bg-green-500/20 text-green-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wider">GET</span>
                                        <span className="font-mono text-sm text-foreground font-medium">/v1/analysis/session/:id</span>
                                    </div>
                                    <div className="p-4 border-b border-surface-border">
                                        <p className="text-sm text-muted-foreground">Retrieves the complete processed neural analysis for a specific session, including anomalous wave detection and power spectral density profiles.</p>
                                    </div>
                                    <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
                                        <code>
                                            {`{
  "session_id": "ses_9x8c7v6b5n",
  "status": "completed",
  "analysis_summary": {
    "dominant_frequency_hz": 12.4,
    "anomalies_detected": 2,
    "overall_snr_db": 21.4,
    "band_power": {
      "delta": 0.15,
      "theta": 0.22,
      "alpha": 0.45,
      "beta": 0.12,
      "gamma": 0.06
    }
  }
}`}
                                        </code>
                                    </pre>
                                </div>

                                {/* Endpoint 2 */}
                                <div className="rounded-xl border border-surface-border bg-card overflow-hidden">
                                    <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border bg-secondary/50">
                                        <span className="rounded bg-blue-500/20 text-blue-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wider">POST</span>
                                        <span className="font-mono text-sm text-foreground font-medium">/v1/devices/calibration</span>
                                    </div>
                                    <div className="p-4 border-b border-surface-border">
                                        <p className="text-sm text-muted-foreground">Initiates an impedance check and baseline calibration sequence on a connected hardware device.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Real-Time WebSocket Streaming */}
                        <section id="real-time-streaming" className="mb-20 scroll-m-24">
                            <h2
                                className="mb-4 text-2xl font-semibold text-foreground tracking-tight"
                                style={{ fontFamily: sfPro }}
                            >
                                Real-Time Streaming
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                                For live clinical dashboards and Brain-Computer Interfaces (BCI), use our low-latency WebSocket API to receive neural spike trains and raw LFP data in real time directly from the hardware.
                            </p>

                            <div className="overflow-hidden rounded-xl border border-surface-border bg-card">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border bg-secondary/50">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WebSocket Client (JavaScript)</span>
                                </div>
                                <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
                                    <code>
                                        {`const ws = new WebSocket("wss://stream.neurolab.inc/v1/neural");

ws.onopen = () => {
  ws.send(JSON.stringify({
    action: "subscribe",
    session_id: "ses_9x8c7v6b5n",
    channels: ["Fp1", "Fp2", "C3", "C4"],
    downsample_rate: 250 // Hz
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "lfp_chunk") {
      updateCharts(data.timestamp, data.channel_data);
  }
};`}
                                    </code>
                                </pre>
                            </div>
                        </section>

                        {/* Webhooks */}
                        <section id="webhooks" className="mb-20 scroll-m-24">
                            <h2
                                className="mb-4 text-2xl font-semibold text-foreground tracking-tight"
                                style={{ fontFamily: sfPro }}
                            >
                                Webhooks
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                                Configure webhooks in your developer portal to receive asynchronous HTTP POST alerts when long-running predictive models finish or when anomalous brain activity is automatically flagged.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 rounded-xl border border-surface-border bg-card">
                                    <h3 className="font-mono text-sm font-semibold text-primary mb-2">analysis.completed</h3>
                                    <p className="text-sm text-muted-foreground">Fired when a batch processing job on historical EEG data finishes. Payload includes a pre-signed download URL for the resulting NWB files.</p>
                                </div>
                                <div className="p-5 rounded-xl border border-surface-border bg-card">
                                    <h3 className="font-mono text-sm font-semibold text-red-500 mb-2">alert.anomaly_detected</h3>
                                    <p className="text-sm text-muted-foreground">Fired when real-time ML monitors detect seizure precursors or critical signal degradation. High priority webhook.</p>
                                </div>
                            </div>
                        </section>

                        {/* Official SDKs */}
                        <section id="official-sdks" className="mb-20 scroll-m-24">
                            <h2
                                className="mb-4 text-2xl font-semibold text-foreground tracking-tight"
                                style={{ fontFamily: sfPro }}
                            >
                                Official SDKs
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                                We maintain official libraries for Python and Node.js. They handle authentication, automatic retries, WebSocket stream parsing, and data serialization automatically.
                            </p>

                            <div className="overflow-hidden rounded-xl border border-surface-border bg-card">
                                <div className="flex items-center px-4 py-3 border-b border-surface-border bg-secondary/50">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Python Installation & Setup</span>
                                </div>
                                <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
                                    <code>
                                        {`pip install neurolab-sdk

import neurolab

client = neurolab.Client(api_key="your_api_key")

# Start an async stream handler
@client.on_stream("ses_9x8c7v6b5n")
def handle_stream(data):
    print(f"Received amplitude: {data.ch1_uv}")

client.connect_stream()`}
                                    </code>
                                </pre>
                            </div>
                        </section>

                        {/* Help section */}
                        <section id="system-status" className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center relative overflow-hidden scroll-m-24">
                            <Shield size={28} className="mx-auto mb-4 text-primary" />
                            <h3 className="mb-2 text-xl font-semibold text-foreground tracking-tight">System status: operational</h3>
                            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                                All public Neurolab platform services are currently operational. If you need environment-specific support or incident follow-up, contact the team directly.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all hover:scale-105"
                            >
                                Contact support
                                <ArrowRight size={16} />
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
