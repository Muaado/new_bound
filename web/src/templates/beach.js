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
  query BeachTemplateQuery($id: String!) {
    pagesdata: sanityCollectionPage(id: { eq: $id }) {
      CollectionPageName
      image {
        ...SanityImage
      }
      beachVillaCollection {
        CollectionName
        sectionHeroImage {
          ...SanityImage
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
        featuredvillas {
          title
          villaone {
            name
            price
            short_desc
            tagline
            imageThumb {
              ...SanityImage
              alt
            }
            headerImages {
              images {
                ...SanityImage
                alt
              }
            }
            resort {
              resortBrandLogo {
                ...SanityImage
                alt
              }
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

const BeachTemplate = (props) => {
  const { data, errors, pageContext } = props;
  const collections = data && data.pagesdata;
  const site = data && data.site;

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  let beachvillas = [];
  let cols = [];

  collections.beachVillaCollection.forEach((collection) => {
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
  // collectionData.getUrl = (data) => getVillaUrl(data);

  return (
    <Layout>
      <LeftSidebar />
      <BeachVillaStyles>
        <h1 className="collectionpage_title">
          {collections.CollectionPageName}
        </h1>
        {collections.image && (
          <div className="collection__image_hero">
            {collections.image && collections.image.asset && (
              <Image {...collections.image} alt={collections.image.alt} />
            )}
          </div>
        )}

        <div className="collection_container">
          {cols?.map((col) => (
            // eslint-disable-next-line react/jsx-key
            <div className="mastercol">
              <h2 className="col_name">{col.CollectionName}</h2>

              <ul className="collection_wrap">
                {col.villas?.map((villa) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <li className="collection_wrap_item">
                      <div className="collection__image">
                     
                        
                          {villa.imageThumb && villa.imageThumb.asset && (
                            <Image
                              {...villa.imageThumb}
                              alt={villa.imageThumb.alt}
                            />
                          )}
               
                      </div>

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

              {/* Begin Featured Villa Section */}
              {col.featuredvillas[0] && (
                <div className="featured_villa_section">
                  {/* BEGIN LEFT SECTION */}
                  <div className="photofeatured">
                    <Image
                      className="featuredreslogo"
                      {...col.featuredvillas[0].villaone.resort.resortBrandLogo}
                      alt={
                        col.featuredvillas[0].villaone.resort.resortBrandLogo
                          .alt
                      }
                    />
                    <Image
                      className="featured_villa_image"
                      {...col.featuredvillas[0].villaone.imageThumb}
                    />

                    <div className="featuredVillaFooter">
                      <Link to={col.featuredvillas[0].villaone.url}>
                        <h3 className="featuredVillaName">
                          {col.featuredvillas[0].villaone.name}
                        </h3>
                      </Link>
                      <h4 className="featuredVillaPrice">
                        {col.featuredvillas[0].villaone.price}
                      </h4>
                      <Link to={col.featuredvillas[0].villaone.url}>
                        <h4 className="featuredVillaView">View Room</h4>
                      </Link>
                    </div>
                  </div>
                  {/*  END LEFT SECTION */}

                  {/* BEGIN RIGHT SECTION */}
                  <div className="rightfeatured">
                    {col.featuredvillas[0].villaone.headerImages.images[1] && (
                      <Image
                        {...col.featuredvillas[0].villaone.headerImages
                          .images[1]}
                        alt={
                          col.featuredvillas[0].villaone.headerImages.images[1]
                            .alt
                        }
                      />
                    )}
                    <div className="txtwrap">
                      <h3>{col.featuredvillas[0].title}</h3>
                      <h2 className="tagline">
                        {col.featuredvillas[0].villaone.tagline}
                      </h2>
                      <p className="description">
                        {col.featuredvillas[0].villaone.short_desc}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <ContactUs contactUs={site.contactUs} />
      </BeachVillaStyles>
    </Layout>
  );
};

export default BeachTemplate;
