/* ──────────────────────────────────────────────
   Content Loader — File-System CMS
   Reads JSON files from src/content/ at build time
   using Vite's import.meta.glob (eager mode).
   ────────────────────────────────────────────── */

// ── Blog Posts ──────────────────────────────────

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: 'Engineering' | 'Clinical' | 'Research' | 'Product' | 'Company';
    date: string;
    readTime: string;
    featured?: boolean;
    thumbnail?: string;
    coverImage?: string;
    body?: string;
}

const blogModules = import.meta.glob<{ default: BlogPost }>(
    '../content/blogs/*.json',
    { eager: true }
);

export function getBlogPosts(): BlogPost[] {
    return Object.values(blogModules)
        .map((mod) => mod.default)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
    const posts = getBlogPosts();
    return posts.find((p) => p.slug === slug) || null;
}

// ── Careers ─────────────────────────────────────

export interface Role {
    slug: string;
    title: string;
    location: 'Remote' | 'San Francisco, CA' | 'Boston, MA' | 'Washington, DC' | 'Zürich, CH';
    level: 'Senior' | 'Lead' | 'Staff' | 'Principal' | 'Director';
    commitment: 'Full-time';
    about: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
}

export interface Department {
    index: string;
    name: string;
    disciplines: string;
    roles: Role[];
}

const careerModules = import.meta.glob<{ default: Department }>(
    '../content/careers/*.json',
    { eager: true }
);

export function getDepartments(): Department[] {
    return Object.values(careerModules)
        .map((mod) => mod.default)
        .sort((a, b) => a.index.localeCompare(b.index));
}

export function getRoleBySlug(slug: string): { role: Role; department: Department } | null {
    for (const dept of getDepartments()) {
        const role = dept.roles.find((r) => r.slug === slug);
        if (role) return { role, department: dept };
    }
    return null;
}

// ── Products ────────────────────────────────────

export interface ProductConfig {
    editions: { id: string; title: string; price: number; desc: string }[];
    sensors: { value: number; label: string; priceOffset: number; desc: string }[];
    storage: { id: string; title: string; priceOffset: number; desc: string }[];
}

const productModules = import.meta.glob<{ default: ProductConfig }>(
    '../content/products/*.json',
    { eager: true }
);

export function getProductConfig(): ProductConfig {
    const configs = Object.values(productModules).map((mod) => mod.default);
    // Return the first config (nexus-config.json)
    return configs[0] || { editions: [], sensors: [], storage: [] };
}
