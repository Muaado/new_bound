import React, { useEffect, useState } from "react";
import Image from "gatsby-plugin-sanity-image";
import { navigate } from "gatsby";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { getVillaUrl } from "../../lib/helpers";
import Placeholder from "../../assets/placeholder.svg";
import { Button } from "../Button";
import { Carousel } from "../Carousel";
import { ACCOMODATIONS_SECTION } from "../../constants";
import {
  useIsMobile,
  useOnlyIsTablet,
  useIsDesktop,
  useOnlyIsLaptop,
} from "../../hooks";
import { PriceTemplate } from "../PriceTemplate";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const AccomodationStyles = styled.div`
  width: 100%;
  height: 100%;

  @media ${device.tablet} {
    padding: 0;
  }

  .slider-control-bottomcenter {
    top: 58% !important;
    @media ${device.mobileSmall} {
      top: 56% !important;
    }
    @media ${device.mobileS} {
      top: 58% !important;
    }
  }

  .slider-control-centerright,
  .slider-control-centerleft {
    top: 30% !important;
  }

  h2 {
    text-align: center;
    /* padding: 5rem; */
    letter-spacing: normal;
    margin: 7rem 0 5rem 0;
  }
  .carousel {
    display: flex !important;

    width: 100%;

    .slider-slide {
      margin-right: 2rem;
    }

    .slider-frame {
      align-self: center;
      width: 100% !important;
    }
  }

  .image-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    img {
      height: 500px;

      @media ${device.onlyMobileS} {
        max-height: 400px;
        min-height: 400px;
        width: 100%;
      }

      @media ${device.onlyMobileSm} {
        max-height: 350px;
        min-height: 350px;
        width: 100%;
      }

      max-height: 570px;
      width: 100%;
      background-size: cover;
    }

    .roomFooter {
      padding: 2rem;
      @media ${device.onlyMobileSm} {
        padding: 2rem 1.5rem;
      }
    }
    .roomname {
      font-size: 25px;
      text-align: left;
      line-height: 4rem;
      color: #505050;
      padding-bottom: 10px;
      font-family: "rivera_light_regular", sans-serif;

      @media ${device.tablet} {
        font-size: 1.8rem;
        margin-right: 1rem;
      }
      @media ${device.onlyMobileSm} {
        text-align: left;
        font-size: 1.6rem !important;
        font-weight: 600 !important;
      }
    }
    .pricelbl {
      font-size: 18px;
      color: #595959;
    }
    .content {
      width: 100%;
      height: 100%;
    }
  }
`;

const Accomodation = ({
  villas,
  id,
  elementRef,
  currentSlideIndex: currentSlideIndex_,
}) => {
  const [numberOfSlides, setNumberOfSlides] = useState(1);
  const [cellSpacing, setCellSpacing] = useState(10);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(
    currentSlideIndex_ || 0
  );
  const isTablet = useOnlyIsTablet();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const isLaptop = useOnlyIsLaptop();
  useEffect(() => {
    const slides = () => {
      if (isDesktop || isLaptop) return 3;
      if (isTablet) return 2;
      if (isMobile) return 1;
      return 1;
    };
    const spacing = () => {
      return 20;
    };

    setNumberOfSlides(slides());
    setCellSpacing(spacing());
  }, [isDesktop, isLaptop, isTablet]);

  return (
    <AccomodationStyles
      id={id}
      className="resort__accomodation"
      // data-aos="fade-in"
      // data-aos-delay="50"
      // data-aos-duration="1000"
      // data-aos-easing="ease-in-out"
      ref={elementRef}
    >
      <div className="content">
        <h2>Accommodation</h2>

        <Carousel
          speed={isTablet ? 1500 : 1000}
          wrapAround
          className="carousel"
          slidesToShow={numberOfSlides}
          slideIndex={currentSlideIndex}
          getCurrentSlideIndex={(slideIndex) =>
            setCurrentSlideIndex(slideIndex)
          }
          cellSpacing={cellSpacing}
          {...(!isMobile ? { renderBottomCenterControls: false } : {})}
        >
          {villas.length &&
            villas.map(
              ({ name, imageThumb, resort, price, priceOnRequest }) => (
                <div className="image-container">
                  {imageThumb && imageThumb.asset ? (
                    <Image
                      className="image"
                      asset={imageThumb?.asset}
                      width={500}
                      height={500}
                      config={{ fit: "clip" }}
                      alt={imageThumb.alt}
                    />
                  ) : (
                    <Placeholder />
                  )}
                  <div className="roomFooter">
                    <h3 className="roomname">{name}</h3>
                    {priceOnRequest ? (
                      <p>Price On Request</p>
                    ) : (
                      <PriceTemplate price={formatter.format(price)} />
                    )}
                    <Button
                      onClick={() => {
                        navigate(
                          getVillaUrl({ name, resortName: resort.name }),
                          {
                            state: {
                              pageFrom: ACCOMODATIONS_SECTION,
                              currentSlideIndex,
                            },
                          }
                        );
                      }}
                    >
                      View Room
                    </Button>
                  </div>
                </div>
              )
            )}
        </Carousel>
      </div>
    </AccomodationStyles>
  );
};

export default Accomodation;
