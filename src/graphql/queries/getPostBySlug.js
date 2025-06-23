import { gql } from '@apollo/client';

export const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs {
    posts(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query GetSinglePost($slug: String!) {
  postBy(slug: $slug) {
    title
    content
    date
    excerpt
    slug
    featuredImage {
      node {
        sourceUrl
      }
    }
    author {
      node {
        name
      }
    }
    tags {
      nodes {
        name
        slug
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
