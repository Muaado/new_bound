import styled from "styled-components";
import { device } from "../../styles/deviceSizes";

export const JourneyStyles = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  z-index: 1;
  text-align: center;
  position: relative;
  padding: 0% 15% 5% 15%;
  width: 100%;
  background: white;
  @media ${device.laptopL} {
    padding: 0 15% 5rem 15%;
  }
  @media ${device.laptop} {
    padding: 0 10% 5rem 10%;
  }

  @media ${device.tablet} {
    padding: 0 1.5rem 5rem 1.5rem;
  }

  @media ${device.mobileXL} {
    padding: 0;
  }

  h2 {
    margin: 10rem 0 5rem 0;
    @media ${device.onlyMobileSm} {
      margin: 5rem 0 0 0;
    }
  }

  h1 {
    letter-spacing: 2rem;
    line-height: 5rem;
    color: var(--primary);
    margin-bottom: 1rem;

    @media ${device.laptop} {
      font-size: 5rem;
    }

    @media ${device.tablet} {
      font-size: 3.6rem;
      letter-spacing: unset;
      line-height: 5rem;
    }
  }

  .header {
    align-self: center;
    display: flex;
    align-items: center;

    @media ${device.tablet} {
      display: none;
    }

    li {
      padding: 0 2rem;
      text-transform: uppercase;
      &:not(:last-of-type) {
        border-right: 1px solid #000;
      }
    }
  }

  .images {
    margin: 5rem 0rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    @media ${device.onlyMobileSm} {
      grid-template-columns: 1fr;
      padding: 0 1.5rem;
    }

    .clickable {
      position: relative;
      height: 35rem;
      z-index: 1;
      grid-column: 1 / span;
      &:first-of-type {
        grid-column: 1/4;
      }
      &:nth-of-type(2) {
        grid-column: 4/8;
      }

      &:nth-of-type(3) {
        grid-column: 1/3;
      }
      &:nth-of-type(4) {
        grid-column: 3/5;
      }
      &:nth-of-type(5) {
        grid-column: 5/8;
      }

      &:hover {
        .overlay {
          opacity: 0.5;
          z-index: 2;
        }

        .card-text-wrapper {
          transition: all 0.3s;
          opacity: 1;
          z-index: 999;
        }
      }
      @media ${device.onlyMobileSm} {
        grid-column: 1 !important;
        height: 30rem !important;
      }
    }
  }

  .carousel {
    margin: 4rem 0rem 10rem;
    .slider-slide,
    .slider-list {
      @media ${device.tablet} {
        height: 35rem !important;
      }
      @media ${device.mobileXL} {
        height: 25rem !important;
      }
    }

    .slider-control-bottomcenter {
      bottom: -5rem !important;
    }
    &__image-container {
      @media ${device.tablet} {
        height: 35rem !important;
      }
      @media ${device.mobileXL} {
        height: 25rem !important;
      }

      img {
        object-position: center;
        // width:10%;
      }
    }
  }
`;
