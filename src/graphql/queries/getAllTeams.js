import { gql } from '@apollo/client';

export const GET_TEAMSSEO = gql`
query GetTeamsSEO {
  page(id: "teams", idType: URI) {
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
  }
}
`;

export const GET_ALL_TEAMS = gql`
  query GetAllTeams($first: Int!, $after: String) {
  teams(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    nodes {
      id
      slug
      title
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
      teamOptionsFields {
        designation
        socialLinks {
          socialChannel
          socialLink
        }
      }
    }
  }
}
`;