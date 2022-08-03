import { Carousel } from "../Carousel";
import React from "react";
import { Overlay } from "../Overlay";
import Image from "gatsby-plugin-sanity-image";
import Placeholder from "../../assets/placeholder.svg";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { useIsMobileLarge } from "../../hooks";

const HighlightsStyles = styled.div`
  z-index: 1;
  background: white;
  text-align: center;
  padding: 0% 15% 10rem 15%;
  display: flex;
  flex-direction: column;

  @media ${device.laptopM} {
    padding: 0% 15% 10rem 15%;
  }

  @media ${device.tablet} {
    padding: 0 1.5rem 10rem 1.5rem;
  }

  @media ${device.onlyMobileSm} {
    padding: 0 1.5rem 5rem 1.5rem;
  }

  .carousel {
    /* margin: 4rem 0rem 10rem; */
    .slider-slide,
    .slider-list {
      @media ${device.tablet} {
        height: 35rem !important;
      }
      @media ${device.mobileXL} {
        height: 25rem !important;
      }
    }

    &__image-container {
      @media ${device.tablet} {
        height: 35rem !important;
      }
      @media ${device.mobileXL} {
        height: 25rem !important;
      }

      img {
        object-position: center;
      }
    }
  }

  h2 {
    margin: 7rem 0rem 5rem 0rem;
    @media ${device.onlyMobileSm} {
      margin: 5rem 0rem 5rem 0rem;
    }
    font-size: 35px;
  }

  .desktop-highlights {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.6rem;

    @media ${device.laptop} {
      grid-template-columns: 1fr 1fr;
    }

    /* @media ${device.tablet} {
      grid-template-columns: 1fr qfr;
    } */

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
      .card-text-wrapper {
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
      @media ${device.onlyMobileS} {
        min-height: unset;
      }
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
  .card-text-wrapper {
    top: 50% !important;
  }
`;

const Highlights = ({ highlights, innerRef }) => {
  const isMobile = useIsMobileLarge();
  return (
    <HighlightsStyles
      id="highlights"
      className="resort__highlights"
      ref={innerRef}
    >
      <div
        id="higlights-content"
        className="content"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <h2>Highlights</h2>
        {isMobile ? (
          <Carousel
            speed={1000}
            wrapAround
            className="carousel"
            slidesToShow={1}
            cellSpacing={0}
          >
            {highlights.map(({ name, imageThumb }) => (
              <li key={imageThumb?.alt}>
                <div className="card-text-wrapper">{name}</div>
                {imageThumb && imageThumb.asset && (
                  <Image
                    asset={imageThumb?.asset}
                    width={400}
                    height={400}
                    config={{ fit: "clip" }}
                    alt={imageThumb.alt}
                  />
                )}
              </li>
            ))}
          </Carousel>
        ) : (
          <ul className="desktop-highlights">
            {highlights.length
              ? highlights.map(({ name, imageThumb, description }) => (
                  <li key={imageThumb?.alt}>
                    <Overlay className="overlay" />
                    <div className="card-text-wrapper">{name}</div>
                    <p>{description}</p>
                    {imageThumb && imageThumb.asset && (
                      <Image
                        asset={imageThumb?.asset}
                        width={400}
                        height={400}
                        config={{ fit: "clip" }}
                        alt={imageThumb.alt}
                      />
                    )}
                  </li>
                ))
              : [1, 2, 3, 4, 5, 6].map((item) => (
                  <li key={item}>
                    <Placeholder />
                  </li>
                ))}
          </ul>
        )}
      </div>
    </HighlightsStyles>
  );
};

export default Highlights;
