import React, { useState } from "react";

import Image from "gatsby-plugin-sanity-image";
import Placeholder from "../../assets/placeholder.svg";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { Button } from "../Button";
import { Overlay } from "../Overlay";

const RestaurantsStyles = styled.div`
  position: relative;
  z-index: 1;
  padding: 0 15% 10rem 15%;
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    padding: 0 10 10rem 10%;
  }

  @media ${device.tablet} {
    padding: 0 1.5rem 10rem 1.5rem;
  }
  @media ${device.onlyMobileSm} {
    padding: 0 1.5rem 5rem 1.5rem;
  }

  h2 {
    margin: 7rem 0 5rem 0;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 6rem;
    row-gap: 2rem;

    @media ${device.laptop} {
      grid-template-columns: 1fr;
    }

    .image-container {
      padding-top: 30px;
      height: 50rem;
      @media ${device.tablet} {
        height: 28rem;
      }
    }

    li {
      @media ${device.laptop} {
        display: grid;
        grid-template-columns: 1fr 25rem;
        gap: 4rem;
      }

      @media ${device.tablet} {
        grid-template-columns: 1fr;
      }
    }
  }

  &__text {
    margin-top: 1rem;
    position: relative;
    /* top: -4rem; */
    align-self: center;
    /* max-width: 25rem; */

    display: flex;
    flex-direction: column;

    @media ${device.laptop} {
      /* max-height: 25rem; */
    }
  }
  .alternate-name {
    display: flex;
    font-size: 1.7rem;
    font-weight: 100;
    font-family: "rivera_light_regular", sans-serif;
    margin-bottom: 2rem;
    color: #a9a7a7;
    text-transform: capitalize;
    letter-spacing: 0.4rem;
    // margin-top:-20px;
  }

  a {
    margin-top: 2.5rem;
    color: #505050;
  }

  .view-more-btn {
    margin-top: 5rem;
    align-self: center;
  }

  .rest-name {
    // letter-spacing:0.2rem;
    display: flex;
    text-transform: capitalize !important;
    color: var(--primary);
    font-size: 20px;
    padding: 20px 0px;
    letter-spacing: 1.75px;
  }

  .restaurant-description {
    color: #676767;
  }

  .dine-content {
    display: flex;
    flex-direction: column;
  }

  @media ${device.onlyMobileSm} {
    .alternate-name {
      margin-bottom: 1rem;
    }
    .rest-name {
      padding: 5px 0 10px 0;
    }
    ul {
      li {
        gap: 2rem;
      }
    }
    h2 {
      margin: 5rem 0 2rem 0;
    }
  }
`;
const Restaurants = ({ restaurants }) => {
  const [restaurantSlice, setRestaurantSLice] = useState(4);
  return (
    <RestaurantsStyles id="dine">
      <Overlay className="parallax-overlay" bgColor="#fff" />
      <div
        id="dine-content"
        className="dine-content"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <h2>Dine</h2>
        <ul>
          {restaurants
            .slice(0, restaurantSlice)
            .map(({ name, alternateName, imageThumb, description }) => (
              <li key={name}>
                <div key={name} className="image-container">
                  {imageThumb && imageThumb.asset ? (
                    <Image
                      asset={imageThumb?.asset}
                      width={400}
                      height={400}
                      config={{ fit: "clip" }}
                      alt={imageThumb.alt}
                    />
                  ) : (
                    <Placeholder style={{ width: "100%", height: "100%" }} />
                  )}
                </div>
                <div className="villa__restaurants__text">
                  <h3 className="rest-name">{name}</h3>
                  <h4 className="alternate-name">{alternateName}</h4>
                  <p className="restaurant-description">{description}</p>
                </div>
              </li>
            ))}
        </ul>

        {restaurantSlice === 4 && (
          <Button
            className="view-more-btn"
            onClick={() => setRestaurantSLice(100)}
          >
            View more
          </Button>
        )}
      </div>
    </RestaurantsStyles>
  );
};

export default Restaurants;
