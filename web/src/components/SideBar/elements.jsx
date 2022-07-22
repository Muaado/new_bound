import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
export const LeftSideBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: #fff;
  color: #000;
  text-transform: capitalize;
  transition: all 0.4s;
  transition-timing-function: ease-in-out;
  overflow-x: hidden !important;
  display: flex;
  z-index: 2;
  height: 0px;

  @media ${device.tablet} {
    top: 10rem;

    &.collections {
      top: 16rem;
    }
  }

  &.show {
    height: 102vh;
    z-index: 200000;

    @media ${device.tablet} {
      overflow-x: hidden !important;
      height: 102vh;
    }

    .route {
      transition: none;
    }
  }

  .image-container img {
    transition: all 4s;
    min-height: 100vh;
  }

  ul {
    min-width: 25vw;

    @media ${device.tablet} {
      min-width: 50vw;
      direction: ltr;
      padding: 0 3rem !important;
    }
  }

  .image-container {
    @media ${device.tablet} {
      display: none;
    }
  }

  .first-column {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    @media ${device.tablet} {
      display: none;
    }
    li {
      padding: 1.5rem;
      position: relative;
      width: fit-content;

      &.selected {
        &:after {
          content: "";
          background: var(--grey);
          width: calc(100% - 3rem);
          height: 1px;
          position: absolute;
          bottom: 1.2rem;
          left: 1.5rem;
        }
      }
      :hover {
        font-weight: 600 !important;
      }
    }
  }

  .second-column {
    background: #f8f8f8;
    padding: 4rem 4rem 10rem 4rem;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    position: relative;

    @media ${device.tablet} {
      background: #fff;
      padding: 0;
    }

    .mouse_scroll {
      position: absolute;
      right: 4rem;
      left: unset !important;
      bottom: 8rem;
    }
    height: 100%;
    @media ${device.tablet} {
      grid-template-columns: 1fr;
      width: 100vw;
      overflow-x: hidden;
    }
    a {
      border-bottom: 1px solid rgba(179, 154, 106, 0.2) !important;
      padding-bottom: 10px;
      :hover {
        font-weight: 600 !important;
      }
    }
  }

  a {
    font-family: "rivera_ultra_light_regular", sans-serif;
    font-size: 1.6rem;
    padding-top: 20px;
    font-weight: bolder;

    @media ${device.tablet} {
      border-bottom: 1px solid var(--lightGrey3);
    }
  }

  .dropdown-close-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 5rem;
    height: 5rem;
    background: #fff;
    padding: 1.5rem;
    border: 1px solid #eeee;
    opacity: 0.7;

    @media ${device.tablet} {
      display: none;
    }
    g {
      fill: #000;
    }
  }

  a:hover,
  a:focus,
  a:active {
    outline: none !important;
    text-decoration: none !important;
    font-weight: 600 !important;
  }

  li:hover li:focus,
  li:active {
    outline: none !important;
    text-decoration: none !important;
    font-weight: 600 !important;
  }
`;
