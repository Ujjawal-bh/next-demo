import { gql } from '@apollo/client';

export const GET_BLOG_SEO = gql`
query GetBlogSEO {
  page(id: "blog", idType: URI) {
    title
    slug
    content
    date
    modified
    featuredImage {
      node {
        altText
        title
        sourceUrl
      }
    }
    seo {
      canonical
      cornerstone
      focuskw
      metaDesc
      metaKeywords
      metaRobotsNofollow
      metaRobotsNoindex
      opengraphAuthor
      opengraphDescription
      opengraphModifiedTime
      opengraphPublishedTime
      opengraphPublisher
      opengraphSiteName
      opengraphTitle
      opengraphType
      opengraphUrl
      readingTime
      title
      twitterDescription
      twitterTitle
      twitterImage {
        altText
        sourceUrl
      }
      opengraphImage {
        altText
        sourceUrl
      }
      breadcrumbs {
        text
        url
      }
    }
  }
}
`;

export const GET_POSTS = gql`
  query GetPosts($first: Int, $after: String, $category: String, $tag: String) {
    posts(
      first: $first
      after: $after
      where: {
        categoryName: $category
        tag: $tag
      }
    ) {
      edges {
        node {
          id
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                  name
                  slug
              }
            }
          }
          tags {
            edges {
              node {
                  name
                  slug
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      edges {
        node {
          id
          name
          slug
          count
        }
      }
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    tags {
      edges {
        node {
          id
          name
          slug
          count
        }
      }
    }
  }
`;