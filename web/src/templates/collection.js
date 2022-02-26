import { graphql, Link } from "gatsby";
import BlogPost from "../components/Post/blog-post";
import React from "react";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import { getResortUrl, getVillaUrl, toPlainText } from "../lib/helpers";
import { CollectionStyles } from "../styles/CollectionTemplateStyles";
import Image from "gatsby-plugin-sanity-image";
import { ContactUs } from "../components/Homepage/ContactUs";
import LeftSidebar from "../components/LeftSidebar";

export const query = graphql`
  query CollectionTemplateQuery($type: String!) {
    collections: allSanityCollection(
      filter: { type: { type: { eq: $type } } }
    ) {
      nodes {
        name
        imageWeb {
          ...SanityImage
          alt
        }
        type {
          type
        }
        resorts {
          name
          locationAtoll

          image {
            ...SanityImage
            alt
          }
        }
        villas {
          name
          alternateName
          short_desc
          showers {
            option
            number
          }
          imageThumb {
            ...SanityImage
            alt
          }
          
          resort {
            name
          }
         
        }
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      contactUs {
        address
        email
        phoneOne
        contactPeople {
          name
          image {
            ...SanityImage
            alt
          }
        }
        hours {
          days
          hours
        }
        businessHoursDescription
      }
    }
  }
`;

const CollectionTemplate = (props) => {
  const { data, errors, pageContext } = props;

  const collections = data && data.collections;
  const site = data && data.site;

  const collectionData = {};
  let items = [];

  // switch (pageContext.type) {
  //   case "resort":
  //     collections.nodes?.forEach(({ resorts }) =>
  //       items.push({ name: "", records: resorts })
  //     );

  //     collectionData.getUrl = (data) => getResortUrl(data);
  //     break;
  //   case "villa":
  //     collections.nodes?.forEach(({ name, villas }) =>
  //       items.push({ name, records: villas })
  //     );
  //     collectionData.getUrl = (data) => getVillaUrl(data);
  //     break;
  // }
  // items = items.flat();

  return (
    <Layout>
      <LeftSidebar />
      <CollectionStyles>
       

       <h1>Hello</h1>
      </CollectionStyles>
    </Layout>
  );
};

export default CollectionTemplate;
