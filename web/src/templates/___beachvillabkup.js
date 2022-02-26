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
  query CollectionTemplateQuerysssss($type: String!) {
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
  const site = data && data.site;

  const collectionData = {};
  let items = [];
  // let beachvillas = [];

  let villas = [];

  let numberOfShowers = 0;

  switch (pageContext.type) {
    case "resort":
      collections.nodes?.forEach(({ resorts }) =>
        items.push({ name: "", records: resorts })
      );

      collectionData.getUrl = (data) => getResortUrl(data);
      break;
    case "villa":
      collections.nodes?.forEach(({ name, villas }) =>
        items.push({ name, records: villas })
      );
      collectionData.getUrl = (data) => getVillaUrl(data);
      break;
  }
  items = items.flat();

  // const beachvillas =
  //   collections.nodes[0].type === "Villas with Pool"
  //     ? collections.nodes[0]
  //     : [];

  // let villaPoolTypes = [];
  // let maxOccupancy = [];
  console.log(collections);


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
        {collections.nodes[0]?.imageWeb && (
          <div className="collection__image">
            <h1>{collections.nodes[0].name}</h1>
            {collections.nodes[0].imageWeb &&
              collections.nodes[0].imageWeb.asset && (
                <Image
                  {...collections.nodes[0].imageWeb}
                  alt={collections.nodes[0].imageWeb.alt}
                />
              )}
          </div>
        )}

        <div className="collection__list">
          <ul className="collection_card_container">
            {villas.map((villa) => (
              // eslint-disable-next-line react/jsx-key
              <li className="collection_card_item">
                {villa.villa.imageThumb && (
                  <div className="collection__image">
                    {villa.villa.imageThumb && villa.villa.imageThumb.asset && (
                      <Image
                        {...villa.villa.imageThumb}
                        alt={villa.villa.imageThumb.alt}
                      />
                    )}
                  </div>
                )}

                <h4>{villa.villa.name}</h4>

                <div className="collection__footer">
                  <ul className="villa__header-icons">
                    <li>
                      {villa.villa.sizeSqm && (
                        <li>
                          <Measure />
                          {villa.villa.sizeSqm}m2
                        </li>
                      )}
                    </li>
                    <li>
                      <TwoPeople />
                      {villa.villa.maxOccupancy.map(
                        ({ number }, index) =>
                          `${number}${
                            index + 1 !== villa.villa.maxOccupancy.length
                              ? ","
                              : ""
                          } `
                      )}
                    </li>
                    <li>
                      <Shower />
                      {villa.villa.numberOfShowers}
                    </li>
                    {villaPoolTypes && (
                      <li>
                        <SwimmingPool />
                        {villaPoolTypes[0].poolType}
                      </li>
                    )}

                    {villaPoolTypes[1] && (
                      <li>
                        <SwimmingPool />
                        {villaPoolTypes[1].poolType}
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ContactUs contactUs={site.contactUs} />
      </BeachVillaStyles>
    </Layout>
  );
};

export default BeachVillaTemplate;
