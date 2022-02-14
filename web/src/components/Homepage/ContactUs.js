import React from "react";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";

import Image from "gatsby-plugin-sanity-image";
import PhoneIcon from "../../assets/icons/phone.svg";
import EmailIcon from "../../assets/icons/email.svg";




const ContactUsSection = styled.div`
  margin-bottom: 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  font-size: 2rem;
  padding: 0 15%;
  p {
    color: #000;
  }
  @media ${device.laptopL} {
    padding: 0 10%;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr;
    /* align-content: center;
    align-items: center;
    justify-content: center; */
    justify-items: center;
  }
  @media ${device.tablet} {
    padding: 0 1.5rem;
    /* max-width: 100vw; */
  }

  .links {
    margin-bottom: 4rem;
    display: flex;
    @media ${device.mobileXL} {
      flex-direction: column;
    }
    a {
      display: flex;
      align-items: center;
      @media ${device.mobileXL} {
        margin-bottom: 2rem;
      }

      &:first-of-type {
        margin-right: 5rem;
      }

      svg {
        margin-right: 1rem;
      }
    }
  }
  p {
    margin-bottom: 2.5rem;
  }
  .contact-people {
    margin-bottom: 4rem;
    display: flex;

    li {
      width: 10rem;

      @media ${device.tablet} {
        width: 10rem;
      }

      @media ${device.mobileXL} {
        width: 6rem;
      }
      @media ${device.mobileL} {
        width: 5rem;
      }

      &:not(:last-of-type) {
        margin-right: 2.5rem;

        @media ${device.tablet} {
          margin-right: 1rem;
        }
      }
    }
  }

  .hours {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    ul {
      margin-bottom: 4rem;
      width: 50rem;
      @media ${device.laptopM} {
        width: 42rem;
      }
      @media ${device.laptop} {
        width: 100%;
      }

      @media ${device.tablet} {
        width: 100%;
        font-size: 1.6rem;
      }

      li {
        display: flex;
        justify-content: space-between;
      }
    }
    p {
      color: var(--grey1);
      font-style: italic;
    }
  }

  position: relative;
  .anchor {
    display: none;
    @media ${device.tablet} {
      display: block;
    }
    position: absolute;
    top: -15rem;
    /* top: -px; */
    visibility: hidden;
  }
`;


export const ContactUs = ({ contactUs }) => {
  const { email, phoneOne, contactPeople, hours, businessHoursDescription } =
    contactUs;
  return (
    
      <div>
        <h1>Headline Text</h1>
      </div>
    
  );
};
