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
  query CollectionTemplateQuerys($type: String!) {
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

const BeachVillaTemplate = (props) => {
  const { data, errors, pageContext } = props;

  const collections = data && data.collections;
  const collectiontype = data && data.collections.nodes[0].type;
  const site = data && data.site;

  const collectionData = {};
  let items = [];
  // let beachvillas = [];

  let villas = [];

  let numberOfShowers = 0;

  items = items.flat();

  console.log(collectiontype);

  // const beachvillas =
  //   collections.nodes[0].type === "Villas with Pool"
  //     ? collections.nodes[0]
  //     : [];

  // let villaPoolTypes = [];
  // let maxOccupancy = [];
  // console.log(collections.nodes);

  // beachvillas.villas?.forEach((villa) => {
  //   //console.log(villa.villaPoolTypes);
  //   // numberOfShowers = villa.showers.length;

  //   let numberOfShowers = 0;

  //   villa.showers.forEach(({ number }) => (numberOfShowers += number));

  //   villaPoolTypes = villa.villaPoolTypes;
  //   maxOccupancy = villa.maxOccupancy;

  //   villas.push({
  //     villa,
  //     numberOfShowers: numberOfShowers,
  //     villaPoolTypes: villaPoolTypes,
  //     maxOccupancy: maxOccupancy,
  //   });
  // });

  // beachvilla.nodes?.forEach(({ name, villas }) =>
  //   beachvillas.push({ name, records: villas })
  //   );
  //     collectionData.getUrl = (data) => getVillaUrl(data);

  // loop through iems in beachvilla
  // for (let i = 0; i < beachvilla.nodes.length; i++) {
  //   beachvillas.push({records : collections.nodes[0].villas})
  // }

  // console.log(beachvillas);

  return (
    <Layout>
      <LeftSidebar />
      <BeachVillaStyles>
        <h1 className="collectionpage_title">{collectiontype.name}</h1>
        {collectiontype.imageThumb && (
          <div className="collection__image">
            {collectiontype.imageThumb && collectiontype.imageThumb.asset && (
              <Image
                {...collectiontype.imageThumb}
                alt={collectiontype.imageThumb.alt}
              />
            )}
          </div>
        )}

        <div className="collection_container">
          {collections.nodes?.map((col) => (
            // eslint-disable-next-line react/jsx-key
            <div className="mastercol">
              <h2 className="col_name">{col.name}</h2>
              <ul className="collection_wrap">
                {col.villas?.map((villa) => (
                  // eslint-disable-next-line react/jsx-key
                  <li className="collection_wrap_item">
                    {villa.imageThumb && (
                      <div className="collection__image">
                        {villa.imageThumb && villa.imageThumb.asset && (
                          <Image
                            {...villa.imageThumb}
                            alt={villa.imageThumb.alt}
                          />
                        )}
                      </div>
                    )}

                    <div className="collection__details">
                      <h4 className="villaname">{villa.name}</h4>
                    </div>
                    
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ContactUs contactUs={site.contactUs} />
      </BeachVillaStyles>
    </Layout>
  );
};

export default BeachVillaTemplate;
