// // GraphQL query to fetch page by slug
import { gql } from "@apollo/client";

export const GET_ALL_PATHS = gql`
  query GetAllPaths {
    pages(where: { status: PUBLISH }, first: 100) {
      nodes {
        uri
      }
    }

  }
`;

export const GET_PAGE_BY_URI = gql`
  query GetPageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
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
          parent {
            node {
              uri
              slug
              id
              ... on Page {
                id
                uri
                title
                slug
                parent {
                  node {
                    id
                    uri
                    slug
                  }
                }
              }
            }
          }
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
      pageAcfflexibleBlocks {
        flexibleContent {
          __typename
          ... on PageAcfflexibleBlocksFlexibleContentTextblockLayout {
            text
          }
          ... on PageAcfflexibleBlocksFlexibleContentImageblockLayout {
            image {
              node {
                altText
                title
                sourceUrl(size: LARGE)
              }
            }
          }
          ... on PageAcfflexibleBlocksFlexibleContentPrimaryHeroSectionLayout {
            description
            heading
            ctaButtonTwo {
              target
              title
              url
            }
            ctaButtonOne {
              target
              title
              url
            }
          }
        }
      }
    }
  }
`;
