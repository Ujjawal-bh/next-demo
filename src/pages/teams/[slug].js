import client from "../../lib/apolloClient";
import {
  GET_ALL_TEAM_SLUGS,
  GET_SINGLE_TEAM,
} from "../../graphql/queries/getSingleTeam";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { GET_HEADER_FOOTER } from "../../graphql/queries/getHeaderFooter";
import Seo from "../../components/layout/SEO";

export default function BlogPost({ team, menuItem, themeOptions }) {

  {/* Fetch SEO data */}
  const seo = team.seo;
  const seoPageData = {
    'pageslug': team?.slug,
    'pagedate': team?.date,
    'pagemodified': team?.modified,
    'pagefeaturedImage': team?.featuredImage,
    'author': "",
  }

  return (
    <>
      <Seo SeoData={seo} type="team" seoPageData={seoPageData} />
      <Layout menuItem={menuItem} themeOption={themeOptions}>
        <article className="py-14 mt-10">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="grid gap-8 lg:grid-cols-1">
              <div className="gap-8 sm:flex">
                <div className="w-full h-60">
                
                  {/* Featured Image */}
                  {team.featuredImage?.node?.sourceUrl && (
                    <img
                      src={team.featuredImage.node.sourceUrl}
                      alt={team.title}
                      className="w-full h-full object-cover object-center shadow-md rounded-xl"
                    />
                  )}
                </div>
                <div className="mt-4 sm:mt-0 font-medium">
                  <Link
                    href="/teams"
                    className="text-sm text-blue-600 hover:underline mb-4 block"
                  >{"← Back to Meet Our Team"}                    
                  </Link>
                  
                  {/* Title and Meta */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {team.title}
                  </h1>
                  <h2 className="text-indigo-600">{team?.teamOptionsFields?.designation || "Team Member"}</h2>

                  {/* Post Content */}
                  <div
                    className="prose prose-lg prose-blue max-w-none mt-4"
                    dangerouslySetInnerHTML={{ __html: team.content }}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
}

{/* Generate static paths */}
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_TEAM_SLUGS,
  });

  const paths = data?.teams?.nodes?.map((team) => ({
      params: { slug: team.slug },
  })) || [];

  return {
    paths,
    fallback: "blocking",
  };
}

{/* Fetch post data */}
export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_SINGLE_TEAM,
    variables: { slug: params.slug },
  });

  const { data: headerfotterdata } = await client.query({
    query: GET_HEADER_FOOTER,
  });    

  return {
    props: {
      team: data?.team,
      menuItem: headerfotterdata?.menuItems?.nodes || [],
      themeOptions: headerfotterdata?.themeOptions?.themeSettings || [],
    },
    revalidate: 60,
  };
}