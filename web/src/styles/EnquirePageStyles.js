import styled from "styled-components";
import { device } from "./deviceSizes";
export const EnquirePageStyles = styled.div`
  /* margin: 5rem 0; */
  background: white;
  width: 100%;
  height: 100%;

  .content {
    background: white;
    width: 100%;
    padding: 10rem 5rem;
    height: 100%;
    color: black;
    display: grid;
    grid-template-columns: 1fr 2fr;

    @media ${device.onlyMobileS} {
      grid-template-columns: 1fr;
      padding: 10rem 0rem;
      .submit-btn {
        align-self: center;
      }
    }
    .main-div {
      padding: 3rem;
      display: flex;
      flex-direction: column;
    }

    h2 {
      color: #000000;
      font-size: 30px;
      letter-spacing: 5px;
      font-weight: bold;
      text-transform: capitalize;
      text-align: center;
    }

    .go-back-button {
      margin: 0;
      display: flex;
      justify-content: center;
    }

    .room-villa-section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      height: 100%;
      margin-top: 5rem;
      .header-content,
      .footer-content {
        height: 50%;
        width: 100%;
        .carousel {
          img {
            height: 40vh;
            width: 100%;
          }
        }
      }

      .header-content {
        display: flex;
        flex-direction: column;
        .villa-name {
          text-align: center;
          color: #000000;
          font-weight: 300;
          margin: 16px;
          align-self: center;
        }
        .resort-name {
          font-size: 22px;
          text-align: center;
          align-self: center;
        }

        .divider {
          align-self: center;
          border-bottom: 2px solid #ababab;
          margin-bottom: 1rem;
          width: 20%;
        }
        .villa-features {
          display: flex;
          margin: 2rem 20% 0% 20%;
          justify-content: space-between;
          font-size: 12px;
          svg {
            width: 3rem;
            height: 3rem;
          }

          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .icon-label {
            margin-top: 1rem;
          }
        }
        @media ${device.onlyMobileS} {
          margin-top: 5rem;
        }
      }
      .footer-content {
        align-self: center;
        margin-top: 5rem;
        width: 100%;
        height: 100%;
        max-height: 300px;
      }
    }
  }

  form {
    width: 100%;
    height: 100%;
    color: black;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media ${device.onlyMobileS} {
      grid-template-columns: 1fr;
    }
    @media ${device.tablet} {
      flex-direction: column;
      /* margin: 1rem 0; */
    }

    .holidays-details-section,
    .yours-details-section {
      background: #f5f5f5;
      .two-column {
        display: grid;
        grid-template-columns: 48% 48%;
        @media ${device.onlyMobile} {
          grid-template-columns: 1fr;
        }
        gap: 4%;
        label {
          text-transform: uppercase;
          color: #3d3d3d;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
      }

      .three-column {
        display: grid;
        grid-template-columns: 48% 1fr 1fr;
        @media ${device.onlyMobile} {
          grid-template-columns: 1fr;
        }

        gap: 4%;
        .phone {
          display: flex;

          select {
            width: 10rem;
            margin-right: 1rem;
          }
        }
      }

      .four-column {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        @media ${device.onlyMobile} {
          grid-template-columns: 1fr;
        }
        gap: 4%;
      }
    }

    .holidays-details-section {
      border-right: 2px solid white;
      .form-content {
        margin-top: 5rem;
      }
    }
    .yours-details-section {
      .form-content {
        margin-top: 5rem;
      }
    }
    .form-control {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 2rem;

      @media ${device.tablet} {
        width: 100%;
        /* margin: 1rem 0; */
      }
    }

    /* & */

    label {
      text-transform: uppercase;
      color: #3d3d3d;
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    input,
    select {
      -webkit-appearance: none;
      width: 100%;
      padding: 1rem 1.5rem;
    }
    textarea {
      -webkit-appearance: none;
      height: 15rem;
    }

    span.required {
      color: var(--red);
    }
    .react-tel-input {
      .form-control {
        border-radius: unset;
        line-height: unset;
        border-color: rgb(118, 118, 118);
        height: unset;
        padding-top: 0.9rem;
        padding-bottom: 0.9rem;
      }
      .flag-dropdown {
        border: 1px solid rgb(118, 118, 118);
      }
    }
  }
`;
