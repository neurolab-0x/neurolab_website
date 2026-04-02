import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    twitterCard?: string;
}

const SEO = ({
    title,
    description,
    canonical,
    ogType = "website",
    ogImage = "https://storage.googleapis.com/gpt-engineer-file-uploads/6urGgzD2LQf0I57992B88DbaMUj2/social-images/social-1771941386068-logo1.webp",
    twitterCard = "summary_large_image",
}: SEOProps) => {
    const siteName = "Neurolab";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const siteUrl = "https://neurolab.cc";
    const url = canonical ? `${siteUrl}${canonical}` : siteUrl;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
};

export default SEO;
