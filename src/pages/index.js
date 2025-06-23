import Layout from "@/components/layout/Layout";
import client from "../lib/apolloClient";
import { GET_HEADER_FOOTER } from "../graphql/queries/getHeaderFooter";
import { GET_HOME_DATA } from "../graphql/queries/getHomePage";
import BlockRenderer from "../components/layout/Home/BlockRenderer";
import Seo from "../components/layout/SEO";

export default function Home(props) {
  const flexibleBlocks =
    props.homeData.data.page.homepagecontent.flexibleContent || [];
    const seo = props.homeData.data.page.seo;
    const seoPageData = {
      'pageslug': props.homeData.data.page?.slug,
      'pagedate': props.homeData.data.page?.date,
      'pagemodified': props.homeData.data.page?.modified,
      'pagefeaturedImage': props.homeData.data.page?.featuredImage,
      'author': "",
    }
    //console.log("page item Block", seoPageData);
  return (
    <>
      <Seo SeoData={seo} type="page" seoPageData={seoPageData} />
      <Layout menuItem={props.menuItem} themeOption={props.themeOptions}>
        <BlockRenderer blocks={flexibleBlocks} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_HEADER_FOOTER,
  });
  const homeData = await client.query({
    query: GET_HOME_DATA,
  });

  return {
    props: {
      menuItem: data?.menuItems?.nodes || [],
      themeOptions: data?.themeOptions?.themeSettings || [],
      homeData: homeData || [],
    },
    revalidate: 60,
  };
}
