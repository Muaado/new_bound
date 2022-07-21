import { graphql, Link, navigate } from "gatsby";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { getVillaUrl } from "../lib/helpers";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import Image from "gatsby-plugin-sanity-image";
import PortableText from "../components/Ui/portableText";
import VillaStyles from "../styles/VillaTemplateStyles";
import Amenities from "../components/Resort/Amenities";
import Activities from "../components/Resort/Activities";
import Spa from "../components/Resort/Spa";
import LeftSidebar from "../components/LeftSidebar";
import PopUpGallery from "../components/PopUpGallery";
import { VillaIcons } from "../components/Villa/VillaIcons";
import Highlights from "../components/Resort/Highlights";
import Restaurants from "../components/Villa/Restaurants";
import { Button } from "../components/Button";
import { PricingDropDown, Overlay } from "../components";
import { ROOM_PAGE, ACCOMODATION, NAVBAR_WITH_BOTTOM_LINK } from "../constants";
import {
  useScrollToRef,
  useIsMobile,
  useNavBar,
  usePageSectionsRef,
} from "../hooks";

export const query = graphql`
  fragment SanityMonthFields on SanityMonth {
    price
    note
  }
  query VillaTemplateQuery(
    $id: String!
    $resortId: String!
    $rateModelId: String
  ) {
    villa: sanityVilla(_id: { eq: $id }) {
      _id
      priceOnRequest
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
        villa1 {
          name
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
      generalNote
      january {
        ...SanityMonthFields
      }
      february {
        ...SanityMonthFields
      }
      march {
        ...SanityMonthFields
      }
      april {
        ...SanityMonthFields
      }
      may {
        ...SanityMonthFields
      }
      june {
        ...SanityMonthFields
      }
      july {
        ...SanityMonthFields
      }
      august {
        ...SanityMonthFields
      }
      september {
        ...SanityMonthFields
      }
      october {
        ...SanityMonthFields
      }
      november {
        ...SanityMonthFields
      }
      december {
        ...SanityMonthFields
      }
    }
  }
`;

const pageSections = [
  { name: ACCOMODATION, isDropDown: true },
  { name: "Overview", isDropDown: false },
  { name: "Features", isDropDown: false },
  { name: "Island", isDropDown: false },
  { name: "Highlights", isDropDown: false },
  { name: "Dine", isDropDown: false },
  { name: "Spa", isDropDown: false },
  { name: "Activities", isDropDown: false },
];

const VilaTemplate = (props) => {
  const { data } = props;
  const villa = data && data.villa;
  const roomSlideIndex = props?.location?.state?.currentSlideIndex;
  const rateModel = data && data.rateModel;
  const spas = data && data.spas;
  const restaurants = data && data.restaurants;
  const pageFrom = props?.location?.state?.pageFrom;
  const collectionPage = props?.location?.state?.collectionPage;
  const { executeScroll } = useScrollToRef();
  const { setPageName, setNavLinks, setHeroRef, resetValues } = useNavBar();
  const heroRef = useRef();

  // preparing this data to pass into navbar content for the accomodation section
  const resortVillas = useMemo(() => {
    const resortVillas_ = villa.resort?.villa1.filter(
      ({ name }) => name !== villa.name
    );
    return (
      resortVillas_.length &&
      resortVillas_?.slice(0, 6).map(({ name }, index) => {
        return {
          className: index === 0 ? "page-title" : "",
          content: name,
          onClick: () => {
            const villaUrl = getVillaUrl({
              name,
              resortName: villa?.resort?.name,
            });
            navigate(villaUrl);
          },
        };
      })
    );
  }, [villa.resort.name]);

  const pageSections_ = useMemo(() => {
    return pageSections.map((section) => {
      if (section.name === ACCOMODATION) {
        return {
          ...section,
          content: resortVillas,
        };
      }
      return section;
    });
  }, []);

  const {
    featuresRef,
    islandRef,
    overviewRef,
    highlightsRef,
    spaRef,
    activitiesRef,
    dineRef,
    navLinks,
  } = usePageSectionsRef(pageSections_);

  useEffect(() => {
    if (pageFrom) {
      executeScroll(overviewRef);
    }
  }, [pageFrom, overviewRef]);

  useEffect(() => {
    setPageName(NAVBAR_WITH_BOTTOM_LINK);
    setNavLinks(navLinks);
    setHeroRef(heroRef);
    return () => {
      resetValues();
    };
  }, [featuresRef?.current]);

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
          <div className="villa__image" ref={heroRef}>
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
                    to={
                      collectionPage
                        ? collectionPage?.url
                        : `/${resortName.toLowerCase().split(" ").join("-")}`
                    }
                    state={
                      collectionPage
                        ? {}
                        : {
                            redirectedFrom: ROOM_PAGE,
                            currentSlideIndex: roomSlideIndex,
                          }
                    }
                  >
                    {collectionPage?.collectionName || resortName}
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
            elementRef={overviewRef}
          />

          <div
            className="villa__room-features"
            id="room-features"
            ref={featuresRef}
          >
            <Overlay zIndex={1} opacity={0.7} />
            {roomFeatures?.backgroundImage &&
            roomFeatures?.backgroundImage.asset ? (
              <Image
                {...roomFeatures.backgroundImage}
                width={950}
                height={700}
                alt={roomFeatures.backgroundImage.alt}
              />
            ) : null}
            <div className="content">
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
          <div className="villa__property-overview" ref={islandRef}>
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

          <Highlights innerRef={highlightsRef} highlights={highlights} />

          {restaurants?.nodes && (
            <Restaurants innerRef={dineRef} restaurants={restaurants.nodes} />
          )}

          {spas.nodes && (
            <div className="villa__spa-overview">
              {spas.nodes.map((spa) => (
                <Spa innerRef={spaRef} spa={spa} key={spa.name} />
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
              innerRef={activitiesRef}
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
    headerImages,
  } = villa;
  const isMobile = useIsMobile();

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
          <VillaIcons villa={villa} className="villa__header-icons" />
          {villa?.priceOnRequest ? (
            <div className="room-price">Price On Request</div>
          ) : (
            <PricingDropDown
              rateModel={rateModel}
              headerImages={headerImages}
              roomName={villa.name}
              villaId={villaId}
            />
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
        {!isMobile ? (
          <div className="gallery-carousel">
            <PopUpGallery images={headerImages} styles={{ height: "100%" }} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
