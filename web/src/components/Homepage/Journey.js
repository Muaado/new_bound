import React from "react";

// import { buildImageObj } from "../../lib/helpers";
// import { imageUrlFor } from "../../lib/image-url";

import Image from "gatsby-plugin-sanity-image";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { Overlay } from "../Overlay";
import Carousel from "nuka-carousel";
import { Link } from "gatsby";
import { FixedBackgroundImage } from "../Parallax";
import { getCollectionUrl } from "../../lib/helpers";

const JourneyStyles = styled.div`
  margin-top: 10rem;
  align-self: center;
  display: flex;
  flex-direction: column;
  z-index: 1;
  text-align: center;
  position: relative;
  padding: 0% 15% 5% 15%;

  width: 100%;
  @media ${device.laptopL} {
    padding: 0 15%;
  }
  @media ${device.laptop} {
    margin-top: 10rem;
    padding: 0 10%;
  }

  @media ${device.tablet} {
    margin-top: 7rem;
    padding: 0 1.5rem;
  }
  @media ${device.mobileXL} {
    padding: 0;
  }
  h2 {
    margin-top: 10rem;
    margin-bottom: 3rem;
  }

  h1 {
    letter-spacing: 2rem;
    line-height: 5rem;
    color: var(--primary);
    margin-bottom: 1rem;

    @media ${device.laptop} {
      font-size: 5rem;
    }

    @media ${device.tablet} {
      font-size: 3.6rem;
      letter-spacing: unset;
      line-height: 5rem;
    }
  }

  .header {
    align-self: center;
    display: flex;
    align-items: center;

    @media ${device.tablet} {
      display: none;
    }

    li {
      padding: 0 2rem;
      text-transform: uppercase;
      &:not(:last-of-type) {
        border-right: 1px solid #000;
      }
    }
  }

  .images {
    margin: 5rem 0rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;

    a {
      position: relative;
      height: 35rem;
      z-index: 1;
      img {
        /* z-index: 1; */
      }
      p {
        z-index: 1;
        color: #fff;
        position: absolute;
        text-transform: uppercase;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
          0px 4px 4px rgba(0, 0, 0, 0.25);
        top: 90%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);

        @media ${device.laptopM} {
        }
      }
      grid-column: 1 / span;
      &:first-of-type {
        grid-column: 1/4;
      }
      &:nth-of-type(2) {
        grid-column: 4/8;
      }

      &:nth-of-type(3) {
        grid-column: 1/3;
      }
      &:nth-of-type(4) {
        grid-column: 3/5;
      }
      &:nth-of-type(5) {
        grid-column: 5/8;
      }

      &:hover {
        .overlay {
          opacity: 0.5;
          z-index: 2;
        }

        p {
          transition: all 0.3s;
          opacity: 1;
          z-index: 999;
        }
      }
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      position: relative;
    }
  }

  .carousel {
    margin-top: 4rem;
    .slider-slide,
    .slider-list {
      @media ${device.tablet} {
        height: 35rem !important;
      }
      @media ${device.mobileXL} {
        height: 25rem !important;
      }
    }

    .slider-control-bottomcenter {
      bottom: -5rem !important;
    }
    &__image-container {
      @media ${device.tablet} {
        height: 35rem !important;
      }
      @media ${device.mobileXL} {
        height: 25rem !important;
      }

      p {
        position: absolute;
        /* top: 90%; */
        bottom: 0;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);

        color: #fff;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
          0px 4px 4px rgba(0, 0, 0, 0.25);
      }
      img {
        object-position: center;
        // width:10%;
      }
    }
  }
`;

const Journey = ({ collections }) => {
  const windowGlobal = typeof window !== "undefined";

  let windowWidth = 1440;

  if (windowGlobal) {
    windowWidth = window.innerWidth;
  }
  return (
    <JourneyStyles>
      <Overlay bgColor="#fdf7ed" className="parallax-overlay" />
      <h2>Start your journey</h2>
      {windowWidth >= 805 ? (
        <ul className="images">
          {collections.edges
            .sort((a, b) => a.node.rank - b.node.rank)
            .map(({ node }) => (
              <Link
                to={`/collections/${node.slug.current}/`}
                className="clickable"
                key={node.name}
              >
                <p>{node.CollectionPageName}</p>
                <Overlay className="overlay" />
                {node.image && node.image.asset && (
                  <Image {...node.image} alt={node.image.alt} />
                )}
              </Link>
            ))}
        </ul>
      ) : (
        <Carousel
          speed={1000}
          className="carousel"
          slidesToShow={1}
          disableEdgeSwiping
          dragging
          // easing
          // animation=""
          // cellSpacing={cellSpacing}
          renderCenterRightControls={() => ""}
          renderCenterLeftControls={() => ""}
        >
          {collections.edges
            .sort((a, b) => a.node.rank - b.node.rank)
            .map(({ node }) => (
              <Link
                key={node.alt}
                className="carousel__image-container clickable"
                to={getCollectionUrl({ name: node.name, type: node.type })}
              >
                <p>{node.name}</p>
                {node.imageThumb && node.imageThumb.asset && (
                  <Image {...node.imageThumb} alt={node.imageThumb.alt} />
                )}
              </Link>
            ))}
        </Carousel>
      )}
    </JourneyStyles>
  );
};

export default Journey;
