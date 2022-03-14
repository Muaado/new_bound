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
  query ResortCollectionTemplateQuery($name: String!) {
    collections: allSanityCollection(
      filter: { type: { name: { eq: $name } } }
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
          resortBrandLogo {
            ...SanityImage
            alt
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

const ResortCollectionTemplate = (props) => {
  const { data, errors, pageContext } = props;

  const collections = data && data.collections;
  const site = data && data.site;
  let numberOfShowers = 0;

  // Create our number formatter.
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  let collectiontype = collections.nodes[0].type;

  let resortscol = [];
  let cols = [];

  collections.nodes.forEach((collection) => {
    let collectioname = collection.name;
    cols.push(collection);
  });

  cols.forEach((col) => {
    col.resorts.forEach((resort) => {
      resortscol.push(resort);
    });
  });

  console.log(resortscol);

  return (
    <Layout>
      <LeftSidebar />
      <BeachVillaStyles>
        <h1 className="collectionpage_title">{collectiontype.name}</h1>
        {collectiontype.imageThumb && (
          <div className="collection__image_hero">
            {collectiontype.imageThumb && collectiontype.imageThumb.asset && (
              <Image
                {...collectiontype.imageThumb}
                alt={collectiontype.imageThumb.alt}
              />
            )}
          </div>
        )}

        <div className="collection_container">
          {cols?.map((col) => (
            // eslint-disable-next-line react/jsx-key
            <div className="mastercol">
              <h2 className="col_name">{col.name}</h2>

              <ul className="collection_wrap">
                {col.resorts?.map((resort) => (
                  // eslint-disable-next-line react/jsx-key
                  <li className="collection_wrap_item">
                    {resort.image && (
                      <div className="collection__image">
                        {resort.image && resort.image.asset && (
                          <Image {...resort.image} alt={resort.image.alt} />
                        )}
                      </div>
                    )}

                    <div className="collection__details">
                      <Link to={resort.url}>
                        <h4 className="villaname">{resort.name}</h4>
                      </Link>

                      {resort.resortBrandLogo && (
                        <div className="collection_brand_logo">
                          {resort.resortBrandLogo &&
                            resort.resortBrandLogo.asset && (
                              <Image
                                {...resort.resortBrandLogo}
                                alt={resort.resortBrandLogo.alt}
                              />
                            )}
                        </div>
                      )}
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

export default ResortCollectionTemplate;
