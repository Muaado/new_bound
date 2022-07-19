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
      /* z-index:; */
      fill: white;
      stroke: white;
      stroke-width: 2px;
    }
  }
  ul {
    list-style: none;
  }

  &.blur-bg {
    background: rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    transform: matrix(1, 0, 0, 1, 0, 0);
    height: 8rem;
    opacity: 1;
  }

  &.secondary-nav {
    .container {
      grid-template-columns: 1fr auto auto auto auto auto auto;
      grid-gap: 5rem;
      li {
        font-size: 12px;
        font-weight: 600;
        :not(.page-title) {
          text-align: right;
        }
        text-transform: uppercase;
        :hover {
          cursor: pointer;
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
  padding-left: 5rem;
  padding-right: 5rem;
  display: grid;

  justify-content: center;
  align-items: center;
`;
