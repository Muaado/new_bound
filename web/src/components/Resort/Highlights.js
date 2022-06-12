import Carousel from "nuka-carousel";
import React from "react";
import PortableText from "../Ui/portableText";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import Image from "gatsby-plugin-sanity-image";
import Placeholder from "../../assets/placeholder.svg";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";

const HighlightsStyles = styled.div`
  margin-top: 10rem;
  text-align: center;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  @media ${device.laptopM} {
    padding: 0 10%;
  }
  @media ${device.tablet} {
    margin-top: 5rem;
    padding: 0 1.5rem;
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
    /* letter-spacing: 1rem; */
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

    /* .overlay {
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      opacity: 1;
      background-color: #000;
      overflow: hidden;
      width: 100%;
      height: 100%;
      transition: 10s ease;
    } */

    li {
      position: relative;
      transition: all 5s ease-in;

      @media ${device.tablet} {
        height: 230px;
      }

      &:hover {
        transition: 10s ease;
        p,
        a {
          transition: all 0.3s;
          opacity: 1;
          z-index: 999;
        }

        &:after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          width: 100%;
          opacity: 0.4;
          visibility: none;
          transition: 10s ease;
          background: #000;
          z-index: 50;
        }
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
      // data-aos="fade-up"
      // data-aos-delay="50"
      // data-aos-duration="1000"
      // data-aos-easing="ease-in-out"
    >
      <h2>Highlights</h2>

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
