import React from "react";

import Image from "gatsby-plugin-sanity-image";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { Overlay } from "../Overlay";
import Carousel from "nuka-carousel";
import Placeholder from "../../assets/placeholder.svg";

const ActivitiesStyles = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0% 15% 10rem 15%;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    padding: 0 1.5rem;
  }

  h2 {
    margin: 7rem 0rem 5rem 0;
    /* letter-spacing: 1rem; */
  }
  p {
    margin-bottom: 5rem;
    width: 70rem;
    color: var(--grey);
    align-self: center;
    @media ${device.laptop} {
      width: unset;
    }
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.6rem;
    width: 100%;

    @media ${device.laptop} {
      grid-template-columns: 1fr 1fr;
    }
    @media ${device.tablet} {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item {
    position: relative;
    transition: all 10s ease-in;
    height: 322px;

    &__carousel {
      max-height: unset;
      height: 100%;
    }
    a {
      height: 100%;
      width: 100%;
      display: block;
    }
    p {
      opacity: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: fit-content;
      color: #fff;
      font-size: 2rem;
    }

    &:hover {
      .overlay {
        opacity: 0.5;
        z-index: unset;
      }
      p {
        opacity: 1;
        z-index: 1;
      }
    }
    p {
      opacity: 0;
    }
    @media ${device.tablet} {
      &:before {
        /* transform: translate(-50%, -50%); */
        content: "";
        position: absolute;
        opacity: 0.3;
        width: 100%;
        height: 103%;
        background-color: #000;
      }

      p {
        opacity: 1;
      }
    }
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
        max-height: 240px;
        min-height: 240px;
      }
    }

    .slider-control-bottomcenter {
      display: none !important;
    }
  }
`;

const activitiesPlaceHolders = [1, 2, 3, 4, 5, 6];

const Activities = ({ activities }) => {
  return (
    <ActivitiesStyles id="activities">
      <Overlay opacity={1} bgColor="white" />
      <div
        id="activities-content"
        className="activities-content"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <h2>Activities</h2>
        <ul>
          {activities?.length
            ? activities?.map(({ name, imageThumb, resort }) => (
                <li className="item" key={imageThumb.alt}>
                  <Overlay className="overlay" />
                  {imageThumb && imageThumb.asset && (
                    <Image {...imageThumb} alt={imageThumb.alt} />
                  )}
                  <p>{name}</p>
                </li>
              ))
            : activitiesPlaceHolders.map((item) => (
                <li className="item" key={item}>
                  <Placeholder />
                </li>
              ))}
        </ul>

        <Carousel speed={1000} className="carousel">
          {activities?.map(({ name, imageThumb, resort }) => (
            <li className="item item__carousel" key={imageThumb.alt}>
              {imageThumb && imageThumb.asset && (
                <Image {...imageThumb} alt={imageThumb.alt} />
              )}
              <p>{name}</p>
            </li>
          ))}
        </Carousel>
      </div>
    </ActivitiesStyles>
  );
};

export default Activities;
