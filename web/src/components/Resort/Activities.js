import React from "react";

import Image from "gatsby-plugin-sanity-image";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { Overlay } from "../Overlay";
import Carousel from "nuka-carousel";

// import { Placeholder } from "gatsby-plugin-image";
import Placeholder from "../../assets/placeholder.svg";
// console.log(Placeholder);

const ActivitiesStyles = styled.div`
  background: ${({ parallaxImage }) => `url(${parallaxImage}) center center / 
      cover fixed`};
  z-index: 1;
  /* margin: 10rem 0; */
  text-align: center;
  padding: 5% 15%;
  display: flex;
  flex-direction: column;
  @media ${device.laptopL} {
    /* padding: 0; */
  }
  @media ${device.tablet} {
    padding: 0 1.5rem;
  }

  h2 {
    margin-bottom: 3rem;
    letter-spacing: 1rem;
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
      /* grid-template-columns: 1fr; */
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item {
    position: relative;
    /* width: 10rem; */

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
      }
      p {
        opacity: 1;
        z-index: 20;
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

const Activities = ({ activities, parallaxImage }) => {
  return (
    <>
      <h2 className="heading">Activities</h2>
      <ActivitiesStyles
        id="activities"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        parallaxImage={parallaxImage}
      >
        {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation.
      </p> */}
        <ul>
          {activities?.length
            ? activities?.map(({ name, imageThumb, resort }) => (
                <li className="item" key={imageThumb.alt}>
                  <Overlay className="overlay" />
                  {/* <Link to={getActivityUrl({ name, resortName: resort.name })}> */}
                  {imageThumb && imageThumb.asset && (
                    <Image {...imageThumb} alt={imageThumb.alt} />
                  )}
                  <p>{name}</p>
                  {/* </Link> */}
                </li>
              ))
            : activitiesPlaceHolders.map((item) => (
                <li className="item" key={item}>
                  <Placeholder />
                  {/* {item} */}
                </li>
              ))}
        </ul>

        <Carousel
          speed={1000}
          className="carousel"
          // renderCenterRightControls={({ nextSlide }) => (
          //   <CarouselButton onClick={nextSlide} chevronRight={true} />
          // )}
          // renderCenterLeftControls={({ previousSlide }) => (
          //   <CarouselButton onClick={previousSlide} />
          // )}
        >
          {activities?.map(({ name, imageThumb, resort }) => (
            <li className="item item__carousel" key={imageThumb.alt}>
              {/* <Link to={getActivityUrl({ name, resortName: resort.name })}> */}
              {imageThumb && imageThumb.asset && (
                <Image {...imageThumb} alt={imageThumb.alt} />
              )}
              <p>{name}</p>
              {/* </Link> */}
            </li>
          ))}
        </Carousel>
      </ActivitiesStyles>
    </>
  );
};

export default Activities;
