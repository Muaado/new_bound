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
    height: 8rem;
    opacity: 1;
  }

  &.secondary-nav {
    .container {
      grid-template-columns: 1fr 1fr;
      li {
        font-size: 12px;
        font-weight: 500;
        color: #fff;
        letter-spacing: 0.16667em;
        text-decoration: none;
        transition: opacity 0.4s;
        font-family: "Riviera Nights", "Gill Alt One MT", Helvetica, Arial,
          -apple-system, sans-serif;
        :not(.page-title) {
          text-align: right;
          align-self: center;
          margin-left: 25px;
        }

        &.page-title {
          display: flex;
          align-items: center;
          .text {
            margin-left: 10px;
          }

          svg {
            filter: brightness(0.5) invert(1);
            transform: rotate(0);
            transition: all 0.4s ease-in-out;
          }
        }
        &.rotate {
          svg {
            margin-top: -1px;
            transform: rotate(180deg);
            height: 15px;
            width: 15px;
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
          margin-left: 25px;
        }
        &.active {
          top: 1px;
          ::after {
            display: block;
            width: 100%;
            height: 2px;
            background-color: #fff;
            content: "";
            position: relative;
            top: 20px;
            pointer-events: none;
          }
        }
      }
      .bottom-links {
        display: flex;
        justify-content: flex-end;
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

export const Container = styled.div`
  height: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10rem;
  padding-right: 10rem;
  display: grid;

  justify-content: center;
  align-items: center;
`;

export const SecondaryNavBarWrapper = styled.div`
  position: relative;
  background: white;
  height: 0rem;
  transition: all 0.4s, height 0.4s;
  .container {
    display: flex !important;
    justify-content: flex-start !important;
    > li {
      color: #222 !important;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: unset;
      margin-right: 50px;
      .list-icon {
        margin-right: 5px;
        svg {
          height: 15px;
          width: 15px;
          transform: rotate(0);
          transition: all 0.4s ease-in-out;
        }
      }
      &.active {
        ::after {
          background-color: #222 !important;
        }
      }
    }
  }

  li {
    display: flex;
    color: black;
  }
  .second-nav-border-bottom {
    border-bottom: 1px solid #222;
  }
`;
