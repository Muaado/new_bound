import styled from "styled-components";
import { device } from "../styles/deviceSizes";
import "../styles/typography.css";

const VillaStyles = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;
  width: 100%;
  h1 {
    @media ${device.tablet} {
      letter-spacing: unset;
    }
  }
  .villa__property-overview,
  .accordion,
  .resort__highlights,
  #dine {
    h2 {
      letter-spacing: 16px;
    }
  }
  .villa__property-overview {
    h2 {
      margin-top: 7rem;
    }
  }
  .room-price {
    width: 100%;
    text-align: center;
  }
  .backtoreswrapper {
    margin-top: 20px;
    margin-left: 30px;
  }

  .breadcrumb {
    padding: 8px 15px;
    margin-bottom: 20px;
    list-style: none;
    border-radius: 4px;
    ul {
      float: left;
      padding: 0;
      margin: 0;
      li {
        float: left;
        font-size: 12px;
        color: #11103b;
        margin-right: 6px;
        list-style: none;
      }
    }
  }
  .breadcrumb-wrapper {
    position: relative;
    padding-top: 10px;
    padding-left: 30px;
    padding-bottom: 10px;
  }

  .backtoresort {
    color: #76622e8a;
  }

  .backtoresort:hover {
    color: #76622e;
  }

  .backtoresort .room-name:hover {
    cursor: default;
  }

  .roomfeatwrap {
    overflow: hidden;
  }

  .roomfeat svg {
    width: 100%;
  }

  h2 {
    text-align: center;
    font-size: 35px;
  }

  .villa {
    &__image {
      position: relative;
      .image-container {
        max-height: 85vh;
        overflow-y: hidden;
        height: 80vh;
        @media ${device.tabletL} {
          height: 80vh;
        }
        @media ${device.tablet} {
          height: 60vh;
        }
      }

      @media ${device.tabletL} {
        height: 80vh;
      }
      @media ${device.tablet} {
        height: 60vh;
      }

      &-title {
        position: absolute;

        width: 800px;
        font-weight: normal;
        text-transform: uppercase;
        color: #fff;
        font-size: 4rem;
        color: #fff;
        left: 10%;
        bottom: 4.2%;
        z-index: 100;

        @media ${device.mobileXL} {
          width: 380px;
          font-size: 2rem;
          left: 0;
          padding-bottom: 10px;
        }
      }

      @media ${device.tablet} {
        &-title {
          width: 80%;
          left: 10%;
        }
      }

      &-title:hover {
        font-weight: bold;
      }
    }

    &__calendar {
      /* z-index: 100000; */

      z-index: 1000;
      position: absolute;
      bottom: 20%;

      .icon {
        display: flex;
        align-items: center;
        .chevron {
          width: 1.5rem;
          height: 1.5rem;
          margin-left: 1rem;
          path {
            stroke: #000;
          }
        }
      }
      svg {
        width: 3rem;
        height: 3rem;
      }

      ul {
        position: absolute;
        background: #fff;
        padding: 2rem;

        @media ${device.laptopL} {
          right: 0;
        }

        /* transform: translateY(-100%); */
        max-height: 1rem;
        transition: all 0.2s;
        visibility: hidden;
        z-index: -1;
        &.open {
          /* transform: translateY(0); */
          max-height: 50rem;
          visibility: unset;
          z-index: 100;
        }

        &.open {
          li {
            visibility: unset;
            opacity: 1;
          }
        }

        li {
          opacity: 0;
          padding: 0.5rem 1rem;
          width: 20rem;
          display: flex;
          /* justify-content: space-between; */
          /* background: var(--primary); */
          background: rgba(179, 154, 106, 0.3);
          /* color: #fff; */
          margin-bottom: 0.5rem;

          span {
            span {
              margin-right: 0.5rem;
              width: 3rem;
              display: inline-block;
            }
          }

          .per-night {
            font-size: 1.1rem;
            margin-top: 0.5rem;
            margin-left: 0.5rem;
            color: var(--grey);
          }
          /* background-opacity: 0.6; */
        }
      }
    }
    &__header {
      margin: 10rem 0 0 0;
      background: white;
      color: #76622e;
      padding: 5% 0%;
      width: 100%;
      height: 100%;

      @media ${device.laptop} {
        margin-top: 0;
        flex-direction: column;
      }

      #overview-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media ${device.tablet} {
          flex-direction: column;
          .carousel {
            padding: 0 0 10rem 0;
          }
        }

        @media ${device.onlyMobileSm} {
          flex-direction: column;
          .carousel {
            padding: 0 1.5rem 10rem 1.5rem;
          }
        }

        .gallery-carousel {
          position: relative;
          width: 50%;
          margin: 5rem 0px 0rem 0;
          padding: 0rem 1.5rem;
          height: 100%;
          img {
            height: 650px;
            @media ${device.onlyMobileSm} {
              height: 300px;
            }
          }
          @media ${device.onlyMobileS} {
            width: 100%;
          }
          @media ${device.onlyMobileSm} {
            margin-bottom: 5rem;
            padding: 0 0 !important;
          }
        }
      }

      .container {
        /* background: black; */
        position: relative;
        /* height: 100rem; */
        width: 40%;
        margin: 5rem 0px 5rem 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* border: 1px solid var(--primary); */

        .villa_name_title {
          font-family: "river_bold_regular", sans-serif;
          font-size: 30px;
          letter-spacing: 1rem;
          text-align: center;
        }
        @media ${device.laptop} {
          /* display: flex;
          flex-direction: column;
          margin: 0;
          height: fit-content;
          width: 100%;
          align-items: center; */
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        @media ${device.tablet} {
          width: 100%;
          padding: 0 3rem;
          align-items: flex-start;
          justify-content: flex-start;
        }
        @media ${device.mobileXL} {
          /* padding: 0; */
          min-width: unset;
        }

        p {
          /* max-width: 40rem; */
          /* font-size: 2.2rem; */
          text-align: center;
          color: var(--grey1);
          width: 100%;
          @media ${device.mobileXL} {
            text-align: left;
            width: 100%;
          }
          padding-top: 10px;
        }

        .pricelbl {
          color: #76622e;
          font-weight: 700;
        }
      }
      .alternate-name {
        transform: rotate(90deg);
        position: absolute;
        top: 8rem;
        left: 11rem;
        text-transform: uppercase;
        color: #76622e !important;
        // font-family: "Playfair Display";
        font-size: 1.5rem !important;
        letter-spacing: 0.5rem;

        @media ${device.laptopM} {
          transform: unset;
          left: 5rem;
        }
      }

      h2 {
        margin-bottom: 2.5rem;

        font-weight: normal;
        font-size: 35px;
        font-family: "Playfair Display";
        color: #76622e;

        @media ${device.tablet} {
          text-align: left;
        }
      }

      h3 {
        padding: 3rem 0;
        @media ${device.mobileXL} {
          text-align: center;
        }
      }

      .tagline {
        font-family: "autography", cursive;
        font-style: italic;
        font-size: 3rem;
        margin-bottom: 2rem;
      }

      .unique_code_wrap {
        width: 100%;
        margin-bottom: 20px;
        font-size: 12px;
        font-family: "rivera_bold_regular", "sans-serif";
        color: #76622e8a;
        text-orientation: use-glyph-orientation;
        text-align: left;
      }

      &-icons {
        padding: 3rem 0;
        display: flex;
        justify-content: center;
        width: 100%;
        /* align-items: center; */

        @media ${device.tablet} {
          justify-content: flex-start;
        }

        @media ${device.laptop} {
          align-items: center;
          justify-content: center;
        }

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          font-size: 1.1rem;
          &:first-of-type {
            svg {
              margin-top: 1rem;
              width: 3.5rem;
              height: 3.5rem;
            }
          }

          @media ${device.tablet} {
            height: 6rem;
          }

          svg {
            @media ${device.tablet} {
              width: 3rem;
              height: 3rem;
            }
          }

          &:not(:last-of-type) {
            margin-right: 15px;
          }
        }
      }

      .enquire-btn {
        margin-top: 10px;
        width: 100%;
        align-self: center;
        background: transparent;
        display: flex;
        justify-content: center;
      }
    }

    &__room-features {
      position: relative;
      height: 700px;
      .roomfeaturetitle {
        margin: 7rem 0rem 5rem 0rem;
        color: #fff;
        font-size: 35px;
      }
      max-height: 700px !important;
      .content {
        position: absolute;
        width: 100%;
        min-height: 100%;
        z-index: 1;
      }

      .hide {
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .accordion {
        font-family: "rivera_light_regular", sans-serif;
        color: #fff;
        min-height: 350px;
        margin-top: 3rem;

        // border: 1px solid #e0e0e0;
      }

      label {
        // background: rgba(0,0,0,0.5);
        width: 100%;
      }

      .accordion-item {
        padding-left: 15%;
        padding-right: 15%;
        width: 100%;
        @media ${device.onlyMobileSm} {
          padding: 0;
        }
      }

      .accordion-item:last-child {
        border-bottom: none;
      }

      .accordion-label {
        padding: 10px 0 10px 30px;
        width: 100%;
        display: block;
        font-size: 18px;
        position: relative;
        cursor: pointer;
        // background:#76622eb3;
        margin-top: -1px;
        border-bottom: 0.5px solid rgb(255, 255, 255, 0.5);
        @media ${device.onlyMobileSm} {
          font-size: 16px;
        }
      }

      .accordion-label:hover {
        cursor: pointer;
        font-weight: 600;
      }

      .accordion-label:after {
        content: "+";
        height: 1em;
        text-align: center;
        transition: all 0.8s ease;
        display: flex;
        justify-content: space-between;
        font-weight: bolder;
        float: right;
        padding: 10px;
        color: #fff;
        font-size: 20px;
        margin-top: -12px;
        margin-right: 10px;
      }

      input[type="checkbox"]:checked ~ .accordion-label:after {
        // transform: rotate(45deg);
        content: "x";
        transition: all 2s ease;
      }

      .accordion-child {
        font-family: "rivera_light_regular", sans-serif;
        margin: 0;
        scrollbar-width: thin;
        scrollbar-color: var(--primary) var(--primary);
        padding: 1rem;
        overflow-y: auto;
        transition: all 0.3s ease;
        opacity: 0;
        height: 0;
        // transform: scale(1, 0);
        transform-origin: center top;

        @media ${device.onlyMobileSm} {
          font-size: 14px;
        }
      }

      input[type="checkbox"]:checked ~ .accordion-child {
        color: #fff;
        background: rgb(0, 0, 0, 0.3);
        // box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.16);
        padding: 20px;
        height: auto;
        opacity: 0.8;
        // transform: scale(1, 1);
        max-height: 290px;
        // overflow-y:scroll;
        overflow-x: hidden;
        font-family: "rivera_light_regular", sans-serif;
      }
      .feattitle {
        font-family: "rivera_light_regular", sans-serif;
        margin: 0;
        overflow: hidden;
        transition: all 0.3s ease;
        opacity: 0;
        height: 0;
        transform: scale(1, 0);
        transform-origin: center top;
      }

      .accordion-child::-webkit-scrollbar {
        width: 10px;
      }
      .accordion-child::-webkit-scrollbar-track {
        background-color: var(--grey1);
        border-radius: 20px;
      }
      .accordion-child::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: var(--grey);
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }

      .accordion-child ul {
        /* padding-left: 4rem; */

        width: 100%;
        overflow-y: hidden;
        // min-height: 200px; /* approximate max height */
        height: auto;
        max-height: 100%;
        transition-property: all;
        transition-duration: 20s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

        @media ${device.onlyMobileS} {
          display: unset !important;
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 200px;
        }

        li {
          margin-bottom: 0.5rem;
          margin-left: 1rem;
          width: fit-content;
        }
      }

      img {
        height: 700px;
        width: 100%;
        position: absolute;
        z-index: -1;
        object-fit: cover;
      }
    }

    &__highlights {
      margin-top: 7rem;
      background: #fff6f6;
      padding: 15rem 5%;
      display: grid;
      align-items: center;
      grid-template-columns: 35rem 1fr;
      gap: 4rem;
      align-self: center;

      @media ${device.laptopL} {
        grid-template-columns: 1fr;
        padding: 10rem 5%;

        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 100vw;
      }

      /* @media ${device.mobileXL} {
        width: 100vw;
      }
      div {
        width: 100vw;
      } */

      h2 {
        font-size: 2.5rem;
        text-align: left;
        margin-bottom: 5rem;
        letter-spacing: 0.5rem;
        text-transform: capitalize;
      }
      h3 {
        text-transform: unset;
      }
      ul {
        /* height: 80rem; */
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 25rem 25rem 25rem;

        @media ${device.tablet} {
          grid-template-rows: 20rem 20rem 20rem;

          &.desktop-list {
            display: none;
          }
        }
        @media ${device.mobileXL} {
          grid-template-rows: 12rem 12rem 12rem;
          /* max-width: 90vw; */
          align-self: center;
        }
        li {
          position: relative;
          .text {
            display: flex;
            flex-direction: column;
          }
          &:hover {
            transition: all 0.3s;

            .text {
              height: 100%;
              width: 100%;
              transition: all 0.3s;
              opacity: 1;
              color: #fff;
              z-index: 100;
              text-align: center;
              align-items: center;
              justify-content: center;
              padding: 2rem;
            }
            &:after {
              content: "";
              background: #000;
              left: 0;
              top: 0;
              opacity: 0.4;
              width: 100%;
              height: 100%;
              position: absolute;
              z-index: 50;
              /* right: -55vw; */
            }
          }
          &:first-of-type {
            grid-row: 1/3;
          }
          &:nth-of-type(2) {
            grid-row: 1/2;
          }
          &:nth-of-type(3) {
            grid-row: 1/3;
          }
          &:nth-of-type(5) {
            grid-row: 2/4;
          }
          .text {
            opacity: 0;
            position: absolute;
          }
          h3 {
            color: #fff;
            @media ${device.mobileXL} {
              font-size: 1.6rem;
            }
            @media ${device.mobileL} {
              font-size: 1.4rem;
            }
          }
        }
      }

      .carousel {
        .slider-control-bottomcenter {
          bottom: -5rem !important;
        }
        li {
          h3 {
            position: absolute;
            color: #fff;
            top: 50%;
            left: 50%;
            /* width: 100%; */
            transform: translate(-50%, -50%);
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
              0px 4px 4px rgba(0, 0, 0, 0.25);
          }
        }
      }
    }
    &__property-overview {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media ${device.mobileXL} {
        width: 100vw;
      }
      h2 {
        margin: 7rem 0rem 5rem 0 !important;
        @media ${device.onlyMobileSm} {
          margin: 5rem 0rem 5rem 0 !important;
        }
      }
    }

    &__restaurants {
    }

    &__spas {
      /* height: 120rem; */

      h2 {
        text-transform: capitalize;
      }

      .slider {
        height: 70rem;
      }

      .slider-control-bottomcenter {
        position: absolute;
        bottom: -3rem !important;

        .paging-item {
          /* height: fit-content !important; */
          button {
            height: fit-content !important;
            display: flex !important;
            align-items: center;
            svg {
              margin: 0;
            }
          }
        }
      }
    }

    &__resorts {
      margin-top: 5rem;
      margin-bottom: 10rem;
      padding: 10rem 10%;
      background: #b39a6a;
      position: relative;

      @media ${device.tablet} {
        padding: 3rem 1.5rem;
      }

      /* height: fit-content; */
      .title {
        // /* font-family: "Playfair Display"; */
        position: absolute;
        left: 0;
        transform: rotate(-90deg);
        color: #fff;
        font-size: 1.4rem;
        /* position: relative; */

        @media ${device.laptop} {
          transform: unset;
          left: 10%;
          top: 5rem;
        }

        span {
          margin-right: 1rem;
          &.line {
            position: absolute;
            top: 1rem;
            left: 3.5rem;
            width: 3rem;
            height: 1px;
            background: #fff;
            z-index: 100;
          }
        }
      }

      p {
        color: #000;
        margin-top: 2rem;
        text-align: right;
      }
      /* .carousel {
       
        .slider-control-bottomcenter {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
        }
        .slider-control-bottomcenter {
          max-width: 80vw;
          overflow-x: hidden;
          &__node {
            display: block;
            height: 60rem;
          }
          .image-container {
            height: 85%;
            background: #e3e3e3;
          }
          position: relative;
          &__button {
            &-right {
           
            }

            &-left {
            }
          }
        }
      }*/
    }
  }
`;
export default VillaStyles;
