import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
export const NavWrapper = styled.nav`
  position: ${({ bottomNav }) => (bottomNav ? "relative" : "fixed")};
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  z-index: 2;
  .container {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    @media ${device.onlyMobileS} {
      margin: 0 1.5rem !important;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .hamburger-wrapper {
    width: 100%;
    cursor: pointer;
    svg {
      width: 2rem;
      fill: white;
      stroke: white;
      stroke-width: 2px;
    }
  }
  ul {
    list-style: none;
  }

  &.blur-bg {
    backdrop-filter: blur(20px);
    background-color: rgba(21, 21, 21, 0.3);
    -webkit-backdrop-filter: blur(20px);
    transform: matrix(1, 0, 0, 1, 0, 0);
    height: 6rem;
    opacity: 1;
  }

  &.secondary-nav {
    .container {
      grid-template-columns: 1fr 1.5fr;
      &.full-column {
        grid-template-columns: 1fr 3fr;
        @media ${device.onlyMobileSm} {
          display: flex;
          justify-content: flex-start;
        }
        .hasDropDown {
          position: relative;
          display: flex;
          align-items: center;
          svg {
            margin-left: 4px;
            margin-top: -1px !important;
            height: 14px !important;
            width: 14px !important;
          }
        }
      }

      .bottom-links {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        li:not(.vertical-divider) {
          .text {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }

  .divider {
    height: 1px;
    border-top: 1px solid;
    grid-row: 2;
    grid-column: span 5;
  }
`;

export const LogoWrapper = styled.div`
  width: 100%;
  transition: all 1s ease-in 0s;
  z-index: 2;
  @media ${device.onlyMobileSm} {
    font-size: 1.2rem;
  }
  cursor: pointer;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media ${device.tablet} {
      border: none;
      padding: 0;
      width: fit-content;
    }

    a {
      width: 60px;
      height: 60px;
      img {
        object-fit: contain;
      }
    }
  }

  .logo img {
    max-width: 100%;
    height: 100%;
    position: relative;
  }
`;

export const SecondaryNavBarWrapper = styled.div`
  position: relative;
  background: white;
  height: 0rem;
  transition: all 0.4s, height 0.4s;
  &.black-bg {
    .text,
    .page-title {
      color: white !important;
    }
    svg {
      filter: brightness(0.5) invert(1);
    }
  }

  box-shadow: 0 5px 4px -5px #222;
  .container {
    display: flex !important;
    justify-content: flex-start !important;
    @media ${device.onlyMobileSm} {
      margin: 0rem 1.5rem !important;
      flex-direction: column;
      li {
        display: flex !important;
        align-self: flex-start !important;
        margin-bottom: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--lightGrey);
        width: 100%;
        font-weight: bold;
      }
    }

    li {
      &.image-wrapper {
        width: 100%;
        height: 100%;
      }
      color: #222 !important;
      transition: all 0.4s, height 0.4s;
      display: flex;
      align-items: center;
      justify-content: flex-start !important;
      margin-left: unset !important;
      margin-right: 25px;
      .list-icon {
        margin-right: 5px;
        svg {
          margin-top: -2px;
          height: 12px !important;
          width: 12px !important;
          transform: rotate(0);
          transition: all 0.4s ease-in-out;
        }
      }
      &.active {
        ::after {
          background-color: #222 !important;
        }
      }
      &.rotate {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }

  .second-nav-border-bottom {
    border-bottom: 1px solid #222;
  }
`;

export const DropDownWrapper = styled.div`
  position: absolute;
  top: 3.5rem;
  background-color: #f1f1f1;
  transition: height 0.4s ease-in-out;
  width: 100%;
  min-width: 300px;
  left: 0;
  max-height: 400px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--grey);
    height: 2px;
  }

  .item {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    padding-top: 20px;
    text-align: left;
    font-weight: 400;
    border-bottom: 1px solid rgba(179, 154, 106, 0.2);
    @media ${device.tablet} {
      border-bottom: 1px solid var(--lightGrey3);
    }
    padding-bottom: 10px;
    :hover {
      font-weight: 600 !important;
    }
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .inner-wrapper {
    position: relative;
    height: 90%;
    width: 100%;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
  .content {
    position: absolute;
    z-index: 2;
    color: white;
    text-align: center;
  }
`;

export const StyledList = styled.li`
  position: relative;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  letter-spacing: 0.16667em;
  text-decoration: none;
  transition: opacity 0.4s;
  font-family: "Riviera Nights", "Gill Alt One MT", Helvetica, Arial,
    -apple-system, sans-serif;
  :not(.page-title, .divider, .hamburger-wrapper) {
    align-self: center;
    margin-left: 20px;
  }

  &.page-title {
    display: flex;
    align-items: center;
    .text {
      margin-left: 10px;
    }

    svg {
      margin-top: -4px;
      filter: brightness(0.5) invert(1);
      transform: rotate(0);
      transition: all 0.4s ease-in-out;
    }
    .list-icon {
      @media ${device.onlyMobileSm} {
        margin-left: -7px !important;
      }
    }
  }
  &.rotate {
    svg {
      transform: rotate(180deg);
    }
  }
  text-transform: uppercase;
  :hover {
    cursor: pointer;
  }
  .vertical-divider {
    display: flex;
    align-items: center;
    top: -1px;
    position: relative;
  }
  &.active {
    @media ${device.onlyMobileSm} {
      ::after {
        content: none !important;
      }
    }
    top: 1px;
    ::after {
      display: block;
      width: 100%;
      height: 4px;
      background-color: #fff;
      content: "";
      position: relative;
      top: 20px;
      pointer-events: none;
    }
  }
`;
