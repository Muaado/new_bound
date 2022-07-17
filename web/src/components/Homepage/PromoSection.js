import React from "react";
import { FixedBackgroundImage } from "../Parallax";
import { isIOSDevice } from "../../lib/helpers";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { Overlay } from "../Overlay";

export const PromoSectionStyles = styled.div`
  position: relative;
  height: 60rem;
  color: #fff !important;

  @media ${device.laptopL} {
    margin: 0;
  }

  @media ${device.tabletL} {
    margin: 0;
  }

  @media ${device.tablet} {
    height: 50rem;
  }

  @media ${device.mobileXL} {
    height: 40rem;
  }

  img {
    height: 100%;
    width: 100%;

    object-fit: contain;
    @media ${device.laptopM} {
      object-position: right;
    }
  }

  h2 {
    z-index: 100;
    width: 45rem;
    position: absolute;
    top: 45%;
    left: 75%;
    transform: translate(-50%, -50%);

    color: #fff;
    text-align: center;
    letter-spacing: 1rem;
    /* font-family: "Playfair display"; */
    /* font-size: 4.8rem; */
    text-transform: lowercase;
    font-weight: normal;

    @media ${device.tabletL} {
      left: 70%;
    }
    @media ${device.tablet} {
      left: 50%;
      top: 35%;
      width: unset;
      text-transform: uppercase;

      /* position: relative; */
    }
  }
  p {
    width: 45rem;
    position: absolute;
    top: 60%;
    left: 75%;
    transform: translate(-50%, -50%);
    color: #fff;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    @media ${device.tabletL} {
      left: 70%;
    }
    @media ${device.tablet} {
      left: 50%;
      width: 100%;
      padding: 0 1.5rem;
    }
  }
  header {
    position: relative;
    min-height: 100vh;
    width: 100%;
    transform-style: inherit;
    z-index: -1;
  }

  .promo-text {
    z-index: 2;
    p {
      z-index: 2 !important;
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  .section {
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100%;
    letter-spacing: 4px;
    overflow: hidden;
    clip: rect(0, auto, auto, 0);
    .fixed {
      position: relative;
      height: 600px;
    }
    .fixed:before {
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      background: url("https://cdn.sanity.io/images/y7yu20xn/master/652d727dd811337e05e3fdfc1252a1e26216dc84-1440x598.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      overflow: hidden;
      z-index: 0;
      @supports (-webkit-touch-callout: none) {
        -webkit-transform: translate3d(0, 0, 0) !important;
      }
    }
  }
`;

const PromoSection = ({ image }) => {
  return (
    <PromoSectionStyles
    // bgImage={image?.asset?.url}
    // className="parallax"
    // data-aos="fade-up"
    // data-aos-delay="50"
    // data-aos-duration="1000"
    // data-aos-easing="ease-in-out"
    >
      <Wrapper>
        <div className="section">
          <Overlay opacity={0.1} />
          <div className="promo-text">
            <h2>we specialise in the maldives</h2>
            <p>
              hand-picked portfolio of the world’s most luxurious resorts and
              Villas in the most stunning locations.
            </p>
          </div>
          <div className="fixed" />
        </div>
      </Wrapper>
      {/* <FixedBackgroundImage bgImage={image?.asset?.url} isIos={isIOSDevice()}>
        <h2 className="parallax__layer--back">we specialise in the maldives</h2>
        <p className="parallax__layer--back">
          hand-picked portfolio of the world’s most luxurious resorts and Villas
          in the most stunning locations.
        </p>
      </FixedBackgroundImage> */}
    </PromoSectionStyles>
  );
};

export default PromoSection;
