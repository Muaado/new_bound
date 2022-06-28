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
      _id
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
          _id
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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const computeVillaFields = ({ villa }) => {
  const villaShowers = villa.showers;
  const maxOccupancy = villa.maxOccupancy;
  // console.log(villa);

  let villMaxOccupancy = "-";
  let villaShowers_ = "-";
  let villaPrice = "-";
  // for every 3rd villa, add villa_odd class as True

  if (maxOccupancy.length == 2) {
    villMaxOccupancy = maxOccupancy[0].number + " , " + maxOccupancy[1].number;
  } else if (maxOccupancy.length == 1) {
    villMaxOccupancy = maxOccupancy[0].number;
  }

  if (villaShowers.length == 2) {
    villaShowers_ = villaShowers[0].number + villaShowers[1].number;
  } else if (villaShowers.length == 1) {
    villaShowers_ = villaShowers[0].number;
  }

  if (villa.price) {
    villaPrice = formatter.format(villa.price);
  }

  const villaUrl = `/${villa.resort.name
    .toLowerCase()
    .split(" ")
    .join("-")}/${villa.name.toLowerCase().split(" ").join("-")}`;

  return {
    villaShowers: villaShowers_,
    villaPrice,
    villaUrl,
    villMaxOccupancy,
  };
};

const BeachTemplate = (props) => {
  const { data } = props;
  const collections = data && data.pagesdata;
  const site = data && data.site;

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
              <Image
                {...collections.image}
                alt={collections.image.alt}
                width={950}
                height={400}
              />
            )}
          </div>
        )}

        <div className="collection_container">
          {collections.beachVillaCollection?.map(
            (
              { villas, CollectionName, featuredvillas, _id },
              collectionNumber
            ) => {
              return (
                <div key={_id} className="mastercol">
                  <h3 className="col_name">{CollectionName}</h3>
                  <ul className="collection_wrap">
                    {villas?.map((villa) => {
                      const {
                        villMaxOccupancy,
                        villaPrice,
                        villaShowers,
                        villaUrl,
                      } = computeVillaFields({ villa });
                      return (
                        <li
                          key={villa._id}
                          className="collection_wrap_item"
                          onClick={() => {
                            navigate(villaUrl);
                          }}
                        >
                          <div className="collection__image">
                            {villa.imageThumb && villa.imageThumb.asset && (
                              <Image
                                {...villa.imageThumb}
                                alt={villa.imageThumb.alt}
                                width={400}
                                height={400}
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
                                    {villaShowers}
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
                                    {villMaxOccupancy}
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
                                <span className="font-bold">{villaPrice}</span>
                                <span className="price-category">
                                  per night
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
                      );
                    })}
                  </ul>
                  {featuredvillas?.length ? (
                    <FeaturedVillas featuredVillas={featuredvillas} />
                  ) : null}
                  {collectionNumber === 1 || collectionNumber === 2 ? (
                    <CollectionBanners
                      collectionNumber={collectionNumber}
                      banners={collections.banner}
                    />
                  ) : null}
                </div>
              );
            }
          )}
        </div>
        <ContactUs contactUs={site.contactUs} />
      </BeachVillaStyles>
    </Layout>
  );
};

export default BeachTemplate;

const FeaturedVillas = React.memo(({ featuredVillas }) => {
  if (!featuredVillas?.length) return null;
  const featuredVilla = featuredVillas?.[0];
  return (
    <div className="featured_villa_section">
      <div className="photofeatured">
        <Overlay className="overlay" />
        <div className="inner">
          <Image
            className="featuredreslogo"
            {...featuredVilla.villaone.resort.resortBrandLogo}
            alt={featuredVilla.villaone.resort.resortBrandLogo.alt}
          />
          <Image
            className="featured_villa_image"
            {...featuredVilla.villaone.imageThumb}
          />

          <div className="featuredVillaFooter">
            <Link to={featuredVilla.villaone.url}>
              <h4 className="featuredVillaName">
                {featuredVilla.villaone.name}
              </h4>
            </Link>
            <h4 className="featuredVillaPrice">
              {`${formatter.format(featuredVilla.villaone.price)}`}
            </h4>
            <Link to={featuredVilla.villaone.url}>
              <h4 className="featuredVillaView">View Room</h4>
            </Link>
          </div>
        </div>
      </div>
      <div className="rightfeatured">
        <Overlay className="overlay" />
        <div className="inner">
          {featuredVilla.villaone.headerImages.images[1] && (
            <Image
              {...featuredVilla.villaone.headerImages.images[1]}
              alt={featuredVilla.villaone.headerImages.images[1].alt}
            />
          )}
          <div className="txtwrap">
            <h2>{featuredVilla.title}</h2>
            <h3 className="tagline">{featuredVilla.villaone.tagline}</h3>
            <p className="description">{featuredVilla.villaone.short_desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

const CollectionBanners = ({ collectionNumber, banners }) => {
  if (!banners?.length) return null;

  const renderCollectionBanners = () => {
    switch (collectionNumber) {
      case 1:
        return (
          banners[1]?.sectionHeroImage?.asset && (
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
          )
        );
      case 2:
        return (
          banners[0]?.sectionHeroImage?.asset && (
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
          )
        );
      default:
        return null;
    }
  };
  return renderCollectionBanners();
};
