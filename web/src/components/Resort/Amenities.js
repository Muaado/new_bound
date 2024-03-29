import React from "react";

import PortableText from "../Ui/portableText";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { Overlay } from "../Overlay";
// import { device } from "../styles/deviceSizes";

const AmenitiesStyles = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  .description {
    max-width: 50%;
    font-weight: 100;
    text-align: center;
    align-self: center;
    padding: 0rem 0 5rem 0;
    line-height: 3.6rem;
    p {
      text-align: center;
    }

    @media ${device.tablet} {
      width: 90vw;
      max-width: 80%;
      width: 100vw;
      padding: 3rem 1.5rem;
    }

    @media ${device.mobileXL} {
      padding: 3rem 2rem;
      max-width: 100%;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    padding-bottom: 5rem;
    @media ${device.onlyMobileSm} {
      padding-bottom: 0rem;
    }
    ul {
      align-self: center;
      width: fit-content;

      align-self: center;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
      @media ${device.mobileXL} {
        padding: 0 1rem;
      }
      li {
        /* border-right: 1px solid #000; */
        /* padding: 0 1rem; */
        text-align: center;

        @media ${device.tablet} {
          font-size: 1.1rem;
        }
        &:nth-of-type(1),
        &:nth-of-type(4) {
          border-right: 1px solid var(--grey);
          padding-right: 1rem;
          text-align: right;
        }
        &:nth-of-type(3),
        &:last-of-type {
          border-left: 1px solid var(--grey);
          padding-left: 1rem;
          text-align: left;
        }
      }
    }
  }
  .amenties {
    margin-bottom: 5rem;
  }
  h2 {
    margin-top: 10rem;
    margin-bottom: 5rem;
  }
`;

const Amenities = ({
  locationAtoll,
  numberOfBars,
  numberOfRestaurants,
  numberOfRooms,
  resortTransferType,
  timeToAirport,
  _rawDescription,
  title,
  innerRef,
}) => {
  return (
    <AmenitiesStyles ref={innerRef}>
      <Overlay className="parallax-overlay" bgColor="#fdf7ed" />
      <div
        className="amenities-content"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <h2>{title}</h2>
        <div className="content">
          <div className="description">
            <PortableText blocks={_rawDescription} />
          </div>
          <ul className="amenties">
            <li key={numberOfRooms}>No of rooms : {numberOfRooms} </li>
            <li key={numberOfRestaurants}>
              Restaurants : {numberOfRestaurants}
            </li>
            <li key={numberOfBars}> No of bars : {numberOfBars}</li>
            <li key={locationAtoll}>Location : {locationAtoll} </li>
            <li key={timeToAirport}>Time to airport : {timeToAirport}</li>
            <li key={"transfers"}>
              Transfers :{" "}
              {resortTransferType?.map(
                (type, index) =>
                  `${type.transferType}${
                    index + 1 !== resortTransferType.length ? "/" : ""
                  }`
              )}
            </li>
          </ul>
        </div>
      </div>
    </AmenitiesStyles>
  );
};

export default Amenities;
