import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_TAGS,
  GET_BLOG_SEO
} from "../graphql/queries/getBlogData";
import client from "../lib/apolloClient";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { GET_HEADER_FOOTER } from "../graphql/queries/getHeaderFooter";
import Seo from '../components/layout/SEO';

const POSTS_PER_PAGE = 6;

export default function BlogPage({
  initialPosts,
  initialCategories,
  initialTags,
  menuItem,
  themeOptions,
  blogData
}) {
  const router = useRouter();
  const { category, tag } = router.query;

  const [activeCategory, setActiveCategory] = useState(category || "");
  const [activeTag, setActiveTag] = useState(tag || "");

  {/* Fetch SEO data */}
  const seo = blogData?.seo;
  const seoPageData = {
    'pageslug': blogData?.slug,
    'pagedate': blogData?.date,
    'pagemodified': blogData?.modified,
    'pagefeaturedImage': blogData?.featuredImage,
    'author': "",
  }
 
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      first: POSTS_PER_PAGE,
      category: activeCategory,
      tag: activeTag,
    },
    initialData: initialPosts ? { posts: initialPosts } : undefined,
    notifyOnNetworkStatusChange: true,
  });

  const posts = data?.posts?.edges || [];
  const pageInfo = data?.posts?.pageInfo || {};
  const categories = initialCategories?.categories?.edges || [];
  const tags = initialTags?.tags?.edges || [];

  const handleCategoryFilter = (slug) => {
    setActiveCategory(slug);
    setActiveTag("");
    router.push(
      {
        pathname: "/blog",
        query: { category: slug },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleTagFilter = (slug) => {
    setActiveTag(slug);
    setActiveCategory("");
    router.push(
      {
        pathname: "/blog",
        query: { tag: slug },
      },
      undefined,
      { shallow: true }
    );
  };

  const clearFilters = () => {
    setActiveCategory("");
    setActiveTag("");
    router.push("/blog", undefined, { shallow: true });
  };

  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMorePosts = async () => {
    if (pageInfo.hasNextPage && !isFetchingMore) {
      setIsFetchingMore(true);
      try {
        await fetchMore({
          variables: {
            first: POSTS_PER_PAGE,
            after: pageInfo.endCursor,
            category: activeCategory,
            tag: activeTag,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;

            return {
              posts: {
                ...fetchMoreResult.posts,
                edges: [
                  ...prevResult.posts.edges,
                  ...fetchMoreResult.posts.edges,
                ],
              },
            };
          },
        });
      } finally {
        setIsFetchingMore(false);
      }
    }
  };

  return (
    <>
      <Seo SeoData={seo} type="page" seoPageData={seoPageData} />
      <Layout menuItem={menuItem} themeOption={themeOptions}>
      <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Blog</h1>

      {/* Filters Section */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={clearFilters}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory && !activeTag
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {"All Posts"}
          </button>

          <h3 className="w-full text-lg font-semibold text-gray-800 mt-4 mb-2">{"Categories"}</h3>
          {categories.map(({ node }) => (
            <button
              key={node.id}
              onClick={() => handleCategoryFilter(node.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === node.slug
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {node.name} ({node.count})
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <h3 className="w-full text-lg font-semibold text-gray-800 mt-4 mb-2">
            {"Tags"}
          </h3>
          {tags.map(({ node }) => (
            <button
              key={node.id}
              onClick={() => handleTagFilter(node.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTag === node.slug
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {node.name} ({node.count})
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {loading && !posts.length ? (
        <div className="text-center py-12">{"Loading..."}</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          {"Error loading posts"}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map(({ node }) => (
              <article
                key={node.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {node.featuredImage?.node?.sourceUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={node.featuredImage.node.sourceUrl}
                      alt={node.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {node.categories.edges.map(({ node: category }) => (
                      <span
                        key={category.slug}
                        className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900">
                    <Link
                      href={`/blog/${node.slug}`}
                      className="hover:text-blue-600"
                    >{node.title}
                    </Link>
                  </h2>
                  <div
                    className="text-gray-600 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: node.excerpt }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {node.tags.edges.map(({ node: tag }) => (
                      <span
                        key={tag.slug}
                        className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {pageInfo.hasNextPage && (
            <div className="text-center">
              <button
                onClick={loadMorePosts}
                disabled={isFetchingMore}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isFetchingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
    </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data: initialPosts } = await client.query({
    query: GET_POSTS,
    variables: { first: POSTS_PER_PAGE },
  });

  const { data: initialCategories } = await client.query({
    query: GET_CATEGORIES,
  });

  const { data: initialTags } = await client.query({
    query: GET_TAGS,
  });

  const { data: headerfotterdata } = await client.query({
    query: GET_HEADER_FOOTER,
  });

  const blogData = await client.query({
    query: GET_BLOG_SEO,
  });

  return {
    props: {
      initialPosts,
      initialCategories,
      initialTags,
      menuItem: headerfotterdata?.menuItems?.nodes || [],
      themeOptions: headerfotterdata?.themeOptions?.themeSettings || [],
      blogData: blogData?.data?.page || [],
    },
    revalidate: 60, // ISR: regenerate page every 60 seconds
  };
}
