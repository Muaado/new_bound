import { graphql, Link } from "gatsby";
import React, { useEffect, useState, useRef } from "react";
import useWindowSize from "../lib/useWindowSize";
import { getVillaUrl } from "../lib/helpers";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import Image from "gatsby-plugin-sanity-image";
import PortableText from "../components/Ui/portableText";
import Gallery from "../components/Gallery";
import VillaStyles from "../styles/VillaTemplateStyles";
import Amenities from "../components/Resort/Amenities";
import Activities from "../components/Resort/Activities";
import Spa from "../components/Resort/Spa";
import LeftSidebar from "../components/LeftSidebar";
import PopUpGallery from "../components/PopUpGallery";

import Measure from "../assets/icons/villaSpecifications/measure.svg";
import TwoPeople from "../assets/icons/villaSpecifications/two-people.svg";
import Bed from "../assets/icons/villaSpecifications/bed.svg";
import Shower from "../assets/icons/villaSpecifications/shower.svg";
import SwimmingPool from "../assets/icons/villaSpecifications/swimming-pool.svg";
import { MouseScroll } from "../components/Ui/MouseScroll";
import Highlights from "../components/Resort/Highlights";
import Restaurants from "../components/Villa/Restaurants";
import { Button } from "../components/Button";
import { PricingDropDown, Overlay } from "../components";
import { ROOM_PAGE, ACCOMODATIONS_SECTION } from "../constants";
import { useScrollToRef } from "../hooks";

export const query = graphql`
  fragment SanityPricingRateModel on SanityRateModel {
    January
    February
    March
    April
    May
    June
    July
    August
    September
    October
    November
    December
  }
  query VillaTemplateQuery(
    $id: String!
    $resortId: String!
    $rateModelId: String
  ) {
    villa: sanityVilla(_id: { eq: $id }) {
      _id
      name
      alternateName
      tagline
      uniqueCode
      price
      numrooms
      headerImages {
        images {
          ...SanityImage
          alt
        }
      }
      short_desc

      _rawDescription
      # imageWeb {
      #   ...SanityImage
      #   alt
      # }

      heroImage {
        ...SanityImage
        alt
      }

      roomFeatures {
        backgroundImage {
          ...SanityImage
          alt
        }
        features {
          _rawDescription
          title
        }
      }
      sizeSqm
      showers {
        option
        number
      }

      villaPoolTypes {
        poolType
      }

      maxOccupancy {
        option
        number
      }

      resort {
        id
        name
        locationAtoll
        locationFull
        numberOfBars
        numberOfRestaurants
        numberOfRooms
        roomVoltage
        timeToAirport
        _rawDescription
        resortTransferType {
          transferType
        }

        gallery {
          images {
            ...SanityImage
            alt
          }
          name
          type {
            name
          }
        }

        highlights {
          name
          description
          imageThumb {
            ...SanityImage
            alt
          }
        }

        activities {
          # sanityResortHighlightname

          name
          imageThumb {
            ...SanityImage
            alt
          }
        }

        reviews {
          name
          description
        }
      }
    }

    # restaurants {
    #
    #     }

    spas: allSanitySpa(filter: { resort: { _id: { eq: $resortId } } }) {
      nodes {
        id
        description
        name
        imageWeb {
          ...SanityImage
          alt
        }
        imageThumb {
          ...SanityImage
          alt
        }
      }
    }

    # activities: allSanityActivity(
    #   filter: { resort: { _id: { eq: $resortId } } }
    # ) {
    #   nodes {
    #     name
    #     resort {
    #       name
    #     }
    #     imageThumb {
    #       ...SanityImage
    #       alt
    #     }
    #   }
    # }
    resorts: allSanityResort {
      nodes {
        name
        image {
          ...SanityImage
          alt
        }
      }
    }
    restaurants: allSanityRestaurant(
      filter: { resort: { _id: { eq: $resortId } } }
    ) {
      nodes {
        name
        alternateName
        description
        imageThumb {
          ...SanityImage
          alt
        }

        resort {
          name
        }
      }
    }
    rateModel: sanityRateModel(_id: { eq: $rateModelId }) {
      ...SanityPricingRateModel
    }
  }
`;

