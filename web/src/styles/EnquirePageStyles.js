import styled from "styled-components";
import { device } from "./deviceSizes";
export const EnquirePageStyles = styled.div`
  /* margin: 5rem 0; */
  width: 100%;
  height: 100%;

  form {
    background: white;
    width: 100%;
    padding: 10rem 5rem;
    height: 100%;
    color: black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    h2 {
      color: #000000;
      font-size: 30px;
      letter-spacing: 5px;
      font-weight: bold;
      text-transform: capitalize;
      text-align: center;
    }

    @media ${device.tablet} {
      flex-direction: column;
      /* margin: 1rem 0; */
    }

    & > div {
      padding: 3rem;
      display: flex;
      flex-direction: column;
      /* &:first-of-type {
        border-right: 1px solid #fff;
      } */
    }
    .room-villa-section {
      display: flex;
      justify-content: center;
      align-content: center;

      .header-content,
      .footer-content {
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
          svg {
            width: 3rem;
            height: 3rem;
          }
        }
      }
      .footer-content {
        align-self: center;
        margin-top: 5rem;
        width: 100%;
        max-height: 300px;
      }
    }
    .holidays-details-section,
    .yours-details-section {
      background: #f5f5f5;
      .two-column {
        display: grid;
        grid-template-columns: 48% 48%;
        gap: 4%;
        label {
          text-transform: uppercase;
          color: #3d3d3d;
          font-size: 1.6rem;
          font-weight: 400;
          margin-bottom: 1.4rem;
        }
      }

      .three-column {
        display: grid;
        grid-template-columns: 48% 1fr 1fr;
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
      font-size: 1.6rem;
      font-weight: 400;
      margin-bottom: 1.4rem;
    }

    input,
    select {
      width: 100%;
      padding: 1rem 1.5rem;
    }
    textarea {
      height: 15rem;
    }

    span.required {
      color: var(--red);
    }
  }
`;
