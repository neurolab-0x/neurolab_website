/* global CMS, React */
const h = React.createElement;

// Category color configurations matching the frontend
const categoryColors = {
    Engineering: 'bg-blue-50 text-blue-600',
    Clinical: 'bg-emerald-50 text-emerald-600',
    Research: 'bg-violet-50 text-violet-600',
    Product: 'bg-amber-50 text-amber-600',
    Company: 'bg-gray-100 text-gray-600',
};

const BlogPreview = ({ entry, getAsset, widgetFor }) => {
    const data = entry.getIn(['data']);
    if (!data) return null;

    const title = data.get('title') || 'Blog Title';
    const category = data.get('category') || 'Category';
    const date = data.get('date') || 'Date';
    const readTime = data.get('readTime') || 'X min read';
    const excerpt = data.get('excerpt') || 'Your excerpt text will appear here...';

    // Resolve asset URLs for the iframe preview
    const thumbnailPath = data.get('thumbnail');
    const coverPath = data.get('coverImage');
    const thumbnail = thumbnailPath ? getAsset(thumbnailPath) : null;
    const coverImage = coverPath ? getAsset(coverPath) : null;

    // 1. Render Card Preview
    const CardPreview = h('div', { className: 'mb-16 max-w-lg' },
        h('h2', { className: 'text-xs font-bold text-gray-400 mb-4 tracking-widest uppercase' }, '1. Blog Card Preview (Index)'),
        h('div', { className: 'overflow-hidden rounded-3xl bg-white shadow-md border border-gray-200 flex flex-col' },
            h('div', { className: 'aspect-w-16 aspect-h-9 w-full bg-gray-100 relative' },
                thumbnail
                    ? h('img', { src: thumbnail.toString(), className: 'absolute inset-0 h-full w-full object-cover' })
                    : h('div', { className: 'absolute inset-0 flex items-center justify-center text-gray-400 text-sm' }, 'No Thumbnail Selected')
            ),
            h('div', { className: 'p-6 flex flex-col flex-1' },
                h('div', { className: 'mb-4' },
                    h('span', { className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${categoryColors[category] || 'bg-gray-100 text-gray-600'}` }, category)
                ),
                h('h3', { className: 'mb-3 text-xl font-medium tracking-tight text-gray-900 leading-snug' }, title),
                h('p', { className: 'text-sm text-gray-500 leading-relaxed mb-6 flex-1' }, excerpt),
                h('div', { className: 'flex items-center text-xs text-gray-400 gap-4 mt-auto' },
                    h('span', {}, date),
                    h('span', {}, readTime)
                )
            )
        )
    );

    // 2. Render Detail Preview
    const DetailPreview = h('div', { className: 'max-w-4xl' },
        h('h2', { className: 'text-xs font-bold text-gray-400 mb-4 tracking-widest uppercase' }, '2. Blog Detail Preview (Post Page)'),
        h('div', { className: 'bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col' },
            h('header', { className: 'mb-12' },
                h('div', { className: 'mb-6 flex items-center gap-3' },
                    h('span', { className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${categoryColors[category] || 'bg-gray-100 text-gray-600'}` }, category),
                    h('div', { className: 'flex items-center gap-4 text-sm text-gray-500' },
                        h('span', {}, date),
                        h('span', {}, readTime)
                    )
                ),
                h('h1', { className: 'text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-8' }, title),
                h('p', { className: 'text-xl leading-relaxed text-gray-500' }, excerpt)
            ),
            coverImage
                ? h('div', { className: 'mb-12 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50' },
                    h('img', { src: coverImage.toString(), className: 'w-full h-auto object-cover max-h-96' })
                )
                : null,
            h('div', { className: 'prose prose-lg max-w-none text-gray-800' },
                widgetFor('body')
            )
        )
    );

    return h('div', { className: 'p-10 bg-gray-50 min-h-screen font-sans' },
        CardPreview,
        DetailPreview
    );
};

// Register the preview template with Decap CMS
CMS.registerPreviewTemplate('blogs', BlogPreview);

// Inject Tailwind CSS into the preview iframe pane
CMS.registerPreviewStyle("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");
CMS.registerPreviewStyle("https://unpkg.com/@tailwindcss/typography@0.4.1/dist/typography.min.css");
