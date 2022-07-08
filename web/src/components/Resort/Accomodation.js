import React, { useEffect, useState } from "react";
import Image from "gatsby-plugin-sanity-image";
// import Carousel from "nuka-carousel";
import { Link } from "gatsby";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import useWindowSize from "../../lib/useWindowSize";
import { getVillaUrl } from "../../lib/helpers";
import Placeholder from "../../assets/placeholder.svg";
import { Button } from "../Button";
import { Carousel } from "../Carousel";
import { ACCOMODATIONS_SECTION } from "../../constants";
import { useIsMobile, useIsTablet } from "../../hooks";
import { PriceTemplate } from "../PriceTemplate";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const AccomodationStyles = styled.div`
  @media ${device.tablet} {
    padding: 0;
  }

  .slider-control-bottomcenter {
    top: 65% !important;
    @media ${device.mobileS} {
      top: 60% !important;
    }
  }

  .slider-control-centerright,
  .slider-control-centerleft {
    top: 40% !important;
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
    /* min-width: 40rem; */
    width: 100%;
    display: flex;
    flex-direction: column;

    /* min-height: 614px; */
    img {
      /* min-height: 570px; */
      @media ${device.mobileXL} {
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
    }
    .roomname {
      font-size: 25px;
      text-align: left;
      line-height: 4rem;
      color: #505050;
      padding-bottom: 10px;
      // min-height: 90px;
      font-family: "rivera_light_regular", sans-serif;

      @media ${device.tablet} {
        /* text-align: left; */
        font-size: 1.8rem;
        margin-right: 1rem;
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
  const [numberOfSlides, setNumberOfSlides] = useState(3);
  const [cellSpacing, setCellSpacing] = useState(10);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(
    currentSlideIndex_ || 0
  );
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();
  const size = useWindowSize();
  useEffect(() => {
    const { width } = size;
    const isMobileOnly = width <= 576;
    const isSreenSM = width > 992 && width < 1200;
    const isSreenLG = width > 1200 && width < 1440;
    const screenXL = width > 1440 && width < 1600;
    const screenXXL = width > 1600;

    const slides = () => {
      if (isMobileOnly) return 1;
      if (isTablet) return 1;
      if (isSreenSM) return 1;
      if (isSreenLG) return 2;
      if (screenXL) return 3;
      if (screenXXL) return 3;
      return 2.9;
    };

    const spacing = () => {
      return 20;
    };

    setNumberOfSlides(slides);
    setCellSpacing(spacing);
  }, [size]);
  return (
    <AccomodationStyles
      id={id}
      className="resort__accomodation"
      data-aos="fade-in"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      ref={elementRef}
    >
      <div className="content">
        <h2>Accommodation</h2>

        <Carousel
          speed={1000}
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
          {villas.map(({ name, imageThumb, resort, price, priceOnRequest }) => (
            <Link
              to={getVillaUrl({ name, resortName: resort.name })}
              key={name}
              state={{ pageFrom: ACCOMODATIONS_SECTION, currentSlideIndex }}
              className="image-container"
            >
              {imageThumb && imageThumb.asset ? (
                <Image
                  className="image"
                  {...imageThumb}
                  width={500}
                  height={500}
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
                <Button>View Room</Button>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </AccomodationStyles>
  );
};

export default Accomodation;
