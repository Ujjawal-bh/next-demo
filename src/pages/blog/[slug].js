import client from "../../lib/apolloClient";
import {
  GET_ALL_POST_SLUGS,
  GET_SINGLE_POST,
} from "../../graphql/queries/getPostBySlug";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { GET_HEADER_FOOTER } from "../../graphql/queries/getHeaderFooter";
import Seo from "../../components/layout/SEO";

export default function BlogPost({ post, menuItem, themeOptions }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  {/* Fetch SEO data */}
  const seo = post.seo;
  const seoPageData = {
    'pageslug': post?.slug,
    'pagedate': post?.date,
    'pagemodified': post?.modified,
    'pagefeaturedImage': post?.featuredImage,
    'author': "",
  }

  return (
    <>
      <Seo SeoData={seo} type="team" seoPageData={seoPageData} />
      <Layout menuItem={menuItem} themeOption={themeOptions}>
        <article className="max-w-4xl mx-auto px-4 py-12">
          <Link
            href="/blog"
            className="text-sm text-blue-600 hover:underline mb-4 block"
          >
           {" ← Back to Blog "}
          </Link>

          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <img
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              className="rounded-xl mb-6 w-full object-cover max-h-[400px]"
            />
          )}

          {/* Title and Meta */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <span>{formattedDate}</span>
            {post.author?.node?.name && (
              <>
                <span className="mx-2">•</span>
                <span>By {post.author.node.name}</span>
              </>
            )}
          </div>

          {/* Tags */}
          {post.tags?.nodes?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.nodes.map((tag) => (
                <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                  <span className="bg-gray-100 text-sm text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition">
                    #{tag.name}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Post Content */}
          <div
            className="prose prose-lg prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </Layout>
    </>
  );
}

 {/* Generate static paths */}
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_POST_SLUGS,
  });

  const paths =
    data?.posts?.nodes?.map((post) => ({
      params: { slug: post.slug },
    })) || [];

  return {
    paths,
    fallback: "blocking",
  };
}

{/* Fetch post data */}
export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_SINGLE_POST,
    variables: { slug: params.slug },
  });

  const { data: headerfotterdata } = await client.query({
    query: GET_HEADER_FOOTER,
  });

  return {
    props: {
      post: data?.postBy,
      menuItem: headerfotterdata?.menuItems?.nodes || [],
      themeOptions: headerfotterdata?.themeOptions?.themeSettings || [],
    },
    revalidate: 60,
  };
}
  
