import { graphql, Link } from "gatsby";
import BlogPost from "../components/Post/blog-post";
import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
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
          numrooms

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
            numrooms
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
      banner {
        sectionHeroImage {
          ...SanityImage
          alt
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
  console.log("DATA", data);
  const collections = data && data.pagesdata;
  const site = data && data.site;
  const banners = data?.pagesdata?.banner;
  // log scroll position on scroll

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
  let featuredvillas = [];

  collections.beachVillaCollection.forEach((collection) => {
    let collectioname = collection.name;
    cols.push(collection);
  });

  cols.forEach((col) => {
    beachvillas = [];
    col.villas.forEach((villa) => {
      beachvillas.push(villa);

      let villaShowers = villa.showers;
      let maxOccupancy = villa.maxOccupancy;
      // console.log(villa);

      let max_occupancy = "-";
      let villa_showers = "-";
      let pool_type = "";

      // for every 3rd villa, add villa_odd class as True

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
        villa["price_new"] = formatter.format(villa.price);
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

  console.log("BANNERS", banners);
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
          {cols?.map((col, key) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="mastercol">
                <h3 className="col_name">{col.CollectionName}</h3>

                <ul className="collection_wrap">
                  {col.villas?.map((villa, key) => {
                    //  for every second villa index add a new row
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Link to={villa.url}>
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
                            <h4 className="villaname">{villa.name}</h4>
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
                                <Bed />
                                <span className="villa_icon_label">
                                  {villa.numrooms}
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

                            <div className="villa_price-logo-wrapper">
                              <div className="villa_price">
                                <span className="price-from font-bold">
                                  From
                                </span>{" "}
                                <span className="font-bold">
                                  {villa.price_new}
                                </span>
                                <span className="price-category">
                                  per person
                                </span>
                              </div>
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
                          </div>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
                {key === 2 && banners[0]?.sectionHeroImage?.asset && (
                  <div className="villa_banners villa_nuatilus_banner">
                    <Image
                      className="featuredreslogo"
                      {...banners[0]?.sectionHeroImage}
                    />
                    <div className="nuatilus_texts">
                      <div className="nuatilus_text">
                        <div className="top-border" />
                        <h2>PARK HYYAT</h2>
                        <div className="bottom-border" />
                      </div>
                    </div>
                  </div>
                )}
                {/* Begin Featured Villa Section */}
                {col.featuredvillas[0] && (
                  <div className="featured_villa_section">
                    {/* BEGIN LEFT SECTION */}
                    <div className="photofeatured">
                      <div class="inner">
                        <Image
                          className="featuredreslogo"
                          {...col.featuredvillas[0].villaone.resort
                            .resortBrandLogo}
                          alt={
                            col.featuredvillas[0].villaone.resort
                              .resortBrandLogo.alt
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
                    </div>
                    {/*  END LEFT SECTION */}

                    {/* BEGIN RIGHT SECTION */}
                    <div className="rightfeatured">
                      <div class="inner">
                        {col.featuredvillas[0].villaone.headerImages
                          .images[1] && (
                          <Image
                            {...col.featuredvillas[0].villaone.headerImages
                              .images[1]}
                            alt={
                              col.featuredvillas[0].villaone.headerImages
                                .images[1].alt
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
                  </div>
                )}
                {key === 1 && banners[1]?.sectionHeroImage?.asset && (
                  <div className="villa_banners villa_banner_boundless">
                    <Image
                      className="villaBoundlessBanner"
                      {...banners[1]?.sectionHeroImage}
                    />
                    <div className="boundless_texts">
                      <div className="boundless_text">
                        <h3> BOUNDLESS</h3>
                      </div>
                      <div className="boundless_sub_text">
                        ONLY THE BEST IN THE WORLD
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <ContactUs contactUs={site.contactUs} />
      </BeachVillaStyles>
    </Layout>
  );
};

export default BeachTemplate;
