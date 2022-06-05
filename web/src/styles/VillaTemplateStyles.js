import { Placeholder } from "gatsby-plugin-image";
import styled from "styled-components";
import { device } from "../styles/deviceSizes";
import "../styles/typography.css";

const VillaStyles = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  h1 {
    /* text-align: center; */
    /* color: var(--primary); */
    /* font-size: 7.2rem; */
    /* padding: 7rem 0; */
    // letter-spacing: 1rem;

    @media ${device.tablet} {
      letter-spacing: unset;
    }
  }
  .backtoresorticon {
    width: 24px;
    height: 24px;
    color: #76622e8a;
    position: relative;
    top: -2px;
    left: -4px;
  }

  .backtoreswrapper {
    position: absolute;
    top: 10px;
    left: 10%;
  }

  .backtoresort {
    color: #76622e8a;
  }

  .backtoresort:hover {
    color: #76622e;
  }

  .roomfeatwrap {
    overflow: hidden;
  }

  .roomfeat svg {
    width: 100%;
  }

  h2 {
    /* letter-spacing: 1rem; */
    text-align: center;
  }

  .villa {
    &__image {
      max-height: 80vh;
      /* overflow-y: hidden; */
      position: relative;

      .image-container {
        max-height: 80vh;
        overflow-y: hidden;
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
        text-wrap: pre-wrap;

        font-weight: normal;
        text-transform: uppercase;
        color: #fff;
        font-size: 4rem;
        color: #fff;
        left: 10%;
        bottom: 3%;
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

      .mouse_scroll {
        bottom: 30% !important;
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
      margin: 7rem 0;
      margin-top: 10rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #76622e;

      /* padding: 0 10%; */
      position: relative;
      /* justify-content: center; */

      @media ${device.laptop} {
        margin-top: 0;
        flex-direction: column;
      }

      @media ${device.mobileXl} {
        width: 100vw;
      }

      .carousel {
        /* height: 70rem !important;
        width: 55rem !important; */
        height: 90vh;
        width: 100%;
        max-width: 50vw;

        /* position: absolute !important; */
        /* top: 10rem;
        left: -55rem; */
        z-index: 100;

        @media ${device.desktopS} {
          height: 75vh !important;
        }
        @media ${device.laptopL} {
          height: 70vh !important;
        }

        @media ${device.laptopM} {
          height: 60vh !important;
        }
        @media ${device.laptop} {
          /* height: 50vh !important; */
          width: 65%;
          max-width: unset;
          align-self: center;
        }

        @media ${device.tablet} {
          /* height: 50vh !important; */
          width: 85%;
        }
        @media ${device.mobileXL} {
          /* height: 50vh !important; */
          width: 100%;
        }

        &__button-right,
        &__button-left {
          display: none;
        }

        &__image-container {
          width: 100%;
          height: 90vh;

          @media ${device.desktopS} {
            height: 75vh !important;
          }
          @media ${device.laptopL} {
            height: 70vh !important;
          }
          @media ${device.laptopM} {
            height: 60vh !important;
          }
          @media ${device.laptop} {
            /* height: 50vh !important; */
          }
        }

        .slider-control-bottomcenter {
          position: absolute;
          bottom: -4rem !important;

          ul {
            /* display: flex !important;
            align-items: center;
            justify-content: center; */
            li {
              margin: 0;
            }
          }

          .paging-item {
            /* height: fit-content !important; */
            button {
              height: fit-content !important;
              display: flex !important;
              align-items: center;

              svg {
                /* height: 3rem;
                width: 3rem; */
                margin: 0;
              }
            }
          }
        }
      }
      .container {
        /* background: black; */
        position: relative;
        /* height: 100rem; */
        width: 50%;
        /* margin-left: 50rem; */
        /* padding: 15rem 8rem 15rem 15rem; */
        margin: 5rem 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* border: 1px solid var(--primary); */

        .villa_name_title {
          font-family: "river_bold_regular", sans-serif;
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
        display: inline-block;
        width: 100%;
        text-align: left;
        margin-bottom: 20px;
        position: absolute;

        @media ${device.desktopL} {
        }

        .unique_code {
          font-size: 2rem;
          font-family: "rivera_bold_regular", "sans-serif";
          color: #737070;
          display: inline-block;
          position: relative;
          top: -25rem;
          text-orientation: use-glyph-orientation;
        }
      }

      &-icons {
        padding: 3rem 0;
        display: flex;
        justify-content: center;
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

      .btn {
        align-self: center;
        background: transparent;
        border: 1px solid var(--lightOrange);
        color: var(--lightOrange);
        margin-top: 2rem;
        padding: 1.5rem 10rem;
        font-size: 1.4rem;

        @media ${device.tablet} {
          align-self: flex-start;
        }
      }
      .enquire:hover {
        background: #91715c;
        color: #fff;
      }
    }

    &__room-features {
      .roomfeaturetitle {
        margin-bottom: 7rem;
        color: #fff;
      }
      max-height: 550px !important;
      // top:0;

      .content {
        background: rgb(0, 0, 0, 0.3);
        max-height: 520px;
        min-height: 520px;
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
        border-bottom: 0.5px solid #fff;
      }
      .accordion-label:hover {
        cursor: pointer;
      }

      .accordion-label:after {
        content: "+";

        // width: 13em;
        height: 1em;
        text-align: center;
        transition: all 0.8s ease;
        display: flex;
        justify-content: space-between;
        // padding: 1em;
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
        overflow: hidden;
        transition: all 0.3s ease;
        opacity: 0;
        height: 0;
        // transform: scale(1, 0);
        transform-origin: center top;
      }
      input[type="checkbox"]:checked ~ .accordion-child {
        color: #fff;
        background: rgb(0, 0, 0, 0.3);
        // box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.16);
        padding: 20px;
        height: auto;
        opacity: 0.8;
        // transform: scale(1, 1);
        max-height: 350px;
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
      .accordion-child ul {
        /* padding-left: 4rem; */

        width: 100%;
        overflow-y: hidden;
        // min-height: 200px; /* approximate max height */

        transition-property: all;
        transition-duration: 20s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

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
        height: 520px;
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
          /* .paging-item {
            button {
              svg {
                width: unset;
                height: unset;
                margin: unset;
              }
            }
          } */
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
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20rem;
      @media ${device.mobileXL} {
        padding: 0 1.5rem;
        width: 100vw;
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
      .carousel {
        /* .slider-frame {
          height: max-content !important;
        } */

        .slider-control-bottomcenter {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
        }
        .slider-control-bottomcenter {
          max-width: 80vw;
          overflow-x: hidden;
          /* max-width: 10%;
          overflow: hidden;
          position: relative; */

          /* ul {
            display: flex;
            /* width: 10rem; */

          /* li {
              background: #000;
              width: 1rem;
              height: 1rem;
              margin: 0 0.5rem;
              cursor: pointer;
              &.active {
                background: blue;
              }
            }
          } */
        }
        &__node {
          display: block;
          /* height: 100%; */
          height: 60rem;
        }
        .image-container {
          height: 85%;
          background: #e3e3e3;
        }
        position: relative;
        &__button {
          &-right {
            /* position: absolute; */
            /* left: 5rem; */
            /* top: -5rem; */
          }

          &-left {
            /* position: absolute; */
            /* right: -2rem; */
            /* top: -5rem; */
          }
        }
      }
    }
  }
`;
export default VillaStyles;
