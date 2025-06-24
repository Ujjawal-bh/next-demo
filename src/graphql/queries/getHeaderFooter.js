import { gql } from "@apollo/client";

export const GET_HEADER_FOOTER = gql`
  {
    menuItems(where: { location: PRIMARY }) {
      nodes {
        id
        label
        url
        uri
        parentId
        childItems {
          nodes {
            id
            label
            url
            uri
            childItems(first: 1000) {
              nodes {
                label
                id
                url
                uri
                childItems(first: 100) {
                  nodes {
                    label
                    url
                    uri
                    id
                    childItems(first: 100) {
                      nodes {
                        id
                        label
                        uri
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    themeOptions {
      themeSettings {
        headerLogo {
          node {
            altText
            title
            sourceUrl
            mediaDetails {
              sizes {
                width
                height
              }
            }
          }
        }
        headerButton {
          target
          title
          url
        }
        footerDescription
        copyrightText
        footerLogo {
          node {
            altText
            title
            uri
            sourceUrl
            mediaDetails {
              sizes {
                width
                height
              }
            }
          }
        }
        footerlinks {
          footerNavOneLabel
          footerNavOneLinks {
            footerOneLink {
              target
              title
              url
            }
          }
          footerNavTwoLabel
          footerNavTwoLinks {
            footerTwoLink {
              target
              title
              url
            }
          }
          footerNavThreeLabel
          footerNavThreeLinks {
            footerThreeLink {
              target
              title
              url
            }
          }
          footerNavFourLabel
          footerNavFourLinks {
            footerFourLink {
              target
              title
              url
            }
          }
        }
        searchButton
        socialLinks {
          platform
          url
        }
        topNavigation
      }
    }
  }
`;
