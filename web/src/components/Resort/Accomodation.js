import React, { useEffect, useState } from "react";
import Image from "gatsby-plugin-sanity-image";
import Carousel from "nuka-carousel";
import { Link } from "gatsby";
import styled from "styled-components";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import ChevronLeft from "../../assets/icons/chevron-left.svg";
import { device } from "../../styles/deviceSizes";
import useWindowSize from "../../lib/useWindowSize";
import CarouselButton from "../Ui/CarouselButton";
import { getVillaUrl } from "../../lib/helpers";
import Placeholder from "../../assets/placeholder.svg";
import BackToResort from "../backToResort";
import { Button } from "../Button";

const AccomodationStyles = styled.div`
  @media ${device.tablet} {
    padding: 0;
  }
  // .slider-control-bottomcenter button
  // {
  //   background: black !important;
  //   border-radius: 100%;
  //   width: 10px !important;
  //   height: 10px !important;
  // }

  .slider-control-bottomcenter svg {
    display: none !important;
  }
  .slider-control-bottomcenter li {
    margin-right: 5px;
  }
  h2 {
    text-align: center;
    /* padding: 5rem; */
    letter-spacing: normal;
    margin-bottom: 7rem;
  }
  .carousel {
    display: flex !important;

    width: 100%;

    .slider-slide {
      margin-right: 2rem;
      /* width: 100% !important; */
      /* min-width: 50rem !important; */
    }

    .slider-frame {
      // @media ${device.notMobile} {
      //   overflow: unset !important;
      // }

      // @media ${device.mobileL} {
      //   overflow: hidden !important;
      // }

      align-self: center;
      width: 100% !important;
    }
  }
  .image-container {
    /* min-width: 40rem; */
    width: 100%;
    display: flex;
    flex-direction: column;

    min-height: 614px;
    img {
      min-height: 570px;
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
      .room_price {
        font-size: 1.6rem;
        -webkit-letter-spacing: 0.3rem;
        -moz-letter-spacing: 0.3rem;
        -ms-letter-spacing: 0.3rem;
        letter-spacing: 0.3rem;
        color: #7d7d7d;
        .price-from {
          text-transform: uppercase;
          font-weight: 400 !important;
          font-size: 10px;
        }
        .font-bold {
          font-family: "rivera_bold_regular", "sans-serif";
        }
        .price-category {
          font-size: 11px;
          margin-left: 5px;
        }
        // margin-left: 20px;
      }
    }
    .roomname {
      font-size: 25px;
      text-align: left;
      line-height: 4rem;
      padding-bottom: 10px;
      // min-height: 90px;
      font-family: "rivera_light_regular", sans-serif;

      @media ${device.tablet} {
        /* text-align: left; */
        font-size: 1.6rem;
        margin-right: 1rem;
      }
    }
    .pricelbl {
      font-size: 18px;
      color: #595959;
    }
  }
`;

const Accomodation = ({ villas, id, elementRef }) => {
  const [numberOfSlides, setNumberOfSlides] = useState(3);
  const [cellSpacing, setCellSpacing] = useState(10);
  const size = useWindowSize();

  useEffect(() => {
    const { width } = size;
    const isMobileOnly = width <= 576;
    const isTablet = width > 576 && width < 992;
    const isSreenSM = width > 992 && width < 1200;
    const isSreenLG = width > 1200 && width < 1440;
    const screenXL = width > 1440 && width < 1600;
    const screenXXL = width > 1600;
    const notMobile = width > 576;

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
      // if (isMobileOnly) return 50;
      // if (isTablet) return 20;
      return 20;
    };

    setNumberOfSlides(slides);
    setCellSpacing(spacing);
  }, [size]);
  return (
    <AccomodationStyles
      id={id}
      className="resort__accomodation"
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      ref={elementRef}
    >
      <h2>Accommodation</h2>

      <Carousel
        speed={1000}
        wrapAround
        className="carousel"
        slidesToShow={numberOfSlides}
        cellSpacing={cellSpacing}
        // renderCenterRightControls={({ nextSlide }) => (
        //   <CarouselButton onClick={nextSlide} />
        // )}
        // renderCenterLeftControls={({ previousSlide }) => ""}
      >
        {villas.map(({ name, imageThumb, resort }) => (
          // <li key={name}>
          // check if name contains word 'demo'

          <Link
            to={getVillaUrl({ name, resortName: resort.name })}
            key={name}
            className="image-container"
          >
            {imageThumb && imageThumb.asset ? (
              <Image className="image" {...imageThumb} alt={imageThumb.alt} />
            ) : (
              <Placeholder />
            )}
            <div className="roomFooter">
              <p className="roomname">{name}</p>
              {/* <span className="pricelbl">from $5,950 PP</span> */}
              <div className="room_price">
                <span className="price-from">From</span>{" "}
                <span className="font-bold">$5,950</span>
                <span className="price-category">per night</span>
              </div>
              <Button>View Room</Button>
            </div>
          </Link>
        ))}
      </Carousel>
    </AccomodationStyles>
  );
};

export default Accomodation;
