export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: 'Engineering' | 'Clinical' | 'Research' | 'Product' | 'Company';
    date: string;
    readTime: string;
    featured?: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'cortical-decoder-v3-architecture',
        title: 'Inside the Cortical Decoder v3 Architecture',
        excerpt:
            'A deep dive into the transformer-based neural decoding pipeline that powers real-time intent classification at sub-millisecond latency — from raw spike trains to actionable motor commands.',
        category: 'Engineering',
        date: 'Feb 20, 2026',
        readTime: '12 min read',
        featured: true,
    },
    {
        slug: 'fda-breakthrough-device-designation',
        title: 'Neurolab Receives FDA Breakthrough Device Designation',
        excerpt:
            'Our N1 implant has been granted Breakthrough Device status by the FDA, accelerating the pathway to market for patients with upper-limb paralysis.',
        category: 'Clinical',
        date: 'Feb 14, 2026',
        readTime: '5 min read',
    },
    {
        slug: 'wireless-data-link-benchmarks',
        title: 'Wireless Neural Data Link: 1 Gbps at 3 mW',
        excerpt:
            'We achieved a record-setting 1 Gbps sustained throughput on our custom UWB radio while consuming just 3 milliwatts — enabling untethered, full-bandwidth cortical recording.',
        category: 'Engineering',
        date: 'Feb 8, 2026',
        readTime: '8 min read',
    },
    {
        slug: 'multi-region-decoding-study',
        title: 'Multi-Region Decoding: A 128-Patient Study',
        excerpt:
            'Results from our largest clinical study to date show that distributed multi-region recordings outperform single-region approaches by 34% on complex motor tasks.',
        category: 'Research',
        date: 'Jan 30, 2026',
        readTime: '10 min read',
        featured: true,
    },
    {
        slug: 'neurai-platform-launch',
        title: 'Introducing the NeurAI Cloud Platform',
        excerpt:
            'A unified cloud environment for neural data storage, analysis, and model training — purpose-built for research teams and clinical operators managing fleet-scale deployments.',
        category: 'Product',
        date: 'Jan 22, 2026',
        readTime: '6 min read',
    },
    {
        slug: 'biocompatibility-longevity-report',
        title: '5-Year Biocompatibility & Longevity Report',
        excerpt:
            'Independent histological analysis confirms zero chronic inflammatory response and stable impedance across all 512 electrode channels after five years of continuous implantation.',
        category: 'Clinical',
        date: 'Jan 15, 2026',
        readTime: '9 min read',
    },
    {
        slug: 'open-source-spike-sorting',
        title: 'Open-Sourcing Our Real-Time Spike Sorting Engine',
        excerpt:
            'We are releasing NeurSort under the Apache 2.0 license — a GPU-accelerated spike sorting library capable of processing 1024 channels in real time on edge hardware.',
        category: 'Engineering',
        date: 'Jan 8, 2026',
        readTime: '7 min read',
    },
    {
        slug: 'neurolab-joins-open-bci-consortium',
        title: 'Neurolab Joins the Open BCI Consortium',
        excerpt:
            'We are proud to announce our membership in the Open BCI Consortium, committing to interoperable data standards and shared safety protocols across the industry.',
        category: 'Company',
        date: 'Jan 2, 2026',
        readTime: '4 min read',
    },
];
