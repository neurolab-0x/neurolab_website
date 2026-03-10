import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogPostBySlug, BlogPost } from '@/lib/content';
import { ArrowLeft, Clock } from 'lucide-react';

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const categoryColors: Record<string, string> = {
    Engineering: 'bg-blue-50 text-blue-600',
    Clinical: 'bg-emerald-50 text-emerald-600',
    Research: 'bg-violet-50 text-violet-600',
    Product: 'bg-amber-50 text-amber-600',
    Company: 'bg-slate-100 text-slate-600',
};

const BlogDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        if (slug) {
            const fetchedPost = getBlogPostBySlug(slug);
            if (fetchedPost) {
                setPost(fetchedPost);
            } else {
                // If the post is not found, navigate back to the blog list or 404
                navigate('/blog');
            }
        }
    }, [slug, navigate]);

    if (!post) {
        return null; // or a loading spinner
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 pb-32">
                <article className="mx-auto max-w-3xl px-6">
                    {/* Back navigation */}
                    <div className="mb-12">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft size={16} />
                            Back to Blog
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-16">
                        <div className="mb-6 flex items-center gap-3">
                            <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColors[post.category] || 'bg-slate-100 text-slate-600'
                                    }`}
                            >
                                {post.category}
                            </span>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="tabular-nums">{post.date}</span>
                                <span className="flex items-center gap-1">
                                    <Clock size={11} strokeWidth={1.5} />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>

                        <h1
                            className="mb-8 text-foreground"
                            style={{
                                fontFamily: sfPro,
                                fontSize: 'clamp(32px, 5vw, 56px)',
                                fontWeight: 600,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.1,
                            }}
                        >
                            {post.title}
                        </h1>

                        <p className="text-xl leading-relaxed text-muted-foreground">
                            {post.excerpt}
                        </p>
                    </header>

                    {/* Cover Image */}
                    {post.coverImage && (
                        <div className="mb-12 overflow-hidden rounded-3xl bg-card border" style={{ borderColor: 'hsl(213 27% 84%)' }}>
                            <img
                                src={post.coverImage}
                                alt={`${post.title} cover`}
                                className="w-full h-auto object-cover"
                                style={{ maxHeight: '500px' }}
                            />
                        </div>
                    )}

                    {/* Rendered Markdown Body */}
                    <div className="prose prose-slate prose-lg max-w-none">
                        {post.body ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.body}
                            </ReactMarkdown>
                        ) : (
                            <p className="italic text-muted-foreground">
                                This post does not have detailed content yet.
                            </p>
                        )}
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetail;