const VilaTemplate = (props) => {
  const { data, errors } = props;
  const villa = data && data.villa;
  const pageFrom = props?.location?.state?.pageFrom;
  const roomSlideIndex = props?.location?.state?.currentSlideIndex;
  const rateModel = data && data.rateModel;
  const spas = data && data.spas;
  const restaurants = data && data.restaurants;
  const size = useWindowSize();
  const { elementRef, executeScroll } = useScrollToRef();
  useEffect(() => {
    const { width } = size;
  }, [size]);

  const [activeFeature, setActiveFeature] = useState(-1);

  useEffect(() => {
    executeScroll(elementRef);
  }, []);

  const {
    _id: villaId,
    name,
    tagline,
    _rawDescription: _rawDescriptionVilla,
    short_desc,
    // imageWebW
    roomFeatures,
    maxOccupancy,
    sizeSqm,
    showers,
    villaPoolTypes,
    heroImage,
    headerImages,
    numrooms,
  } = villa;

  const {
    id,
    name: resortName,
    locationAtoll,
    numberOfBars,
    numberOfRestaurants,
    numberOfRooms,
    resortTransferType,
    timeToAirport,
    _rawDescription,
    reviews,
    activities,

    gallery: galleries,
    highlights,
  } = villa.resort;

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const randomHeaderImage =
    headerImages?.images[
      Math.floor(Math.random() * headerImages?.images.length)
    ];

  let numberOfShowers = 0;

  showers.forEach(({ number }) => (numberOfShowers += number));

  let new_price = "";
  if (villa.price != "null") {
    villa["price_new"] = formatter.format(villa.price) + "  PP";
  } else if (villa.price) {
    villa["price_new"] = "-";
  }

  const handleActiveFeature = (index) => {
    if (activeFeature !== index) {
      setActiveFeature(index);
    } else {
      setActiveFeature(-1);
    }
  };

  return (
    <Layout>
      {villa && (
        <SEO
          title={name || "Untitled"}
          description={short_desc}
          image={heroImage}
        />
      )}

      <Container>
        <LeftSidebar
          list={["overview", "room-features", "gallery", "highlights", "dine"]}
        />
        <VillaStyles>
          <div className="villa__image">
            <div className="image-container">
              {heroImage && heroImage.asset ? (
                <Image
                  {...heroImage}
                  width={950}
                  height={400}
                  alt={heroImage.alt}
                />
              ) : randomHeaderImage && randomHeaderImage.asset ? (
                <Image
                  {...randomHeaderImage}
                  width={950}
                  height={400}
                  alt={randomHeaderImage.alt}
                />
              ) : (
                <div></div>
              )}
            </div>
            <h1 className="villa__image-title" id="header-text">
              <Link to={`/${resortName.toLowerCase().split(" ").join("-")}`}>
                {resortName}{" "}
              </Link>
            </h1>
          </div>
          <div className="breadcrumb-wrapper">
            <Overlay bgColor="white" opacity={1} />
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link className="backtoresort" to={`/`}>
                    Home
                  </Link>
                </li>
                <li>&gt;</li>
                <li>
                  <Link
                    className="backtoresort"
                    to={`/${resortName.toLowerCase().split(" ").join("-")}`}
                    state={{
                      redirectedFrom: ROOM_PAGE,
                      currentSlideIndex: roomSlideIndex,
                    }}
                  >
                    {resortName}
                  </Link>
                </li>
                <li>&gt;</li>
                <li className="backtoresort room-name">{name}</li>
              </ul>
            </div>
          </div>
          <div className="villa__header" ref={elementRef}>
            <Overlay opacity={1} bgColor="white" />
            <div
              className="content"
              id="overview-content"
              data-aos="fade-in"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            >
              <div className="container">
                {villa.uniqueCode && (
                  <div className="unique_code_wrap">
                    <strong>#</strong>
                    {villa.uniqueCode}
                  </div>
                )}
                <h2 className="villa_name_title">{name}</h2>
                {tagline && <p className="tagline">{tagline}</p>}
                <PortableText blocks={_rawDescriptionVilla} />
                <ul className="villa__header-icons">
                  <li>
                    <Measure />
                    {sizeSqm}m2
                  </li>
                  <li>
                    <TwoPeople />
                    {maxOccupancy.map(
                      ({ number }, index) =>
                        `${number}${
                          index + 1 !== maxOccupancy.length ? "," : ""
                        } `
                    )}
                  </li>
                  <li>
                    <Bed />
                    {numrooms}
                  </li>
                  <li>
                    <Shower />
                    {numberOfShowers}
                  </li>
                  {villaPoolTypes[0] && (
                    <li>
                      <SwimmingPool />
                      {villaPoolTypes[0].poolType}
                    </li>
                  )}
                </ul>
                {rateModel ? (
                  <PricingDropDown
                    items={rateModel}
                    headerImages={headerImages}
                    roomName={villa.name}
                  />
                ) : (
                  <div className="room-price"> Price On Request</div>
                )}
                <Link
                  to={`/enquire?id=${villaId}`}
                  state={{
                    pageFromUrl: getVillaUrl({
                      name: villa?.name,
                      resortName: villa?.resort.name,
                    }),
                  }}
                  className="enquire-btn"
                >
                  <Button
                    style={{ paddingLeft: "100px", paddingRight: "100px" }}
                  >
                    ENQUIRE
                  </Button>
                </Link>
              </div>
              <div className="gallery-carousel">
                <PopUpGallery
                  images={headerImages}
                  styles={{ height: "100%" }}
                />
              </div>
            </div>
          </div>

          <div className="villa__room-features" id="room-features">
            <div className="content">
              <div className="roomfeatwrap">
                {roomFeatures?.backgroundImage &&
                roomFeatures?.backgroundImage.asset ? (
                  <Image
                    {...roomFeatures.backgroundImage}
                    alt={roomFeatures.backgroundImage.alt}
                  />
                ) : (
                  <div></div>
                )}
              </div>

              <ul className="accordion">
                <h2 className="roomfeaturetitle">Room features</h2>
                {roomFeatures?.features?.map(
                  ({ title, _rawDescription }, index) => (
                    <li key={title} className="accordion-item">
                      <input
                        id={index}
                        className="hide"
                        type="checkbox"
                        checked={activeFeature === index}
                      />
                      <label
                        htmlFor={index}
                        className="accordion-label"
                        onClick={() => handleActiveFeature(index)}
                      >
                        {title}
                      </label>

                      <ul className="accordion-child">
                        <PortableText blocks={_rawDescription} />
                      </ul>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="villa__property-overview">
            <Amenities
              locationAtoll={locationAtoll}
              numberOfBars={numberOfBars}
              numberOfRestaurants={numberOfRestaurants}
              numberOfRooms={numberOfRooms}
              resortTransferType={resortTransferType}
              timeToAirport={timeToAirport}
              _rawDescription={_rawDescription}
              title="ISland Overview"
            />
          </div>

          <Highlights highlights={highlights} />

          {restaurants?.nodes && (
            <Restaurants restaurants={restaurants.nodes} />
          )}

          {/* <Resorts resorts={resorts.nodes} /> */}
          {/* <Reviews reviews={reviews} /> */}
          {spas.nodes && (
            <div
              className="villa__spa-overview"
              // heightMode="max"
              // renderCenterRightControls={({ nextSlide }) => (
              //   <CarouselButton onClick={nextSlide} chevronRight={true} />
              // )}
              // renderCenterLeftControls={({ previousSlide }) => (
              //   <CarouselButton onClick={previousSlide} />
              // )}
            >
              {/* get first spa from spas and use Spa component to print spa information */}
              {spas.nodes.map((spa) => (
                <Spa spa={spa} key={spa.name} />
              ))}
            </div>
          )}

          {activities && (
            <Activities
              activities={activities}
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            />
          )}
        </VillaStyles>
      </Container>
    </Layout>
  );
};

export default VilaTemplate;
