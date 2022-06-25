import styled from "styled-components";
import { device } from "../styles/deviceSizes";
const ResortStyles = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  /* overflow-y: auto;
  overscroll-behavior-y: contain;
  scroll-snap-type: y proximity; */
  overflow: hidden;
  h2 {
    letter-spacing: 1rem;
    text-align: center;
    margin-bottom: 7rem;
    font-size: 35px;
    @media ${device.tablet} {
      letter-spacing: normal;
    }
  }

  #overview {
    @media ${device.tablet} {
      margin: 5rem 0;
    }
  }

  /* .left-nav {
   
  } */

  .resort {
    &__image {
      position: relative;
      /* scroll-snap-align: center; */
      height: 95vh;
      overflow-y: hidden;
      /* position: relative;
      top: -18rem; */
      z-index: -1;

      .mouse_scroll {
        left: 90% !important;
      }

      transition: 1s all;
      opacity: 1;

      @media ${device.laptop} {
        height: 80vh;
      }
      @media ${device.tablet} {
        height: 65vh;
      }
      /* img {
        object-position: bottom;
      } */
      .text {
        position: absolute;
        bottom: 2rem;
        left: 10%;

        @media ${device.tablet} {
          bottom: 0;
        }

        .title_res {
          @media ${device.mobileXL} {
            width: 380px;
            font-size: 2rem;
            left: 0;
            padding-bottom: 10px;
          }

          @media ${device.tablet} {
            width: 100%;
          }
          width: 900px;
          text-wrap: pre-wrap;

          font-weight: normal;
          text-transform: uppercase;
          color: #fff;
          font-size: 4.6rem;
        }

        .atoll_title {
          color: #e7e7e7;
          font-size: 1.5rem;
          letter-spacing: 0.1rem;
        }
      }
    }

    /* &__amenties {
  
    } */

    &__highlights {
    }

    /* &__accomodation {
     
    } */

    &__restaurants {
      margin-top: 10rem;
      margin-bottom: 10rem;
      padding: 0 15%;

      display: flex;
      flex-direction: column;
      max-width: 100vw;

      @media ${device.tablet} {
        margin-top: 0;
        margin-bottom: 8rem;
        padding: 0 1.5rem;
      }
      p {
        font-size: 1.4rem;
      }

      &__header {
        position: absolute;
        width: 40rem;

        @media ${device.laptop} {
          position: unset;
          width: unset;
          text-align: center;

          display: flex;
          flex-direction: column;
          margin-bottom: 5rem;
        }

        h2 {
          color: var(--primary);
          font-weight: bold;
          /* font-size: 7.2rem; */
          width: 30rem;
          line-height: 1;
          padding-bottom: 2rem;

          border-bottom: 2px solid var(--primary);
          margin-bottom: 2rem;
          text-align: left;

          @media ${device.laptop} {
            text-align: center;
            align-self: center;
          }

          @media ${device.tablet} {
            width: 100%;
          }
        }
      }
      ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 20rem;

        position: relative;

        @media ${device.laptop} {
          grid-template-columns: 1fr;
          align-items: center;
        }

        li {
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          position: relative;

          @media ${device.laptop} {
            max-height: unset;
            flex-direction: row;
            margin-bottom: 3rem;
          }

          @media ${device.tablet} {
            max-height: unset !important;
            flex-direction: column;
            &:not(:last-of-type) {
              margin-bottom: 6rem;
            }
          }

          .image-container {
            height: 60rem;
            width: 100%;
            /* margin-bottom: 5rem; */
            @media ${device.laptop} {
              max-height: 50rem;
              overflow: hidden;
              margin-right: 2rem;
            }
            @media ${device.tablet} {
              max-height: unset;
              height: 28rem;
              margin-right: 0;

              img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                object-position: top;
              }
            }

            /* @media ${device.ta} {
              max-height: unset;
            } */
          }
          img {
            height: 80%;
            object-position: top;

            @media ${device.laptop} {
              height: unset;
            }
            @media ${device.laptop} {
              height: 100%;
            }
          }
          &:nth-of-type(odd) {
            margin-top: 20rem;
          }
          &:nth-of-type(even) {
            top: -15rem;
          }
          &:nth-of-type(1) {
            margin-top: 30rem;
          }
          &:nth-of-type(2) {
            top: 0;
          }

          @media ${device.laptop} {
            margin-top: unset !important;
            top: unset !important;
            max-height: unset;
            max-height: 50vh;
          }
        }
      }

      &__text {
        margin-top: -6rem;
        align-self: center;
        max-width: 25rem;

        /* height: 35vh; */
        /* white-space: normal !important; */
        /* overflow-wrap: break-word !important;
        overflow: hidden;
        text-overflow: ellipsis; */

        display: flex;
        flex-direction: column;

        @media ${device.laptopL} {
          margin-top: -6rem;
        }

        @media ${device.tablet} {
          margin-top: 3rem;
          max-width: unset;
        }
        .name {
          font-size: 2rem;
        }
        .alternate-name {
          font-size: 1.6rem;
          font-weight: 100;
          margin-bottom: 2rem;
          color: #505050;
          text-transform: capitalize;
          letter-spacing: 0.3rem;
        }
      }

      .btn {
        align-self: center;
      }
    }
    /* &__gallery {
     
    } */

    &__spas {
      /* height: 120rem; */

      h2 {
        text-transform: capitalize;
      }
    }

    &__activities {
      // .slider {
      //   /* height: 70rem; */
      // }

      .slider-control-bottomcenter {
        position: absolute;
        bottom: -3rem !important;

        .paging-item {
          display: none !important;
          /* height: fit-content !important; */
        }
      }
    }

    .slider-slide {
      min-height: 100vh !important;
      width: 100% !important;
    }

    &__second-image {
      max-height: 80vh;
      overflow: hidden;
      margin-bottom: 10rem;
      /* margin-bottom: 10rem; */
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__faq {
      &:nth-of-type(odd) {
        background: #faf7f7;
      }
    }
  }
`;
export default ResortStyles;
