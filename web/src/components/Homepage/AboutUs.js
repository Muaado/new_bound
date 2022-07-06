import React from "react";
import Image from "gatsby-plugin-sanity-image";
import PortableText from "../Ui/portableText";

import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { Overlay } from "../../components";

const AboutUsSectionStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 10rem 15%;
  position: relative;
  z-index: 1;
  @media ${device.laptopL} {
    padding: 5rem 10%;
  }

  @media ${device.tablet} {
    padding: 5rem 1.5rem;
  }
  .about-us {
    &__image-container {
      width: 50rem;
      height: 50rem;
      height: auto;
      margin-right: 4rem;

      @media ${device.tabletL} {
        display: none;
      }
    }
    &__text {
      h2 {
        text-transform: uppercase;
        margin-bottom: 2rem;
        text-align: left !important;
      }

      p {
        max-width: 80rem;
        margin: 2rem 0;
        @media ${device.onlyMobileSm} {
          text-align: justify;
        }
      }
    }
  }
`;

const AboutUs = ({ aboutUs }) => {
  return (
    <AboutUsSectionStyles>
      <Overlay bgColor="white" opacity={1} />
      <div className="about-us__image-container">
        {aboutUs.image && aboutUs.image.asset && (
          <Image
            {...aboutUs.image}
            // tell Sanity how large to make the image (does not set any CSS)
            width={500}
            // style it how you want it

            alt={aboutUs.image.alt}
          />
        )}
      </div>
      <div className="about-us__text">
        <h2>{aboutUs.title}</h2>

        {aboutUs._rawDescription && (
          <PortableText
            className="about-us__text-block"
            blocks={aboutUs._rawDescription}
          />
        )}
      </div>
    </AboutUsSectionStyles>
  );
};

export default AboutUs;
