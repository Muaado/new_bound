import React, { useEffect, useState } from "react";
import Image from "gatsby-plugin-sanity-image";
import Carousel from "nuka-carousel";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import ChevronLeft from "../../assets/icons/chevron-left.svg";

import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import useWindowSize from "../../lib/useWindowSize";
import CarouselButton from "../Ui/CarouselButton";
import { getVillaUrl } from "../../lib/helpers";
import { Link } from "gatsby";
import Placeholder from "../../assets/placeholder.svg";
import BackToResort from "../backToResort";
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
      min-height: 570px !important;
      width: 100%;
      background-size: cover;
    }
    p {
      /* font-family: "Playfair Display"; */
      font-size: 2rem;
      padding: 2rem;
      text-align: left;
      line-height: 4rem;

      @media ${device.tablet} {
        /* text-align: left; */
        font-size: 1.6rem;
        margin-right: 1rem;
      }
    }

    p .priceLbl {
      display:flex;
      @media ${device.tablet} {
        float: none;
        display:flex;
        width:100%;
      }
      
      float: right;
      font-size: 2rem;
      font-weight: bold;
      color: #f33;
      letter-spacing: 0.2rem;
    }

    p .perNight {
      font-size: 0.9rem;

  
  }
`;

const Accomodation = ({ villas, id }) => {
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
      // data-aos="fade-up"
      // data-aos-delay="50"
      // data-aos-duration="1000"
      // data-aos-easing="ease-in-out"
    >
      
      <h2>Accomodation</h2>

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
            <p>{name} <span class="priceLbl">from $5,950<span className="perNight"> per night</span></span></p>
          </Link>

          // </li>
        ))}
      </Carousel>
    </AccomodationStyles>
  );
};

export default Accomodation;
