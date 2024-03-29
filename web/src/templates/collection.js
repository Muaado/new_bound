import { graphql, navigate, Link } from "gatsby";
import React, { useEffect, useMemo, useRef } from "react";
import Layout from "../containers/layout";
import { CollectionStyles } from "../styles/CollectionStyles";
import Image from "gatsby-plugin-sanity-image";
import { ContactUs } from "../components/Homepage/ContactUs";
import { Overlay, Carousel, Button } from "../components";
import Measure from "../assets/icons/villaSpecifications/measure.svg";
import TwoPeople from "../assets/icons/villaSpecifications/two-people.svg";
import Bed from "../assets/icons/villaSpecifications/bed.svg";
import Shower from "../assets/icons/villaSpecifications/shower.svg";
import SwimmingPool from "../assets/icons/villaSpecifications/swimming-pool.svg";
import {
  truncate,
  computeVillaFields,
  priceFormatter,
  getCollectionUrl,
} from "../lib/helpers";
import {
  useIsMobileLarge,
  usePageSectionsRef,
  useNavBar,
  useScrollToRef,
} from "../hooks";
import { PriceTemplate } from "../components";
import {
  LARGE_COLLECTION,
  WATER_VILLA_COLLECTION,
  BEACH_VILLA_COLLECTION,
  RESORT_COLLECTION,
  COUPLES_COLLECTION,
} from "../constants";

