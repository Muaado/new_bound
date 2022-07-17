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

  header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    background: url(https://picsum.photos/g/1921/1081?random) top center;
    background-size: cover;
    transform: translateZ(-1px) scale(2.1);
    min-height: 100%;
    z-index: -2;
  }

  /*************************************************************
  SECTIONS
**************************************************************/
  section {
    position: relative;
    min-height: 100vh;
    width: 100%;
    position: relative;
    transform-style: inherit;
  }

  .section1 {
    background: #fafafa;
    box-shadow: 0 0 20px #333;
    z-index: 1;
  }

  .section2::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    background: url(https://picsum.photos/g/1920/1080?random) top center;
    background-size: cover;
    transform: translateZ(-0.5px) scale(1.6);
    z-index: -1;
  }

  /*************************************************************
  HEADINGS
**************************************************************/
  h1 {
    font-size: 4rem;
    text-align: center;
    position: absolute;
    padding: 1rem;
    background: #fafafa;
    box-shadow: 0 0 20px #333;
    top: 50%;
    left: 50%;
    transform: translateZ(-1px) scale(2) translate(-25%, -25%);
  }

  .section1 h1 {
    z-index: 3;
    transform: translate(-50%, -50%);
    box-shadow: none;
  }

  .section2 h1 {
    transform: translateZ(-0.3px) scale(1.3) translate(-39%, -39%);
    z-index: 3;
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
    height: 100vh;
    letter-spacing: 4px;
    overflow: hidden;
    clip: rect(0, auto, auto, 0);
    .fixed {
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      background-image: url("https://cdn.sanity.io/images/y7yu20xn/master/652d727dd811337e05e3fdfc1252a1e26216dc84-1440x598.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
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
          <div className="fixed"></div>
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
