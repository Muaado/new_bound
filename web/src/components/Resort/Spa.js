import React, { useEffect, useState } from "react";
import Image from "gatsby-plugin-sanity-image";
import PortableText from "../Ui/portableText";

import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
// import { device } from "../styles/deviceSizes";
import useWindowSize from "../../lib/useWindowSize";

const SpaStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 70rem;
  padding: 5% 0 5% 0;

  background-size: 100vw;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .spaname {
    width: 100%;
    color: var(--primary);
    font-size: 25px;
    padding: 20px 0px;
    display: flex;
    text-transform: capitalize !important;
  }

  @media ${device.tablet} {
    min-height: unset;
    padding: 6rem 1.5rem 10rem 1.5rem;
  }

  /* height: max-content; */
  .container {
    display: flex;
    align-self: center;
    justify-content: center;
    max-width: 1400px;
    min-height: 70rem;
    width: 100%;
    @media ${device.laptopM} {
      align-items: center;
      flex-direction: column-reverse;
    }
    @media ${device.tablet} {
      min-height: unset;
    }

    @media ${device.mobileXL} {
      min-height: unset;
    }

    .left-section {
      width: 80rem;
      padding-top: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5rem 0;

      @media ${device.laptopM} {
        text-align: center;
        align-items: center;
        padding: 0;
        width: 90%;
      }

      @media ${device.tablet} {
        width: 100%;
      }
      .image-web {
        height: 40rem;
        width: 65rem;
        position: relative;
        right: -5rem;
        top: -2rem;
        z-index: 100;
        @media ${device.laptopM} {
          height: 30rem;
          width: unset;
          right: 0;
          top: 0;
          margin-bottom: 2rem;
        }

        @media ${device.tablet} {
          height: 100%;
        }
      }
      p {
        padding-left: 5rem;
        max-width: 60rem;

        @media ${device.laptopM} {
          align-self: center;
          padding: 0;
        }
      }
    }
    .right-section {
      /* height: 100%; */
      padding: 6rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      @media ${device.laptopM} {
        align-items: center;
      }
      @media ${device.tablet} {
        padding: 0;
      }
    }
  }

  &:after {
    content: "";
    background: #c0a7772b;
    width: 100%;
    height: 100%;
    position: absolute;
    right: -55vw;

    @media ${device.tablet} {
      background: transparent;
    }
  }

  background: #fff6f6;
  @media ${device.tablet} {
    background: #b39a6a !important;
  }
  h2 {
    width: max-content;
    text-transform: capitalize;
    z-index: 100;

    @media ${device.laptopM} {
      margin-bottom: 2rem;
    }
  }
  p {
    bottom: 0;
  }

  .image-thumb {
    width: 300px;
    justify-self: flex-end;
    display: flex;
    z-index: 100;
    min-height: 300px;

    @media ${device.mobileXL} {
      display: none;
    }
  }

  @media ${device.laptop} {
    .right-section {
      display: none;
    }

    .right-section .image-thumb {
      min-height: unset;
    }

    .right-section img {
      display: none;
    }
  }

  .slider-list {
    height: fit-content !important;
  }

  //
`;

const Spa = ({ spa, className }) => {
  const size = useWindowSize();

  useEffect(() => {
    const { width } = size;
  }, [size]);

  return (
    <SpaStyles className={className}>
      <div className="container">
        <div className="left-section">
          <div className="image-web">
            {spa.imageWeb && spa.imageWeb.asset && (
              <Image {...spa.imageWeb} alt={spa.imageWeb.alt} />
            )}
          </div>
          <p>{spa.description}</p>
        </div>
        <div className="right-section">
          <h2 className="spaname">{spa.name}</h2>
          <div className="image-thumb">
            {spa.imageThumb && spa.imageThumb.asset && (
              <Image {...spa.imageThumb} alt={spa.imageThumb.alt} />
            )}
          </div>
        </div>
      </div>
    </SpaStyles>
  );
};

export default Spa;
