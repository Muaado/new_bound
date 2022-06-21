import Carousel from "nuka-carousel";
import React from "react";
import { Overlay } from "../Overlay";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import Image from "gatsby-plugin-sanity-image";
import Placeholder from "../../assets/placeholder.svg";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";

const HighlightsStyles = styled.div`
  z-index: 1;
  text-align: center;
  padding: 10% 15%;
  display: flex;
  flex-direction: column;
  @media ${device.laptopM} {
    padding: 10% 10%;
  }
  @media ${device.tablet} {
    margin-top: 5rem;
    padding: 5% 1.5rem;
  }

  .carousel {
    display: none !important;
    @media ${device.mobileXL} {
      display: unset !important;

      a {
        bottom: 0;
        padding: 5px;
      }

      img {
        max-height: 230px;
        min-height: 230px;
      }
    }

    .slider-control-bottomcenter {
      display: none !important;
    }
  }
  h2 {
    margin-bottom: 7rem;
    font-size: 35px;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.6rem;

    @media ${device.laptop} {
      grid-template-columns: 1fr 1fr;
    }

    @media ${device.tablet} {
      grid-template-columns: 1fr;
      display: none;
    }

    li {
      position: relative;
      transition: all 10s ease-in;
      @media ${device.tablet} {
        height: 230px;
      }
    }

    li:hover .overlay {
      opacity: 0.5;
      z-index: unset;
      a {
        z-index: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      min-height: 322px;
      min-width: 230px;
      max-height: 260px;
      object-fit: cover;
    }
  }
  a {
    position: absolute;
    color: #fff;
    font-size: 1.8rem;
    padding: 8px;
    width: -moz-fit-content;
    /* width: fit-content; */
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: rgb(0 0 0 / 25%);
    width: 100%;
    bottom: 0;

    svg {
      margin-left: 1.5rem;
      height: 0.9rem;
      width: 0.9rem;
    }

    @media ${device.laptopM} {
      bottom: 0;
    }
    @media ${device.tabletL} {
      padding: 1rem 2.5rem;
    }
  }
  p {
    width: 90%;
    position: absolute;
    /* top: 20%; */
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;

    @media ${device.laptopM} {
      top: 35%;
      font-size: 1.4rem;
    }
    @media ${device.tabletL} {
      font-size: 1.4rem;
    }

    opacity: 0;
    color: #fff;
    align-self: center;
    line-height: 2.4rem;
  }
`;

const Highlights = ({ highlights }) => {
  return (
    <HighlightsStyles
      id="highlights"
      className="resort__highlights"
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
    >
      <Overlay bgColor="white" opacity={1} />
      <h2 className="heading">Highlights</h2>
      <Carousel
        speed={1000}
        wrapAround
        className="carousel"
        slidesToShow={1}
        cellSpacing={0}

        // renderCenterRightControls={({ nextSlide }) => (
        //   <CarouselButton onClick={nextSlide} chevronRight={true} />
        // )}
        // renderCenterLeftControls={({ previousSlide }) => (
        //   <CarouselButton onClick={previousSlide} />
        // )}
      >
        {highlights.map(({ name, imageThumb, description }) => (
          <li key={imageThumb?.alt}>
            {/* <Link to={getHighlightUrl({ name, resortName: resort.name })}> */}
            {/* </Link> */}
            <p>{description}</p>
            {imageThumb && imageThumb.asset && (
              <>
                <Image {...imageThumb} alt={imageThumb.alt} />
              </>
            )}
            <a className="highLbl">
              {name} <ChevronRight />
            </a>
          </li>
        ))}
      </Carousel>
      <ul className="desktop-highlights">
        {highlights.length
          ? highlights.map(({ name, imageThumb, description }) => (
              <li key={imageThumb?.alt}>
                <Overlay className="overlay" />
                <a>
                  {name} <ChevronRight />
                </a>
                {/* </Link> */}
                <p>{description}</p>
                {imageThumb && imageThumb.asset && (
                  <>
                    <Image {...imageThumb} alt={imageThumb.alt} />
                  </>
                )}
              </li>
            ))
          : [1, 2, 3, 4, 5, 6].map((item) => (
              <li key={item}>
                {/* {console.log("hrehreh")} */}
                <Placeholder />
              </li>
            ))}
      </ul>
    </HighlightsStyles>
  );
};

export default Highlights;
