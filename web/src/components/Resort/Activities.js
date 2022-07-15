import React from "react";

import Image from "gatsby-plugin-sanity-image";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { Overlay } from "../Overlay";
import { Carousel } from "../Carousel";
import Placeholder from "../../assets/placeholder.svg";
import { useIsTablet } from "../../hooks";

const ActivitiesStyles = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0% 15% 10rem 15%;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    padding: 0 1.5rem 10rem 1.5rem;
  }

  @media ${device.onlyMobileSm} {
    padding: 0 1.5rem 5rem 1.5rem;
  }

  h2 {
    margin: 7rem 0rem 5rem 0;
    @media ${device.onlyMobileSm} {
      margin: 5rem 0rem 5rem 0;
    }
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

  .desktop-activities {
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
      .carousel-overlay {
        opacity: 0.3;
        z-index: 1;
      }
      p {
        opacity: 1;
      }
    }
  }

  .card-text-wrapper {
    top: 50% !important;
  }
`;

const activitiesPlaceHolders = [1, 2, 3, 4, 5, 6];

const Activities = ({ activities }) => {
  const isTablet = useIsTablet();
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
        {!isTablet ? (
          <ul className="desktop-activities">
            {activities?.length
              ? activities?.map(({ name, imageThumb }) => (
                  <li className="item" key={imageThumb?.alt}>
                    <Overlay className="overlay" />
                    {imageThumb && imageThumb?.asset && (
                      <Image
                        asset={imageThumb?.asset}
                        width={400}
                        height={400}
                        config={{ fit: "clip" }}
                        alt={imageThumb?.alt}
                      />
                    )}
                    <div className="card-text-wrapper">{name}</div>
                  </li>
                ))
              : activitiesPlaceHolders.map((item) => (
                  <li className="item" key={item}>
                    <Placeholder />
                  </li>
                ))}
          </ul>
        ) : (
          <Carousel speed={1000} className="carousel">
            {activities?.map(({ name, imageThumb }) => (
              <li className="item item__carousel" key={imageThumb?.alt}>
                <Overlay className="carousel-overlay" />
                {imageThumb && imageThumb?.asset && (
                  <Image
                    asset={imageThumb?.asset}
                    width={400}
                    height={400}
                    config={{ fit: "clip" }}
                    alt={imageThumb?.alt}
                  />
                )}
                <div className="card-text-wrapper">{name}</div>
              </li>
            ))}
          </Carousel>
        )}
      </div>
    </ActivitiesStyles>
  );
};

export default Activities;