export const query = graphql`
  fragment Fragment_Villa on SanityVilla {
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

  fragment Fragment_Featured_Villa on SanityFeaturedVilla {
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
  query CollectionTemplateQuery($id: String!) {
    pagesdata: sanityCollectionPage(id: { eq: $id }) {
      _id
      CollectionPageName
      slug {
        current
      }
      image {
        ...SanityImage
      }
      beachVillaCollection {
        CollectionName
        sectionHeroImage {
          ...SanityImage
        }
        villas {
          ...Fragment_Villa
        }
        featuredvillas {
          ...Fragment_Featured_Villa
        }
      }
      waterVillaCollection {
        CollectionName
        sectionHeroImage {
          ...SanityImage
        }
        villas {
          ...Fragment_Villa
        }

        featuredvillas {
          ...Fragment_Featured_Villa
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
const pageSections = [
  {
    name: WATER_VILLA_COLLECTION,
    onClick: () => navigate("../top-water-villas/"),
    isDropDown: false,
  },
  {
    name: BEACH_VILLA_COLLECTION,
    onClick: () => navigate("../beach-villas/"),
    isDropDown: false,
  },
  {
    name: LARGE_COLLECTION,
    onClick: () => navigate("../large-villas/"),
    isDropDown: false,
  },
  {
    name: RESORT_COLLECTION,
    onClick: () => navigate("../resort-collection/"),
    isDropDown: false,
  },
  {
    name: COUPLES_COLLECTION,
    onClick: () => navigate("../couples-collection"),
    isDropDown: false,
  },
];

const CollectionTemplate = (props) => {
  const { data } = props;
  const collections = data && data.pagesdata;
  const villas = collections?.beachVillaCollection?.length
    ? collections.beachVillaCollection
    : collections?.waterVillaCollection?.length
    ? collections?.waterVillaCollection
    : [];

  const firstcollectionName_ = villas[0]?.CollectionName;

  const banners = collections?.banner;
  const slug = collections?.slug;
  const pathName = getCollectionUrl({ slug: slug });
  const site = data && data.site;

  const isMobile = useIsMobileLarge();
  const { setNavLinks } = useNavBar();
  const resortSectionRefs = useRef([]);
  const heroRef = useRef(null);

  const { executeScroll } = useScrollToRef(true, 80);

  const collections__ = useMemo(() => {
    const collections_ = villas?.map(({ CollectionName }) => {
      return {
        name: CollectionName,
        onClick: (innerRef) => {
          if (innerRef) executeScroll(innerRef);
        },
      };
    });
    return collections_;
  }, [resortSectionRefs?.current?.length]);

  const pageSections_ = useMemo(() => {
    return pageSections.map((section) => {
      if (section?.name == collections?.CollectionPageName) {
        return {
          ...section,
          isDropDown: true,
          content: collections__,
        };
      }
      return section;
    });
  }, [collections__.length]);

  const { navLinks, contentRefs } = usePageSectionsRef(pageSections_);

  useEffect(() => {
    setNavLinks(navLinks);
  }, [contentRefs?.current[firstcollectionName_]]);

  return (
    <Layout>
      <CollectionStyles>
        <h1 className="collectionpage_title">
          {collections.CollectionPageName}
        </h1>
        {collections.image && (
          <div className="collection__image_hero" ref={heroRef}>
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
          {villas?.map(
            (
              { villas, CollectionName, featuredvillas, _id },
              collectionNumber
            ) => {
              return (
                <div
                  key={CollectionName}
                  id={CollectionName}
                  className="mastercol"
                  ref={contentRefs?.current[CollectionName]}
                >
                  <h3 className="col_name">{CollectionName}</h3>
                  {isMobile ? (
                    villas?.length && (
                      <Carousel
                        slideToShow={1}
                        totalItems={villas.length}
                        cellSpacing={10}
                        renderBottomCenterControls={false}
                      >
                        {villas?.map((villa, index) => {
                          const { villaPrice, villaUrl } = computeVillaFields({
                            villa,
                          });

                          return (
                            <>
                              <li
                                key={`${villa._id} + ${index}`}
                                className="collection__image"
                              >
                                {villa.imageThumb && villa.imageThumb.asset && (
                                  <Image
                                    {...villa.imageThumb}
                                    alt={villa.imageThumb.alt}
                                    width={400}
                                    height={400}
                                  />
                                )}
                              </li>
                              <div className="room-detail">
                                <h3 className="roomname">
                                  {truncate(villa.name, 40)}
                                </h3>
                                <VillaIcons villa={villa} />
                                <PriceTemplate
                                  price={villaPrice}
                                  styles={{ marginTop: "2rem" }}
                                />
                                <Button
                                  onClick={() => {
                                    navigate(villaUrl, {
                                      state: {
                                        pageFrom: "collection",
                                        collectionPage: {
                                          url: pathName,
                                          collectionName:
                                            collections.CollectionPageName,
                                        },
                                      },
                                    });
                                  }}
                                >
                                  View Room
                                </Button>
                              </div>
                            </>
                          );
                        })}
                      </Carousel>
                    )
                  ) : (
                    <ul className="collection_wrap">
                      {villas?.length &&
                        villas?.map((villa, index) => {
                          const { villaPrice, villaUrl } = computeVillaFields({
                            villa,
                          });
                          return (
                            <li
                              key={`${villa._id} ${index}`}
                              className="collection_wrap_item"
                              onClick={() => {
                                navigate(villaUrl, {
                                  state: {
                                    pageFrom: "collection",
                                    collectionPage: {
                                      url: pathName,
                                      collectionName:
                                        collections.CollectionPageName,
                                    },
                                  },
                                });
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
                                <VillaIcons villa={villa} />
                                <div className="villa_price-logo-wrapper">
                                  <div className="villa_price">
                                    <span className="price-from">From</span>{" "}
                                    <span className="font-bold">
                                      {villaPrice}
                                    </span>
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
                                            alt={
                                              villa.resort.resortBrandLogo.alt
                                            }
                                          />
                                        )}
                                    </div>
                                  )}
                                </div>

                                <Button
                                  styles={{ marginBottom: "2rem" }}
                                  onClick={() => {
                                    navigate(villaUrl, {
                                      state: {
                                        pageFrom: "collection",
                                        collectionPage: {
                                          url: pathName,
                                          collectionName:
                                            collections.CollectionPageName,
                                        },
                                      },
                                    });
                                  }}
                                >
                                  View Room
                                </Button>
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  )}
                  {featuredvillas?.length ? (
                    <FeaturedVillas featuredVillas={featuredvillas} />
                  ) : null}
                  {collectionNumber === 1 || collectionNumber === 2 ? (
                    <CollectionBanners
                      collectionNumber={collectionNumber}
                      banners={banners}
                    />
                  ) : null}
                </div>
              );
            }
          )}
        </div>
        <ContactUs contactUs={site.contactUs} />
      </CollectionStyles>
    </Layout>
  );
};

export default CollectionTemplate;

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
              {`${priceFormatter.format(featuredVilla.villaone.price)}`}
            </h4>
            <Link
              to="/four-seasons-resort-maldives-at-landaa-giraavaru/beach-villa-with-pool"
              state={{ pageFrom: "test" }}
            >
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

const VillaIcons = ({ villa }) => {
  const { villaShowers, villMaxOccupancy } = computeVillaFields({ villa });
  return (
    <ul className="villa_icons">
      <li>
        <div className="inner-content">
          <Measure className="villa_icon measureicon" />
          <span className="villa_icon_label">{villa.sizeSqm} sqm</span>
        </div>
      </li>

      <li>
        <div className="inner-content">
          <Shower />
          <span className="villa_icon_label">{villaShowers}</span>
        </div>
      </li>

      <li>
        <div className="inner-content">
          <Bed />
          <span className="villa_icon_label">{villa.numrooms}</span>
        </div>
      </li>

      <li>
        <div className="inner-content">
          <TwoPeople />
          <span className="villa_icon_label">{villMaxOccupancy}</span>
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
  );
};
