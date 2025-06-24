import { useState } from 'react';
import { GET_ALL_TEAMS, GET_TEAMSSEO } from "../graphql/queries/getAllTeams";
import client from "../lib/apolloClient";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { GET_HEADER_FOOTER } from "../graphql/queries/getHeaderFooter";
import { getTrimmedExcerpt } from '../lib/stripAndTrim';
import Seo from '../components/layout/SEO';
import SocialIcons from '../components/layout/SocialIcons';

export default function Teams({ 
    menuItem,
    themeOptions,
    initialTeams, 
    pageInfo,
    teamData
    }) {
      const [teams, setTeams] = useState(initialTeams);
      const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage);
      const [endCursor, setEndCursor] = useState(pageInfo.endCursor);
      const [loading, setLoading] = useState(false);

      {/* Fetch SEO data */}
      const seo = teamData?.seo;
      const seoPageData = {
        'pageslug': teamData?.slug,
        'pagedate': teamData?.date,
        'pagemodified': teamData?.modified,
        'pagefeaturedImage': teamData?.featuredImage,
        'author': "",
      }

      const loadMoreTeams = async () => {
        setLoading(true);
        const { data } = await client.query({
          query: GET_ALL_TEAMS,
          variables: {
            first: 6, // number of items to load
            after: endCursor,
          },
        });
    
        setTeams((prev) => [...prev, ...data.teams.nodes]);
        setEndCursor(data.teams.pageInfo.endCursor);
        setHasNextPage(data.teams.pageInfo.hasNextPage);
        setLoading(false);
      };

    return (
      <>
        <Seo SeoData={seo} type="page" seoPageData={seoPageData} />
        <Layout menuItem={menuItem} themeOption={themeOptions}>
          <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-xl">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">{teamData.title}</h3>
                    <div
                        className="text-gray-600 mt-3"
                        dangerouslySetInnerHTML={{
                          __html: teamData.content, // Adjust length as needed
                        }}
                      />
                </div>
                <div className="mt-12">
                  <ul className="grid gap-8 lg:grid-cols-2">
                    {teams.map((team) => {
                      const links = team?.teamOptionsFields?.socialLinks;
                      return (
                      <>
                      
                        <li key={team.id} className="gap-8 sm:flex">
                          <div className="w-full h-60">
                            <img
                              src={team.featuredImage.node.sourceUrl}
                              alt={team.title}
                              className="w-full h-full object-cover object-center shadow-md rounded-xl"
                            />
                            
                          </div>
                          <div className="mt-4 sm:mt-0">
                              <h4 className="text-lg text-gray-700 font-semibold">
                                <Link
                                  href={`/teams/${team.slug}`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  {team.title}
                                </Link>
                              </h4>
                              <p className="text-indigo-600">{team?.teamOptionsFields?.designation || "Team Member"}</p>
                              <div
                                className="text-gray-600 mt-2 "
                                dangerouslySetInnerHTML={{
                                  __html: getTrimmedExcerpt(team.excerpt, 100), // Adjust length as needed
                                }}
                              />
                              {/* Social Icons */}
                              {links ? (<div className="mt-3 flex gap-4 text-gray-400"><SocialIcons links={links} /></div>) : "" }
                          </div>
                      </li>
                      </>              
                    )}
                  )}
            </ul>
            {hasNextPage && (
          <div className="text-center mt-6">
            <button
              onClick={loadMoreTeams}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
                </div>
            </div>
        </section>
      </Layout>
      </>
    );
  }
  
  export async function getStaticProps() {
    const { data } = await client.query({ 
      query: GET_ALL_TEAMS,
      variables: {
        first: 6,
        after: null,
      },
    });
    const { data: headerfotterdata } = await client.query({
      query: GET_HEADER_FOOTER,
    });

    const teamData = await client.query({
      query: GET_TEAMSSEO,
    });
  
    return {
      props: {
        teams: data.teams.nodes,
        initialTeams: data.teams.nodes,
        pageInfo: data.teams.pageInfo,
        menuItem: headerfotterdata?.menuItems?.nodes || [],
        themeOptions: headerfotterdata?.themeOptions?.themeSettings || [],
        teamData: teamData?.data?.page || [],
      },
      revalidate: 60,
    };
  }
