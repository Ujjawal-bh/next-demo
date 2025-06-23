// lib/jsonld.js
export const generateJsonLd = (type, schemadata, pathname) => {
  const domain = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://nextjs-demo.galaxyweblinks.com';
  switch (type) {
    case 'post':
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${domain}/blog/${schemadata.slug}`
        },
        "headline": schemadata.title,
        "description": schemadata?.content,
        "datePublished": schemadata.date,
        "author": {
          "@type": "Person",
          "name": schemadata.author
        },
        "sameAs": schemadata.sameAs  // Adding sameAs property
      };
      case 'team':
        return {
          "@context": "https://schema.org",
          "@type": "TeamPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${domain}/teams/${schemadata.slug}`
          },
          "headline": schemadata.title,
          "description": schemadata?.content,
          "datePublished": schemadata.date,
          "author": {
            "@type": "Person",
            "name": schemadata.author
          },
          "sameAs": schemadata.sameAs  // Adding sameAs property
        };
    case 'page':
      return {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${domain}/${schemadata.slug}`,
            "url": `${domain}/${schemadata.slug}`,
            "name": schemadata.title,
            "breadcrumb": {
              "@id": `${domain}/${schemadata.slug}#breadcrumb`
            },
            "datePublished": schemadata.datePublished,
            "dateModified": schemadata.dateModified,
            "sameAs": schemadata.sameAs  // Adding sameAs property
          },
          /*{
            "@type": "BreadcrumbList",
            "@id": `${domain}/${schemadata.slug}#breadcrumb`,
            "itemListElement": breadcrumbs
          },*/
          {
            "@type": "Organization",
            "@id": `${domain}/#organization`,
            "name": "Galaxy Weblinks",
            "url": `${domain}/`,
            "logo": {
              "@type": "ImageObject",
              "url": schemadata.logoUrl,
              "contentUrl": schemadata.logoUrl,
              "width": 148,
              "height": 48,
              "caption": "Galaxy Weblinks"
            },
            "sameAs": schemadata.sameAs  // Adding sameAs property
          }
        ]
      };
    default:
      return {};
  }
};
