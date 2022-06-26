import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../containers/layout";
import { BeachVillaStyles } from "../styles/BeachVillaStyles";
import Image from "gatsby-plugin-sanity-image";
import { ContactUs } from "../components/Homepage/ContactUs";
import LeftSidebar from "../components/LeftSidebar";
import { Overlay } from "../components";
import Measure from "../assets/icons/villaSpecifications/measure.svg";
import TwoPeople from "../assets/icons/villaSpecifications/two-people.svg";
import Bed from "../assets/icons/villaSpecifications/bed.svg";
import Shower from "../assets/icons/villaSpecifications/shower.svg";
import SwimmingPool from "../assets/icons/villaSpecifications/swimming-pool.svg";
import { navigate } from "gatsby";
import { truncate } from "../lib/helpers";

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
  const { data } = props;
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

  collections.beachVillaCollection.forEach((collection) => {
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
              <div key={key} className="mastercol">
                <h3 className="col_name">{col.CollectionName}</h3>

                <ul className="collection_wrap">
                  {col.villas?.map((villa, key) => {
                    return (
                      <li
                        key={`${villa.name}${key}`}
                        className="collection_wrap_item"
                        onClick={() => {
                          navigate(`${villa.url}`);
                        }}
                      >
                        <div className="collection__image">
                          {villa.imageThumb && villa.imageThumb.asset && (
                            <Image
                              {...villa.imageThumb}
                              alt={villa.imageThumb.alt}
                            />
                          )}
                        </div>
                        <div className="collection__details">
                          <h4 className="villaname">
                            {truncate(villa.name, 40)}
                          </h4>
                          <ul className="villa_icons">
                            <li>
                              <div className="inner-content">
                                <Measure className="villa_icon measureicon" />
                                <span className="villa_icon_label">
                                  {villa.sizeSqm} sqm
                                </span>
                              </div>
                            </li>

                            <li>
                              <div className="inner-content">
                                <Shower />
                                <span className="villa_icon_label">
                                  {villa.villa_showers}
                                </span>
                              </div>
                            </li>

                            <li>
                              <div className="inner-content">
                                <Bed />
                                <span className="villa_icon_label">
                                  {villa.numrooms}
                                </span>
                              </div>
                            </li>

                            <li>
                              <div className="inner-content">
                                <TwoPeople />
                                <span className="villa_icon_label">
                                  {villa.max_occupancy}
                                </span>
                              </div>
                            </li>

                            {villa.villaPoolTypes[0] && (
                              <li>
                                <div className="inner-content">
                                  <SwimmingPool />
                                  <span className="villa_icon_label">
                                    {villa.villaPoolTypes[0].poolType}
                                  </span>
                                </div>
                              </li>
                            )}
                          </ul>

                          <div className="villa_price-logo-wrapper">
                            <div className="villa_price">
                              <span className="price-from">From</span>{" "}
                              <span className="font-bold">
                                {villa.price_new}
                              </span>
                              <span className="price-category">per night</span>
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
                    );
                  })}
                </ul>
                {key === 2 && banners[0]?.sectionHeroImage?.asset && (
                  <div className="villa_banners villa_nuatilus_banner">
                    <Overlay className="banner-overlay" />
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
                      <Overlay className="overlay" />
                      <div className="inner">
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
                            <h4 className="featuredVillaName">
                              {col.featuredvillas[0].villaone.name}
                            </h4>
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
                      <Overlay className="overlay" />
                      <div className="inner">
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
                          <h2>{col.featuredvillas[0].title}</h2>
                          <h3 className="tagline">
                            {col.featuredvillas[0].villaone.tagline}
                          </h3>
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
                    <Overlay className="banner-overlay" />
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
