import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery, navigate } from "gatsby";
import Layout from "../components/layout";
import { getBlogUrl, getCollectionUrl, getResortUrl } from "../lib/helpers";
import { isLoggedIn } from "../services/auth";

const query = graphql`
  query SiteTitleQuery {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          title
          slug {
            current
          }
        }
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      logo {
        ...SanityImage
        alt
      }
      contactUs {
        address
        email
        phoneOne
      }

      headerDropdownImage {
        ...SanityImage
        alt
      }
    }

    resorts: allSanityResort(sort: { fields: [name], order: ASC }) {
      nodes {
        name
      }
    }

    # villas: allSanityVilla(filter: { featuredInNav: { eq: true } }) {
    #   nodes {
    #     name
    #     resort {
    #       name
    #     }
    #   }
    # }
    collections: allSanityCollectionType {
      nodes {
        name
        type
      }
    }

    collectionsone: allSanityCollectionPage(limit: 5) {
      nodes {
        CollectionPageName

        image {
          ...SanityImage
          alt
        }
        slug {
          current
        }
      }
    }
  }
`;

function LayoutContainer(props) {
  const navData = useStaticQuery(query);
  if (!navData.site) {
    throw new Error(
      'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
    );
  }

  const resorts = navData.resorts.nodes
    .map(({ name }) => {
      if (typeof name === "string")
        return {
          name: name,
          url: getResortUrl({ name }),
        };
    })
    .filter((item) => item !== undefined);

  const posts = navData?.posts?.edges?.map(
    ({ node: { title, publishedAt, slug } }) => {
      return {
        name: title.split(":")[0],
        url: getBlogUrl(publishedAt, slug?.current),
      };
    }
  );

  const collections = navData.collectionsone.nodes.map(
    ({ CollectionPageName, slug }) => {
      if (typeof CollectionPageName === "string")
        return {
          name: CollectionPageName,
          url: getCollectionUrl({ CollectionPageName, slug }),
        };
    }
  );

  const windowGlobal = typeof window !== "undefined";
  if (windowGlobal) {
    window.addEventListener("scroll", () => {
      let fromTop = window?.scrollY;

      const elements = document.querySelectorAll(".disappear-on-scroll");
      // console.log(elements);
      if (elements) {
        elements.forEach((element) => {
          if (
            element.nodeName !== "HEADER" &&
            element.offsetTop < fromTop + 50
          ) {
            element.classList.add("hide");
          } else if (
            element.nodeName === "HEADER" &&
            element.offsetTop + 200 < fromTop + 100
          ) {
            element.classList.add("hide");
          } else {
            element.classList.remove("hide");
          }
        });
      }
    });
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  return (
    <Layout
      navData={{ resorts, collections, posts }}
      {...props}
      siteTitle={navData.site.title}
      logo={navData.site.logo}
      contactUs={navData.site.contactUs}
      headerDropdownImage={navData.site.headerDropdownImage}
    />
  );
}

export default LayoutContainer;
