import { gql } from "@apollo/client";

export const GET_HOME_DATA = gql`
  {
    page(id: "/", idType: URI) {
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
      homepagecontent {
        flexibleContent {
        __typename
          ... on HomepagecontentFlexibleContentTextblockLayout {
            text
          }
          ... on HomepagecontentFlexibleContentHeroSectionWithLogoLayout {
            addAClass
            description
            ctaButtonOne {
              target
              title
              url
            }
            ctaButtonTwo {
              target
              title
              url
            }
            heading
            heroImage {
              node {
                altText
                title
                sourceUrl(size: LARGE)
              }
            }
            logoRepeater {
              logo {
                node {
                  altText
                  title
                  sourceUrl(size: THUMBNAIL)
                }
              }
            }
            logoSectionHeading
            subheading
          }
          ... on HomepagecontentFlexibleContentImageblockLayout {
            image {
              node {
                altText
                title
                sourceUrl(size: MEDIUM_LARGE)
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
