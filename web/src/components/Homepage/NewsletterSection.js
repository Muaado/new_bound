import React from "react";
import Image from "gatsby-plugin-sanity-image";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
import { Overlay } from "../../components";
export const NewsLetterStyles = styled.div`
  position: relative;
  /* height: 70rem; */
  color: #fff;

  /* perspective: 8px;
  perspective-origin: 50%; */

  display: flex;
  flex-direction: column;
  width: 100vw;

  @media ${device.laptopL} {
    height: 50rem;
  }

  @media ${device.tablet} {
    height: 50rem;
    margin-bottom: 5rem;
  }

  h2 {
    position: absolute;
    top: 20%;
    right: 15%;
    color: #fff;
    /* font-size: 4rem; */
    font-weight: bold;
    text-transform: capitalize;
    text-align: center;
    @media ${device.tablet} {
      /* width: 100%; */
      /* position: relative; */
      right: unset;
      text-align: center;
      align-self: center;
    }
  }

  .container {
    display: flex;
    width: 50%;

    padding: 2rem;
    @media ${device.tablet} {
      width: 90vw;
    }
    input {
      width: 100%;
      padding: 1rem;
    }
    .btn {
      /* background: var(--primary); */
      @media ${device.laptopM} {
        padding: 1.2rem 2rem;
      }
    }
  }

  form {
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem 4rem;

    background: rgba(0, 0, 0, 0.45);
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.tabletL} {
      padding: 1.2rem 2rem;
      width: 100vw;
    }
    @media ${device.tablet} {
      width: 100vw;

      flex-direction: column;
      padding: 2rem 0;
    }

    @media ${device.mobileXL} {
      width: 100vw;
      bottom: -15%;
    }
    h3 {
      z-index: 100;
      font-style: italic;
      position: unset;
      font-size: 3.2rem;
      font-weight: normal;
      width: max-content;
      color: #fff;
      padding: 0 2rem;

      @media ${device.laptopM} {
        font-size: 2.4rem;
      }
      @media ${device.tablet} {
        /* margin-bottom: 1rem; */
        width: unset;
        text-align: center;
        padding: 2rem;
      }
      /* margin-right: 20rem; */
    }
  }
`;

const NewsletterSection = ({ site }) => {
  return (
    <NewsLetterStyles>
      {site.newsLetterBackground && site.newsLetterBackground.asset && (
        <Image
          {...site.newsLetterBackground}
          alt={site.newsLetterBackground?.alt}
        />
      )}
    </NewsLetterStyles>
  );
};

export default NewsletterSection;
