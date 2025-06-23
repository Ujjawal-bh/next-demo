import { gql } from '@apollo/client';

export const GET_ALL_TEAM_SLUGS = gql`
  query GetAllTeamSlugs {
    teams(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_SINGLE_TEAM = gql`
  query GetSingleTeam($slug: ID!) {
    team(id: $slug, idType: URI) {
      id
      title
      content
      slug
      date
      modified
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
