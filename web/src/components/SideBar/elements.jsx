import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
export const LeftSideBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100vh;
  background: #fff;
  color: #000;
  text-transform: capitalize;
  transition: width 1s;
  overflow-x: hidden !important;
  display: flex;
  z-index: 2;

  &.show {
    z-index: 1;
    height: 100vh;
    @media ${device.tablet} {
      overflow-x: hidden !important;
    }
  }

  .image-container img {
    transition: width 4s;
    min-height: 100vh;
  }

  ul {
    min-width: 25vw;

    @media ${device.tablet} {
      min-width: 50vw;
      direction: ltr;
      /* padding: 0 3rem !important; */
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
    /* @media ${device.tablet} {
      display: none;
    } */
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
    overflow-y: auto;
    position: relative;

    @media ${device.tablet} {
      background: #fff;
      padding: unset !important;
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
      width: 100%;
      overflow-x: hidden;
    }

    li.route {
      font-family: "rivera_ultra_light_regular", sans-serif;
      font-size: 1.6rem;
      padding-top: 20px;
      border-bottom: 1px solid rgba(179, 154, 106, 0.2) !important;
      @media ${device.tablet} {
        border-bottom: 1px solid var(--lightGrey3);
      }
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

export const MobileDivWrapper = styled.div`
  z-index: 1;
  padding: 0 3rem;
  background: #fff;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  text-align: center;
  padding-top: 5rem;
  transition: width 1s;
  .close-icon {
    display: none;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 2rem;
    height: 2rem;

    path {
      fill: #000;
      stroke: #000;
    }

    @media ${device.tablet} {
      display: unset;
      padding: 0;
    }
  }

  ul {
    color: #000;
    text-align: left;
    width: 100%;
    li {
      overflow: hidden;
      margin-bottom: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--lightGrey);
      width: 100%;
      font-weight: bold;
      font-size: 2rem !important;
      a {
        font-family: "rivera_ultra_light_regular", sans-serif !important;
        border-bottom: unset;
      }
      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &a {
          font-weight: bold !important;
          font-size: 2rem !important;
        }
      }
      svg {
        width: 1.5rem;
        height: 1.5rem;
        path {
          fill: var(--primary);
        }
      }
    }
  }
`;
