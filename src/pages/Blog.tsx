import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { blogPosts, type BlogPost } from '@/data/blog';
import { ArrowUpRight, Clock } from 'lucide-react';

const sfPro =
    "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const cardEasing = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';

const categories = ['All', 'Engineering', 'Clinical', 'Research', 'Product', 'Company'] as const;

const categoryColors: Record<string, string> = {
    Engineering: 'bg-blue-50 text-blue-600',
    Clinical: 'bg-emerald-50 text-emerald-600',
    Research: 'bg-violet-50 text-violet-600',
    Product: 'bg-amber-50 text-amber-600',
    Company: 'bg-slate-100 text-slate-600',
};

/* ── Blog Card ── */
const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => {
    return (
        <article
            className={`group flex flex-col overflow-hidden rounded-3xl bg-secondary transition-all duration-500 ${featured ? 'md:col-span-2 md:flex-row' : ''
                }`}
            style={{
                border: '0.5px solid hsl(213 27% 84%)',
                transitionTimingFunction: cardEasing,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'hsl(215 25% 70%)';
                e.currentTarget.style.boxShadow = '0 4px 24px 0 hsl(213 27% 84% / 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'hsl(213 27% 84%)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Thumbnail */}
            <div
                className={`relative overflow-hidden bg-card ${featured ? 'md:w-1/2' : 'aspect-[16/9] w-full'
                    }`}
                style={{
                    minHeight: featured ? '320px' : undefined,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    }}
                />
                {/* Decorative neural pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full border border-slate-300/40 opacity-40" />
                    <div className="absolute h-16 w-16 rounded-full border border-slate-300/30 opacity-30" />
                    <div className="absolute h-32 w-32 rounded-full border border-slate-300/20 opacity-20" />
                </div>
            </div>

            {/* Content */}
            <div className={`flex flex-1 flex-col justify-between p-6 ${featured ? 'md:p-8' : ''}`}>
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColors[post.category] || 'bg-slate-100 text-slate-600'
                                }`}
                        >
                            {post.category}
                        </span>
                    </div>

                    <h3
                        className={`mb-3 text-foreground transition-opacity duration-300 group-hover:opacity-80 ${featured ? 'text-2xl sm:text-3xl' : 'text-lg'
                            }`}
                        style={{
                            fontFamily: sfPro,
                            fontWeight: 500,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.25,
                        }}
                    >
                        {post.title}
                    </h3>

                    <p
                        className={`leading-relaxed text-muted-foreground ${featured ? 'text-base' : 'text-sm'
                            }`}
                    >
                        {post.excerpt}
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="tabular-nums">{post.date}</span>
                        <span className="flex items-center gap-1">
                            <Clock size={11} strokeWidth={1.5} />
                            {post.readTime}
                        </span>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card transition-all duration-300 group-hover:bg-foreground group-hover:text-background"
                        style={{ border: '0.5px solid hsl(213 27% 84%)' }}>
                        <ArrowUpRight size={13} strokeWidth={1.5} />
                    </div>
                </div>
            </div>
        </article>
    );
};

/* ── Main Blog Page ── */
const Blog = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const { ref: heroRef, isVisible: heroVis } = useScrollReveal(0.1);
    const { ref: gridRef, isVisible: gridVis } = useScrollReveal(0.1);

    const filtered =
        activeCategory === 'All'
            ? blogPosts
            : blogPosts.filter((p) => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-12">
                {/* ── HERO ── */}
                <section className="px-6">
                    <div
                        ref={heroRef}
                        className="mx-auto max-w-5xl py-28 sm:py-36 transition-all duration-[600ms]"
                        style={{
                            opacity: heroVis ? 1 : 0,
                            transform: heroVis ? 'translateY(0)' : 'translateY(16px)',
                            transitionTimingFunction: cardEasing,
                        }}
                    >
                        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                            Blog
                        </p>
                        <h1
                            className="text-foreground"
                            style={{
                                fontFamily: sfPro,
                                fontSize: 'clamp(36px, 6vw, 64px)',
                                fontWeight: 500,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.1,
                            }}
                        >
                            Updates
                        </h1>
                        <p className="mt-6 max-w-[520px] text-base leading-relaxed text-muted-foreground">
                            The latest from the Neurolab team — engineering deep-dives, clinical milestones,
                            research breakthroughs, and product announcements.
                        </p>
                    </div>
                    <div
                        className="mx-auto max-w-5xl"
                        style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }}
                    />
                </section>

                {/* ── FILTER PILLS ── */}
                <section className="px-6">
                    <div className="mx-auto flex max-w-5xl flex-wrap gap-2 py-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300"
                                style={{
                                    background:
                                        activeCategory === cat ? 'hsl(var(--foreground))' : 'transparent',
                                    color:
                                        activeCategory === cat
                                            ? 'hsl(var(--background))'
                                            : 'hsl(var(--muted-foreground))',
                                    border:
                                        activeCategory === cat
                                            ? '0.5px solid hsl(var(--foreground))'
                                            : '0.5px solid hsl(213 27% 84%)',
                                    transitionTimingFunction: cardEasing,
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── CARD GRID ── */}
                <section className="px-6 pb-32">
                    <div
                        ref={gridRef}
                        className="mx-auto max-w-5xl transition-all duration-[600ms]"
                        style={{
                            opacity: gridVis ? 1 : 0,
                            transform: gridVis ? 'translateY(0)' : 'translateY(16px)',
                            transitionTimingFunction: cardEasing,
                        }}
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {filtered.map((post) => (
                                <BlogCard
                                    key={post.slug}
                                    post={post}
                                    featured={post.featured && activeCategory === 'All'}
                                />
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="py-24 text-center">
                                <p className="text-lg text-muted-foreground">
                                    No posts in this category yet.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
