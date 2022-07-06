import { graphql, Link } from "gatsby";
import BlogPost from "../components/Post/blog-post";
import React from "react";
import Layout from "../containers/layout";
import { CollectionStyles } from "../styles/CollectionStyles";
import Image from "gatsby-plugin-sanity-image";
import { ContactUs } from "../components/Homepage/ContactUs";
import LeftSidebar from "../components/LeftSidebar";

import Measure from "../assets/icons/villaSpecifications/measure.svg";
import TwoPeople from "../assets/icons/villaSpecifications/two-people.svg";
import Bed from "../assets/icons/villaSpecifications/bed.svg";
import Shower from "../assets/icons/villaSpecifications/shower.svg";
import SwimmingPool from "../assets/icons/villaSpecifications/swimming-pool.svg";

export const query = graphql`
  query CollectionTemplateQuerys($name: String!) {
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
          price

          resort {
            name
            resortBrandLogo {
              ...SanityImage
              alt
            }
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

  items = items.flat();

  let villaPoolTypes = [];
  let maxOccupancy = [];
  // console.log(collections);

  let collectiontype = collections.nodes[0].type;

  let beachvillas = [];
  let cols = [];

  collections.nodes.forEach((collection) => {
    let collectioname = collection.name;
    cols.push(collection);
  });

  cols.forEach((col) => {
    col.villas.forEach((villa) => {
      let villaShowers = villa.showers;
      let maxOccupancy = villa.maxOccupancy;
      // console.log(villa);

      let max_occupancy = "-";
      let villa_showers = "-";
      let pool_type = "";

      if (maxOccupancy.length == 2) {
        max_occupancy = maxOccupancy[0].number + " , " + maxOccupancy[1].number;
      } else if (maxOccupancy.length == 1) {
        max_occupancy = maxOccupancy[0].number;
      }

      villa["max_occupancy"] = max_occupancy;

      if (villaShowers.length == 2) {
        villa_showers = villaShowers[0].number + villaShowers[1].number;
      } else if (villaShowers.length == 1) {
        villa_showers = villaShowers[0].number;
      }

      if (villa.price != "null") {
        villa["price_new"] = formatter.format(villa.price) + "  PP";
      } else if (villa.price) {
        villa["price_new"] = "-";
      }

      let url = `/${villa.resort.name
        .toLowerCase()
        .split(" ")
        .join("-")}/${villa.name.toLowerCase().split(" ").join("-")}`;

      villa["url"] = url;
      villa["villa_showers"] = villa_showers;
    });
  });

  console.log(cols);

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
      <CollectionStyles>
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
                {col.villas?.map((villa) => {
                  return (
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
                        <Link to={villa.url}>
                          <h4 className="villaname">{villa.name}</h4>
                        </Link>
                        <ul className="villa_icons">
                          <li>
                            <Measure className="villa_icon measureicon" />
                            <span className="villa_icon_label">
                              {villa.sizeSqm} sqm
                            </span>
                          </li>

                          <li>
                            <Shower />
                            <span className="villa_icon_label">
                              {villa.villa_showers}
                            </span>
                          </li>

                          <li>
                            <TwoPeople />
                            <span className="villa_icon_label">
                              {villa.max_occupancy}
                            </span>
                          </li>

                          {villa.villaPoolTypes[0] && (
                            <li>
                              <SwimmingPool />
                              <span className="villa_icon_label">
                                {villa.villaPoolTypes[0].poolType}
                              </span>
                            </li>
                          )}
                        </ul>

                        <div className="villa_price">{villa.price_new}</div>

                        {villa.resort.resortBrandLogo && (
                          <div className="collection_brand_logo">
                            {villa.resort.resortBrandLogo &&
                              villa.resort.resortBrandLogo.asset && (
                                <Image
                                  {...villa.resort.resortBrandLogo}
                                  alt={villa.resort.resortBrandLogo.alt}
                                />
                              )}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <ContactUs contactUs={site.contactUs} />
      </CollectionStyles>
    </Layout>
  );
};

export default BeachVillaTemplate;
