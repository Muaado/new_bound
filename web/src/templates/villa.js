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
import Highlights from "../components/Resort/Highlights";
import Restaurants from "../components/Villa/Restaurants";
import { Button } from "../components/Button";
import { PricingDropDown, Overlay } from "../components";
import { ROOM_PAGE } from "../constants";
import { useScrollToRef } from "../hooks";
import { computeVillaFields } from "../lib/helpers";

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
          _key
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
  const { data } = props;
  const villa = data && data.villa;
  const roomSlideIndex = props?.location?.state?.currentSlideIndex;
  const rateModel = data && data.rateModel;
  const spas = data && data.spas;
  const restaurants = data && data.restaurants;

  const { elementRef, executeScroll } = useScrollToRef();
  if (pageFrom) {
    executeScroll(elementRef);
  }
  const pageFrom = props?.location?.state?.pageFrom;
  useEffect(() => {
    if (pageFrom) {
      executeScroll(elementRef);
    }
  }, [pageFrom]);

  const [activeFeature, setActiveFeature] = useState(-1);

  const {
    name,
    _rawDescription: _rawDescriptionVilla,
    short_desc,
    roomFeatures,
    heroImage,
    headerImages,
  } = villa;

  const {
    name: resortName,
    locationAtoll,
    numberOfBars,
    numberOfRestaurants,
    numberOfRooms,
    resortTransferType,
    timeToAirport,
    _rawDescription,
    activities,
    highlights,
  } = villa.resort;

  const randomHeaderImage =
    headerImages?.images[
      Math.floor(Math.random() * headerImages?.images.length)
    ];

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
              ) : null}
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

          <VillaHeader
            villa={villa}
            rateModel={rateModel}
            elementRef={elementRef}
          />

          <div className="villa__room-features" id="room-features">
            <div className="content">
              <div className="roomfeatwrap">
                {roomFeatures?.backgroundImage &&
                roomFeatures?.backgroundImage.asset ? (
                  <Image
                    {...roomFeatures.backgroundImage}
                    width={950}
                    height={700}
                    alt={roomFeatures.backgroundImage.alt}
                  />
                ) : (
                  <div></div>
                )}
              </div>

              <ul className="accordion">
                <h2 className="roomfeaturetitle">Room features</h2>
                {roomFeatures?.features?.map(
                  ({ _key, title, _rawDescription }, index) => (
                    <li key={_key} className="accordion-item">
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
              title="Island Overview"
            />
          </div>

          <Highlights highlights={highlights} />

          {restaurants?.nodes && (
            <Restaurants restaurants={restaurants.nodes} />
          )}

          {spas.nodes && (
            <div className="villa__spa-overview">
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

export const VillaHeader = ({ villa, elementRef, rateModel }) => {
  const {
    _id: villaId,
    tagline,
    _rawDescription: _rawDescriptionVilla,
    sizeSqm,
    villaPoolTypes,
    headerImages,
    numrooms,
  } = villa;

  const { villaShowers, villMaxOccupancy } = computeVillaFields({ villa });
  return (
    <div id="room-overview" className="villa__header" ref={elementRef}>
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
          <h2 className="villa_name_title">{villa.name}</h2>
          {tagline && <p className="tagline">{tagline}</p>}
          <PortableText blocks={_rawDescriptionVilla} />
          <ul className="villa__header-icons">
            <li>
              <Measure />
              {sizeSqm}m2
            </li>
            <li>
              <TwoPeople />
              {villMaxOccupancy}
            </li>
            <li>
              <Bed />
              {numrooms}
            </li>
            <li>
              <Shower />
              {villaShowers}
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
            <Button style={{ paddingLeft: "100px", paddingRight: "100px" }}>
              ENQUIRE
            </Button>
          </Link>
        </div>
        <div className="gallery-carousel">
          <PopUpGallery images={headerImages} styles={{ height: "100%" }} />
        </div>
      </div>
    </div>
  );
};
