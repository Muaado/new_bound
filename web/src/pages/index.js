import React from "react";
import { graphql, Link } from "gatsby";
import SanityMuxPlayer from "sanity-mux-player";

import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { navigate } from "gatsby";
import PromoSection from "../components/Homepage/PromoSection";
import AboutUs from "../components/Homepage/AboutUs";
import Journey from "../components/Homepage/Journey";
import Image from "gatsby-plugin-sanity-image";
import Faq from "../components/Homepage/Faq";
import TailorMade from "../components/Homepage/TailorMade";

import { ContactUs } from "../components/Homepage/ContactUs";
import {
  HandCraftedJourneysStyles,
  HeroStyles,
  MagazineStyles,
} from "../components/Homepage/styles";
import PortableText from "../components/Ui/portableText";
import { getBlogUrl, getResortUrl, getVillaUrl } from "../lib/helpers";
import WhyBoundlessSection from "../components/Homepage/WhyBoundlessSection";
import NewsletterSection from "../components/Homepage/NewsletterSection";
// import LeftSidebar from "../components/LeftSidebar";
import Search from "../components/Search";
import { Button } from "../components/Button";
import { FixedBackgroundImage, Overlay } from "../components";
import { isIOSDevice } from "../lib/helpers";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavBar } from "../hooks";
import { SIMPLE_MAIN_NAVBAR } from "../constants";
export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
      url
    }
    colorType
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      description
      # videoURL
      video {
        asset {
          _key
          _type
          assetId
          filename
          playbackId
          status
          thumbTime
        }
      }

      handCraftedJourneys {
        title
        description
        image {
          ...SanityImage
          alt
        }
      }
      mobileHeroImage {
        ...SanityImage
        alt
      }
      promoImageWeb {
        ...SanityImage
        alt
      }
      secondImage {
        ...SanityImage
        alt
      }
      aboutUs {
        title
        image {
          ...SanityImage
        }
        _rawDescription(resolveReferences: { maxDepth: 10 })
      }
      whyBoundlessImage {
        ...SanityImage
        alt
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
      newsLetterTitle
      newsLetterBackground {
        ...SanityImage
        alt
      }

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

    collections: allSanityCollectionPage(limit: 5) {
      edges {
        node {
          CollectionPageName

          image {
            ...SanityImage
            alt
          }
          slug {
            current
          }
        }
      }
    }
    magazinePosts: allSanityPost(limit: 3) {
      nodes {
        _rawExcerpt
        title
        mainImage {
          ...SanityImage
          alt
        }
        publishedAt
        slug {
          current
        }
      }
    }

    resorts: allSanityResort(sort: { fields: [name], order: DESC }) {
      nodes {
        name
      }
    }
    villas: allSanityVilla(filter: { active: { eq: true } }) {
      nodes {
        name
        resort {
          name
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  const { data } = props;
  const { collections } = data;
  const site = (data || {}).site;
  let resorts = (data || {}).resorts;
  const villas = (data || {}).villas;
  const magazinePosts = (data || {}).magazinePosts;
  const { setHeroRef, setPageName, resetValues } = useNavBar();
  const heroRef = useRef();
  useEffect(() => {
    setHeroRef(heroRef);
    setPageName(SIMPLE_MAIN_NAVBAR);
  }, [heroRef?.current]);

  useEffect(() => {
    return () => {
      resetValues();
    };
  }, []);

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const windowGlobal = typeof window !== "undefined";
  return (
    <Layout {...props}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <Container>
        <HeroStyles ref={heroRef}>
          {windowGlobal && window.innerWidth >= 805 ? (
            <SanityMuxPlayer
              assetDocument={site.video.asset}
              autoload={true}
              autoplay={true}
              className="video"
              height={"100vh"}
              loop={true}
              muted={true}
              showControls={false}
              style={{}}
              width={"100vh"}
            />
          ) : (
            site.mobileHeroImage &&
            site.mobileHeroImage.asset && (
              <Image {...site.mobileHeroImage} alt={site.mobileHeroImage.alt} />
            )
          )}
          <h1 className="disappear-on-scroll">Luxury experience curators</h1>
        </HeroStyles>
        <div className="page-content">
          <Search
            className="homepage-search"
            placeholder="Where would you like to go?"
            resorts={resorts.nodes}
            villas={villas.nodes}
            onChange={(input) => {
              let route;
              if (input) {
                if (input?.type === "resort") {
                  route = getResortUrl({ name: input.value });
                } else {
                  route = getVillaUrl({
                    name: input.value,
                    resortName: input.resortName,
                  });
                }

                navigate(route);
              }
            }}
          />
          <Journey collections={collections} />
          <HandCraftedJourneysStyles>
            <div className="parallax-main-wrapper">
              <div className="header-text">
                <p className="subtitle">only the best</p>
                <h2>hand-crafted journeys</h2>
              </div>
              <Overlay className="parallax-overlay" bgColor="#fdf7ed" />
              <div className="parallax-inner-wrapper">
                <p className="description">
                  Looking for an unforgettable luxury holiday experience? Look
                  no further than our experts at Boundless Maldives, to curate a
                  unique and personalized holiday experience tailored
                  specifically to your needs. Whether you're looking for a
                  private island escape or a luxury travel experience on a
                  private jet, Boundless Maldives will exceed your
                  expectations.Call us today to kick off your next adventure.
                </p>
                <ul>
                  {site.handCraftedJourneys.map(
                    ({ title, image, description }) => (
                      <li key={title}>
                        <div className="image-container">
                          {image && image.asset && (
                            <Image {...image} alt={image.alt} />
                          )}
                        </div>
                        <div className="text-container">
                          <h3>{title}</h3>

                          <p className="itemDesc">{description} </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
                <Link to="/enquire" className="white button-wrapper">
                  <Button>Enquire</Button>
                </Link>
              </div>
            </div>
          </HandCraftedJourneysStyles>
          <PromoSection image={site.promoImageWeb} />
          <AboutUs aboutUs={site.aboutUs} />
          <WhyBoundlessSection whyBoundlessImage={site.whyBoundlessImage} />
          <MagazineStyles>
            <Overlay className="parallax-overlay" bgColor="#fdf7ed" />
            <div className="content">
              <div className="header">
                <h2>Magazine</h2>
                <p className="subtitle">Inspiration</p>
              </div>
              <ul>
                {magazinePosts.nodes.map(
                  ({ title, _rawExcerpt, mainImage, publishedAt, slug }) => (
                    <li key={title}>
                      <Link to={getBlogUrl(publishedAt, slug.current)}>
                        <div className="image-container">
                          {mainImage && mainImage.asset && (
                            <Image {...mainImage} alt={mainImage.alt} />
                          )}
                        </div>
                        <h3>{title}</h3>
                        {_rawExcerpt && <PortableText blocks={_rawExcerpt} />}
                      </Link>
                    </li>
                  )
                )}
              </ul>

              <Link to="/archive" className="button-wrapper">
                <Button>View More...</Button>
              </Link>
            </div>
          </MagazineStyles>
          <TailorMade />
          <div className="second-image">
            <FixedBackgroundImage
              bgImage={site?.secondImage?.asset?.url}
              isIos={isIOSDevice()}
            />
          </div>
          {site.faq.length && <Faq path="/" faq={site.faq[0]} />}
          <NewsletterSection site={site} />
          <ContactUs contactUs={site.contactUs} />
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
