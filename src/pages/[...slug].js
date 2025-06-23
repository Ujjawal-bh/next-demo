import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import client from "../lib/apolloClient";
import { GET_HEADER_FOOTER } from "../graphql/queries/getHeaderFooter";
import {
  GET_ALL_PATHS,
  GET_PAGE_BY_URI,
} from "../graphql/queries/getPageBySlug";
import BlockRenderer from "../components/layout/Page/BlockRenderer";
import Seo from "../components/layout/SEO";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_PATHS,
  });

  const paths = data.pages.nodes
  .filter((page) => {
    if (!page.uri) {
      console.warn("Page with missing URI:", page);
      return false; // Skip pages with null URI
    }
    return true;
  })
  .map((page) => {
    const slugArray = page.uri.substring(1).split("/").filter(Boolean);
    if (
      slugArray.length === 0 ||     // root page
      slugArray[0] === "blog" || slugArray[0] === "contact-us" || slugArray[0] === "teams"     // any blog-related page
    ) {
      return null; // Skip these pages
    }
    return { params: { slug: slugArray } };
  })
  .filter(Boolean); // Remove nulls

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slugArray = params?.slug || [];
  if (slugArray[0] === "blog") {
    return {
      notFound: true,
    };
  }
  const uri = "/" + (params.slug?.join("/") || "");

  try {
    // Try to get page first
    const pageResponse = await client.query({
      query: GET_PAGE_BY_URI,
      variables: { uri },
    });
    const { data } = await client.query({
      query: GET_HEADER_FOOTER,
    });

    console.log("page response", pageResponse?.data?.page);
    if (pageResponse.data.page) {
      return {
        props: {
          content: pageResponse.data.page,
          //type: 'page',
          menuItem: data?.menuItems?.nodes || [],
          themeOptions: data?.themeOptions?.themeSettings || [],
        },
        revalidate: 60,
      };
    }

    // If neither exists, return 404
    return {
      notFound: true,
    };
  } catch (error) {
    console.error("Error fetching content:", error);
    return {
      notFound: true,
    };
  }
}

export default function DynamicRoute({ content, menuItem, themeOptions }) {
  const router = useRouter();
  const flexibleBlocks = content?.pageAcfflexibleBlocks?.flexibleContent || [];
  const seo = content.seo;
  const seoPageData = {
    'pageslug': content?.slug,
    'pagedate': content?.date,
    'pagemodified': content?.modified,
    'pagefeaturedImage': content?.featuredImage,
    'author': "",
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Seo SeoData={seo} type="page" seoPageData={seoPageData} />
    <Layout menuItem={menuItem} themeOption={themeOptions}>
      <div className="container mx-auto px-4 py-8">
        <BlockRenderer blocks={flexibleBlocks} />
      </div>
    </Layout>
    </>
  );
}
