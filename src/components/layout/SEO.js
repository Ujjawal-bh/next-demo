import Head from 'next/head';
import { useRouter } from 'next/router';
import{ generateJsonLd } from '../../lib/jsonld';
import omimage from "../../../public/Custom-Software-Development-Company-Galaxy-Weblinks.png";

const Seo = ({ SeoData, type, seoPageData }) => {
  const router = useRouter();
  const { pathname } = router;
  const domain = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://nextjs-demo.galaxyweblinks.com';
  const currentUrl = `${domain}${router.asPath}`;
  const {
    title,
    metaDesc,
    breadcrumbs,
    metaKeywords,
    opengraphTitle,
    opengraphDescription,
    opengraphSiteName,
    opengraphPublishedTime,
    opengraphModifiedTime,
    twitterTitle,
    twitterDescription,
    twitterImage,
    metaRobotsNoindex,
    metaRobotsNofollow,
  } = SeoData || {};
 
  const schemadata = {
    "title": title ,
    "content": metaDesc,
    "slug" : seoPageData?.pageslug,
    "date" : seoPageData?.pagedate,
    "author" :  seoPageData?.author,
    "pagefeaturedImage" : seoPageData?.featuredImage,
    "datePublished" : seoPageData?.pagemodified,
    "dateModified" : seoPageData?.pagemodified,
    "breadcrumbs" : breadcrumbs,
    "logoUrl" : "",
    "sameAs": seoPageData?.socialLinks
  };

  const pagefeaturedImage = seoPageData?.pagefeaturedImage?.node?.sourceUrl ||  omimage?.src;

  //console.log("pagefeaturedImage", pagefeaturedImage);
  
  const jsonLd = generateJsonLd(type, schemadata,pathname);
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={metaDesc || ''} />
      <meta name="keywords" content={metaKeywords || ''} />
      {/*<meta name="robots" content={`${metaRobotsNoindex}, ${metaRobotsNofollow}`} />*/ }

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={opengraphTitle || title} />
      <meta property="og:description" content={opengraphDescription || metaDesc} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={opengraphSiteName} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={pagefeaturedImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="article:published_time" content={opengraphPublishedTime} />
      <meta property="article:modified_time" content={opengraphModifiedTime} />

      {/* Twitter */}
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta name="twitter:description" content={twitterDescription || metaDesc} />
      {twitterImage && <meta name="twitter:image" content={twitterImage.sourceUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default Seo;
