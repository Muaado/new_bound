import { graphql, navigate } from "gatsby";
import React, { useMemo, useRef } from "react";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import ResortStyles from "../styles/ResortTempleteStyles";
import Amenities from "../components/Resort/Amenities";
import Activities from "../components/Resort/Activities";
import Spa from "../components/Resort/Spa";
import Accomodation from "../components/Resort/Accomodation";
import LeftSidebar from "../components/LeftSidebar";
import { toPlainText, getVillaUrl } from "../lib/helpers";
import Highlights from "../components/Resort/Highlights";
import Restaurants from "../components/Villa/Restaurants";
import { Overlay } from "../components";
import {
  LIGHT_COLOR,
  NAVBAR_WITH_BOTTOM_LINK,
  ACCOMODATION,
} from "../constants";
import { useScrollToRef, useNavBar, usePageSectionsRef } from "../hooks";
import { AccommodationHighlightsWrapper } from "./elements";
import Image from "gatsby-plugin-sanity-image";

export const query = graphql`
  query ResortTemplateQuery($id: String!) {
    resort: sanityResort(_id: { eq: $id }) {
      _rawDescription(resolveReferences: { maxDepth: 10 })
      name
      locationAtoll
      locationFull
      numberOfBars
      numberOfRestaurants
      numberOfRooms
      roomVoltage
      timeToAirport
      image {
        ...SanityImage
        alt
      }
      resortTransferType {
        transferType
      }

      # villas {

      # }

      restaurants {
        name
        alternateName
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

      reviews {
        name
        description
      }

      secondImage {
        ...SanityImage
        alt
      }

      highlights {
        name
        description
        imageThumb {
          ...SanityImage
          alt
        }
      }

      faq {
        name
        description
        faqQuestionsAnswers {
          # _id
          answer
          question
        }
      }
    }
    villas: allSanityVilla(filter: { resort: { _id: { eq: $id } } }) {
      nodes {
        name
        price
        priceOnRequest
        imageThumb {
          ...SanityImage
          alt
        }
        resort {
          name
        }
      }
    }

    featuredSpa: sanitySpa(
      resort: { _id: { eq: $id } }
      spaFeatured: { eq: true }
    ) {
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

    spas: allSanitySpa(filter: { resort: { _id: { eq: $id } } }) {
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
    # activities: allSanityActivity(filter: { resort: { _id: { eq: $id } } }) {
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
      parallaxBackground {
        ...SanityImage
      }
    }
  }
`;

const pageSections = [
  { name: ACCOMODATION, isDropDown: true },
  { name: "Overview", isDropDown: false },
  { name: "Highlights", isDropDown: false },
  { name: "Dine", isDropDown: false },
  { name: "Spa", isDropDown: false },
  { name: "Activities", isDropDown: false },
];

const ResortTemplate = (props) => {
  const redirectedFrom = props?.location?.state?.redirectedFrom;
  const currentSlideIndex_ = props?.location?.state?.currentSlideIndex;
  const { data, errors } = props;
  const resort = data && data.resort;
  const spas = data && data.spas;
  const villas = data && data.villas;
  const restaurants = data && data.resort.restaurants;

  const resortVillas = useMemo(() => {
    const resortVillas_ = villas.nodes;
    return (
      resortVillas_.length &&
      resortVillas_?.slice(0, 6).map(({ name }, index) => {
        return {
          className: index === 0 ? "page-title" : "",
          content: name,
          onClick: () => {
            const villaUrl = getVillaUrl({
              name,
              resortName: resort?.name,
            });
            navigate(villaUrl);
          },
        };
      })
    );
  }, [resort?.name]);

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

  const heroRef = useRef();
  const { setPageName, setNavLinks, resetValues, setHeroRef } = useNavBar();
  const {
    accomodationRef,
    overviewRef,
    highlightsRef,
    spaRef,
    activitiesRef,
    dineRef,
    navLinks,
  } = usePageSectionsRef(pageSections_);

  React.useEffect(() => {
    setPageName(NAVBAR_WITH_BOTTOM_LINK);
    setNavLinks(navLinks);
    setHeroRef(heroRef);
    return () => {
      resetValues();
    };
  }, [overviewRef?.current]);

  const { elementRef, executeScroll } = useScrollToRef();

  React.useEffect(() => {
    if (redirectedFrom) {
      executeScroll(elementRef);
    }
  }, [redirectedFrom]);

  const windowGlobal = typeof window !== "undefined";
  const {
    name,
    locationAtoll,
    // locationFull,
    _rawDescription,
    numberOfBars,
    numberOfRestaurants,
    numberOfRooms,
    // roomVoltage,
    resortTransferType,
    timeToAirport,
    image,
    // villas,
    // restaurants,
    // reviews,
    gallery: galleries,
    activities,
    secondImage,
    highlights,
    faq,
  } = resort;
  const heroTextClass =
    resort.image.colorType === LIGHT_COLOR ? "overlay-background" : undefined;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {resort && (
        <SEO
          title={resort.name || "Untitled"}
          description={toPlainText(resort._rawDescription)}
          image={resort.image}
        />
      )}
      <Container>
        <ResortStyles>
          {image && (
            <div className={`resort__image ${heroTextClass}`} ref={heroRef}>
              <Overlay className="hero-overlay" />
              {image && image.asset && (
                <Image
                  asset={image?.asset}
                  width={950}
                  height={400}
                  config={{ fit: "clip" }}
                  alt={image?.alt}
                />
              )}
              <div
                className="text disappear-on-scroll"
                data-aos="zoom-out-up"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
              >
                <p className="atoll_title">{locationAtoll}</p>
                <h1 className="title_res resort_heading_title">{name}</h1>
              </div>
            </div>
          )}
          <LeftSidebar
            list={["overview", "accomodation", "highlights", "dine", "gallery"]}
          />

          <div id="overview" ref={overviewRef}>
            <Amenities
              locationAtoll={locationAtoll}
              numberOfBars={numberOfBars}
              numberOfRestaurants={numberOfRestaurants}
              numberOfRooms={numberOfRooms}
              resortTransferType={resortTransferType}
              timeToAirport={timeToAirport}
              _rawDescription={_rawDescription}
              title="ISLAND OVERVIEW"
            />
          </div>
          <AccommodationHighlightsWrapper ref={accomodationRef}>
            <Overlay opacity={1} bgColor="white" />
            <Accomodation
              elementRef={elementRef}
              id="accomodation"
              villas={villas.nodes}
              currentSlideIndex={currentSlideIndex_}
            />
            <Highlights highlights={highlights} innerRef={highlightsRef} />
          </AccommodationHighlightsWrapper>
          {restaurants.length && (
            <Restaurants innerRef={dineRef} restaurants={restaurants} />
          )}
          {spas.nodes && (
            <div
              ref={spaRef}
              speed={1000}
              className="resort__spas"
              slidesToShow={1}
              cellSpacing={0}
              vertical={windowGlobal && window.innerWidth < 806}
            >
              {spas.nodes.map((spa) => (
                <Spa spa={spa} key={spa.name} />
              ))}
            </div>
          )}

          {activities && (
            <Activities
              innerRef={activitiesRef}
              activities={activities}
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            />
          )}
          {/* 
          {secondImage && (
            <Image
              {...secondImage}
              width={1440}
              alt={secondImage?.alt}
              className="resort__image second-image"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            />
          )} */}

          {/* {faq && (
            <FAQ
              faq={faq}
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            />
          )} */}
        </ResortStyles>
      </Container>
    </Layout>
  );
};

export default ResortTemplate;
