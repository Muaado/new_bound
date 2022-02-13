import React, { useState } from "react";

import Image from "gatsby-plugin-sanity-image";
import Placeholder from "../../assets/placeholder.svg";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";

const RestaurantsStyles = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  padding: 0 15%;

  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    padding: 0 10%;
  }

  @media ${device.tablet} {
    margin-top: 5rem;
    padding: 0 1.5rem;
    margin-bottom: 5rem;
  }
  h2 {
    margin-bottom: 7rem;
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
      padding-top:30px;
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
      font-size: 1.5rem;
      font-weight: 100;
      margin-bottom: 2rem;
      color: #a9a7a7;
      text-transform: uppercase;
      letter-spacing: 0.4rem;
      // margin-top:-20px;
      
    }

    a {
      margin-top: 2.5rem;
      color: var(--grey);
    }
  }

  .btn {
    margin-top: 5rem;
    align-self: center;
  }

  .rest-name{
    letter-spacing:0.2rem;
    display: flex;
    text-transform: uppercase;
    color: var(--darkGreen);
    font-size: 3rem;
    padding:20px 0px;
  }

  .restaurant-description{
    color: #676767;
  }
  

`;
const Restaurants = ({ restaurants }) => {
  const [restaurantSlice, setRestaurantSLice] = useState(4);

  return (
    <RestaurantsStyles
      // className="villa__restaurants"
      id="dine"
    >
      <h2>Dine</h2>
      <ul>
        {restaurants
          .slice(0, restaurantSlice)
          .map(({ name, alternateName, imageThumb, description }) => (
            <li
              // data-aos="fade-up"
              // data-aos-delay="50"
              // data-aos-duration="1000"
              // data-aos-easing="ease-in-out"
              key={name}
            >
              <div key={name} className="image-container">
                {imageThumb && imageThumb.asset ? (
                  <Image {...imageThumb} alt={imageThumb.alt} />
                ) : (
                  <Placeholder style={{ width: "100%", height: "100%" }} />
                )}
              </div>
              <div className="villa__restaurants__text">
                <h3 className="rest-name">{name}</h3>
                <span className="alternate-name">{alternateName}</span>

                <p className="restaurant-description">{description}</p>
                {/* <Link
                to={getRestaurantUrl({ name, resortName: resort.name })}
              >
                Read more...
              </Link> */}
              </div>
            </li>
          ))}
      </ul>

      {restaurantSlice === 4 && (
        <button className="btn" onClick={() => setRestaurantSLice(100)}>
          View more
        </button>
      )}
    </RestaurantsStyles>
  );
};

export default Restaurants;
