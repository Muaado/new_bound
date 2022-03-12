import { graphql, Link } from "gatsby";
import BlogPost from "../components/Post/blog-post";
import React from "react";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import { getResortUrl, getVillaUrl, toPlainText } from "../lib/helpers";
import { BeachVillaStyles } from "../styles/BeachVillaStyles";
import Image from "gatsby-plugin-sanity-image";
import { ContactUs } from "../components/Homepage/ContactUs";
import LeftSidebar from "../components/LeftSidebar";

import Measure from "../assets/icons/villaSpecifications/measure.svg";
import TwoPeople from "../assets/icons/villaSpecifications/two-people.svg";
import Bed from "../assets/icons/villaSpecifications/bed.svg";
import Shower from "../assets/icons/villaSpecifications/shower.svg";
import SwimmingPool from "../assets/icons/villaSpecifications/swimming-pool.svg";

export const query = graphql`
  query ResortCollectionTemplateQuerys($type: String!) {
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
          name
          imageThumb {
            ...SanityImage
            alt
          }
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
          maxOccupancy {
            option
            number
          }
          villaPoolTypes {
            poolType
          }
          sizeSqm
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

const ResortCollectionTemlate = (props) => {
  const { data, errors, pageContext } = props;

  const collections = data && data.collections;
  const site = data && data.site;

  const collectionData = {};
  let items = [];

  let numberOfShowers = 0;

  items = items.flat();

  let villaPoolTypes = [];
  let maxOccupancy = [];
  console.log(collections.nodes[0].type.type);

 

  // beachvillas.villas?.forEach((villa) => {
  //   //console.log(villa.villaPoolTypes);
  //   // numberOfShowers = villa.showers.length;

  //   villaPoolTypes = villa.villaPoolTypes;
  //   maxOccupancy = villa.maxOccupancy;

  //   villas.push({
  //     villa,
  //     numberOfShowers: numberOfShowers,
  //     villaPoolTypes: villaPoolTypes,
  //     maxOccupancy: maxOccupancy,
  //   });
  // });

  // loop through iems in beachvilla

  let col = [];
  let villas = [];

  // collections.nodes.forEach((collection) => {
  //   let numshowers = 0;

  //   collection.villas.forEach((villa, numshowers) => {
  //     villa.showers.forEach((shower) => {
  //       numshowers += shower.number;
  //     });

  //     villas.push({...villa, numberofshowers: numshowers});

  //     //console.log(villa.villaPoolTypes);
  //     // numberOfShowers = villa.showers.length;
  //   });
  // });


  // collectionData.getUrl = (data) => getVillaUrl(data);

  return (
    <Layout>
      <LeftSidebar />
      <BeachVillaStyles>
        {/* <h1 className="collectionpage_title">{collectiontype.name}</h1>
        {collectiontype.imageThumb && (
          <div className="collection__image">
            {collectiontype.imageThumb && collectiontype.imageThumb.asset && (
              <Image
                {...collectiontype.imageThumb}
                alt={collectiontype.imageThumb.alt}
              />
            )}
          </div>
        )} */}

        <h1>HELLO FROM RESORT TEMPLATE</h1>

        <ContactUs contactUs={site.contactUs} />
      </BeachVillaStyles>
    </Layout>
  );
};

export default ResortCollectionTemlate;
