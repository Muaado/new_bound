import styled from "styled-components";
import { device } from "../../styles/deviceSizes";

// .parallax-wrapper {
//   height: 100vh;
//   overflow-x: hidden;
//   overflow-y: scroll;
//   perspective: 10px;
// }

// .parallax-content {
//

export const HeroStyles = styled.div`
  text-align: center;
  overflow: hidden;
  color: #fff;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  @media ${device.laptop} {
    height: 80vh;
  }

  @media ${device.tablet} {
    height: 60vh !important;
  }

  &:before {
    content: "";
    position: absolute;
    opacity: 0.3;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: #000;

    @media ${device.laptop} {
      height: inherit;
    }
  }
  h1 {
    text-transform: uppercase;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 1rem;
    font-size: 5rem;
    color: #fff;

    @media ${device.laptop} {
      font-size: 3rem;
      padding: 0 2rem;
      letter-spacing: 0.1rem;
      bottom: 10%;
    }
  }
  p {
  }

  .video {
    height: inherit;
    div {
      height: inherit;
    }
  }

  video {
    height: 100%;
    width: 100vw;
    object-fit: fill;

    @media ${device.laptop} {
      width: 120%;
      position: relative;
      left: -10%;
    }
  }
`;

export const HandCraftedJourneysStyles = styled.div`
  h2,
  p {
    text-align: center;
  }
  .header-text {
    display: flex;
    margin: 7rem 0rem 5rem 0;
    align-items: center;
    flex-direction: column;
    @media ${device.onlyMobileSm} {
      margin: 5rem 0rem 0rem 0;
    }
  }

  h2 {
    text-transform: lowercase;
    max-width: 50rem;
    text-align: center;
    letter-spacing: 1rem;

    @media ${device.tablet} {
      letter-spacing: unset;
    }
  }

  .subtitle {
    text-transform: uppercase;
    color: var(--primary);
  }

  .description {
    margin: 3rem 0 10rem 0;
    font-size: 1.6rem;
    /* max-width: 55rem; */
    color: #505050;
    line-height: 3rem;
  }

  ul {
    margin-bottom: 7rem;
    /* display: flex;
    justify-content: space-between; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;

    @media ${device.tablet} {
      grid-template-columns: 1fr;
    }

    .image-container {
      width: 100%;
    }
    text-align: center;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h3 {
      margin-top: 3rem;
      margin-bottom: 1.5rem;
      font-size: 2.4rem;
      font-weight: bold;
      color: #000;
      text-transform: unset;
    }
    p {
      max-width: 55rem;
      text-align: center;
      color: #505050;
      line-height: 3rem;
    }
  }

  .btn {
    text-transform: capitalize;
  }

  .image-container {
    width: 100%;
    height: 360px;
    overflow: hidden;
    background: #ccc;
    margin: 10px;
    text-align: center;
    line-height: 150px;
    padding: 0;
    margin: 0;
  }
  .image-container img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .parallax-main-wrapper {
    position: relative;
    z-index: 1;
    padding: 0 15% 10rem 15%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .text-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      h3,
      p {
        text-align: left;
        @media ${device.onlyMobileSm} {
          text-align: justify;
        }
      }
    }

    @media ${device.laptop} {
      padding: 10rem 10%;
    }
    @media ${device.onlyMobileS} {
      padding: 0 1.5rem 5rem 1.5rem;
    }
  }

  .parrallax-inner-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5%;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
  }
`;

export const MagazineStyles = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 15% 5rem 15%;
  z-index: 1;
  @media ${device.laptopL} {
    padding: 0 15%;
  }
  @media ${device.laptopM} {
    padding: 0 10%;
  }

  @media ${device.tablet} {
    padding: 0 1.5rem;
  }

  h2,
  .subtitle {
    text-align: center;
  }
  .subtitle {
    font-size: 2.4rem;
    text-transform: uppercase;
    color: var(--primary);
  }
  ul {
    margin-bottom: 7rem;
    /* display: flex;
    justify-content: space-between; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;

    @media ${device.tablet} {
      grid-template-columns: 1fr;
      text-align: left;
    }

    a {
      display: flex;
      flex-direction: column;
    }

    .image-container {
      width: 100%;
      height: 360px;
      overflow: hidden;
      background: #ccc;
      margin: 10px;
      text-align: center;
      line-height: 150px;
      padding: 0;
      margin: 0;
    }
    .image-container img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }

    h3 {
      margin-top: 3rem;
      margin-bottom: 1.5rem;
      font-size: 2.4rem;
      font-weight: bold;
      color: #000;
      text-transform: unset;
    }
    p {
      @media ${device.tablet} {
        align-self: center;
      }
      @media ${device.onlyMobileSm} {
        text-align: justify;
      }
    }
  }

  a {
    align-self: center;
  }

  .btn {
    padding: 1.5rem 4rem;
    align-self: center;
    width: fit-content;
    text-transform: capitalize;
  }
  .content {
    padding: 0 0% 10rem 0%;
    .header {
      margin: 7rem 0rem 5rem 0rem;
    }
    @media ${device.onlyMobileSm} {
      padding: 0 0% 5rem 0%;
      .header {
        margin: 5rem 0rem 5rem 0rem;
      }
    }
  }
`;
