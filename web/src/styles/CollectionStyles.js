import styled from "styled-components";
import { device } from "../styles/deviceSizes";
export const CollectionStyles = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  overflow-x: hidden;

  .toggleBanner {
    height: 500px;
    width: 100%;
    position: relative;
    background: red;
  }

  .collection_container {
    padding: 0 8%;

    @media ${device.laptopL} {
      padding: 0 3%;
    }
  }

  .collection__image_hero img {
    height: 560px;
    width: 100%;
    @media ${device.onlyMobile} {
      height: 400px;
    }
  }

  .col_name {
    font-size: 2rem;
    text-transform: uppercase;
    color: #606060;
    width: 100%;
    letter-spacing: 1rem;
    font-family: ui-monospace;
    font-weight: bold;
    margin-bottom: 25px;

    @media ${device.onlyMobile} {
      font-size: 3rem;
      letetr-spacing: 0.2rem;
      text-align: left;
    }
  }

  .collection_wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin: 0 auto;

    @media (min-width: 600px) {
      .collection_wrap {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media ${device.tablet} {
      grid-template-columns: 1fr 1fr;
    }

    /* @media ${device.iphonePortLandscape} {
      grid-template-columns: 1fr;
      gap: 1 rem;
      align-items: center;
      max-width: 100vw;
    } */

    li.collection_wrap_item {
      list-style: none;
      background-color: #f9f9f9;
      width: 100%;
      height: 100%;
      :hover {
        cursor: pointer;
      }
      .collection__image {
        display: inline-block;
        overflow: hidden;
        height: 300px;
        @media ${device.onlyDesktopS} {
          height: 400px;
        }

        img {
          height: 100%;
          width: 100%;
          max-height: 100%;
          min-height: 100%;
          transition: all 0.5s ease;
          vertical-align: middle;
          object-fit: cover;
          object-position: 100% 100%;
        }

        :hover {
          img {
            transform: scale(1.1);
          }
        }

        width: 100%;
        max-width: 100%;
        @media ${device.mobileS} {
          height: unset !important;
          /* max-width: 90%; */
        }
      }
    }
  }

  .collectionpage_title {
    font-size: 6rem;
    text-transform: uppercase;
    position: absolute;
    top: 26vh;
    padding: 0 15%;
    color: #fff;
    width: 100%;
    text-align: center;
    letter-spacing: 2rem;
    font-family: ui-monospace;
    font-weight: bold;
    z-index: 20;

    @media ${device.onlyMobile} {
      font-size: 3rem;
      top: 30vh;
      padding: 0 2%;
      letter-spacing: 0.5rem;
    }
  }

  .mastercol {
    margin: 4rem 0;
    .roomname {
      font-size: 25px;
      text-align: left;
      color: #505050;
      padding: 20px 0px 10px 0px;
      // min-height: 90px;
      font-family: "rivera_light_regular", sans-serif;

      @media ${device.tablet} {
        /* text-align: left; */
        font-size: 1.8rem;
        margin-right: 1rem;
      }
      @media ${device.onlyMobileSm} {
        text-align: left;
        font-size: 1.6rem !important;
        font-weight: 600 !important;
      }
    }
    .slider-control-bottomcenter {
      top: 58% !important;
      @media ${device.mobileSmall} {
        top: 56% !important;
      }
      @media ${device.mobileS} {
        top: 52% !important;
      }
    }

    .slider-control-centerright,
    .slider-control-centerleft {
      top: 30% !important;
    }
  }

  .banner-overlay {
    opacity: 0.2;
    z-index: 1;
  }

  .villa_nuatilus_banner {
    height: 600px;
  }
  .villa_banner_boundless {
    height: 350px;
  }

  .villa_banners {
    margin-top: 40px;
    width: 100%;

    @media ${device.onlyMobileSm} {
      margin-left: -3.16%;
      margin-right: -10px;
      width: 100vw;
      max-height: 300px;
    }
  }

  .villa_banner_boundless,
  .villa_nuatilus_banner {
    position: relative;
    .boundless_texts,
    .nuatilus_texts {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      color: #fff;
      top: 50%;
      left: 50%;
      z-index: 2;
      font-family: vendor !important;
      font-weight: 400;
      transform: translate(-50%, -50%);
      h3 {
        font-family: vendor !important;
        letter-spacing: 42px;
        margin-left: 25px;
        color: #fff;
        z-index: 20 Im !important;
        @media ${device.onlyMobileS} {
          font-size: 20px;
          letter-spacing: 10px;
        }
      }
      h2 {
        text-align: center;
        font-family: vendor !important;
        letter-spacing: 30px;
        color: #fff;
        width: 100%;
        z-index: 20 !important;
        @media ${device.onlyMobileS} {
          font-size: 16px;
          letter-spacing: 1px;
        }
      }
      .top-border {
        margin-bottom: 40px;
      }
      .bottom-border {
        margin-top: 40px;
      }

      .top-border,
      .bottom-border {
        border-bottom: 2.5px solid;
        max-width: 100%;
        margin-left: 20%;
        margin-right: 20%;
      }
    }
    .boundless_text {
      border-bottom: 1px solid white;
    }
  }

  .boundless_sub_text {
    text-align: center;
    letter-spacing: 10px;
    font-size: 20px;
    @media ${device.onlyMobileS} {
      font-size: 12px;
      letter-spacing: 0px;
    }
  }
  .featured_villa_section {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 2.062fr 1fr;
    // grid-template-columns: repeat(auto-fill, minmax(840px, 1fr));
    gap: 20px;

    @media ${device.onlyMobileSm} {
      grid-template-columns: 1fr;
      gap: 2rem;
      align-items: center;
    }
    /* @media ${device.iphonePortLandscape} {
      grid-template-columns: 1fr;
      gap: 1 rem;
      align-items: center;
      max-width: 100vw;
    } */

    width: 100%;
    position: relative;

    .photofeatured {
      // padding:8px;
      text-transform: uppercase;

      img {
        max-height: 100%;
      }

      .featuredVillaName {
        font-size: 18px;
        color: #fff;
        border-bottom: 2px solid #afafaf;
        margin-bottom: 5px;
      }

      .featuredreslogo {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 0;
        left: 0;
        filter: brightness(0) invert(1);
      }

      .featuredVillaPrice {
        font-size: 18px;
      }

      .featuredVillaFooter {
        font-family: "rivera_ultra_light_regular" sans-serif !important;
        padding: 10px;
        position: absolute;
        bottom: 0;

        .featuredVillaPrice {
          width: 200px;
          float: left;
        }

        .featuredVillaView {
          float: right;
        }

        h4,
        h3 {
          color: #fff;
        }
      }
      :hover {
        .featuredVillaFooter,
        img {
          z-index: 2;
        }
        .overlay {
          opacity: 0.4;
          z-index: 1 !important;
        }
      }
    }

    .rightfeatured {
      width: 100%;
      background: white;
      position: relative;
      z-index: 1;
      .inner {
        height: 100%;
      }
      img {
        background-size: contain;
      }

      .txtwrap {
        text-transform: uppercase;
        position: absolute;
        z-index: 2;
        top: 10%;
        text-align: center;
        width: 100%;

        h2 {
          font-size: 23px;
          color: #fff;
          border-bottom: 2px solid #afafaf;
          margin-bottom: 5px;
          width: unset !important;
          display: inline-block;
        }

        .tagline {
          font-size: 18px;
          margin-top: 40px;
          @media ${device.onlyMobileSm} {
            margin-top: 0px;
          }
          color: #fff;
        }

        .description {
          padding: 10%;
          text-transform: none;

          @media ${device.tablet} {
            padding: 5% 10% 10% 10%;
          }
          @media ${device.onlyMobileSm} {
            padding: 0%;
          }
          color: #fff;
        }
      }
      .overlay {
        opacity: 0.5;
        z-index: 1 !important;
      }
    }
  }

  .rightfeatured,
  .photofeatured {
    position: relative;
  }

  .collection__details {
    padding: 20px 10px 5px 20px;
    @media ${device.onlyMobileS} {
      display: flex;
      flex-direction: column;
      align-items: center;

      .villaname {
        text-align: center;
      }

      .villa_price-logo-wrapper {
        justify-content: space-around;
      }
    }
    @media ${device.mobileS} {
      padding: 20px 20px 0px 0px;
      .villaname {
        text-align: center;
      }

      .villa_price-logo-wrapper .villa_price {
        letter-spacing: normal;
        font-size: 12px;
      }
    }

    h4 {
      font-size: 1.4rem;
      text-transform: uppercase;
      color: #76622e;
      font-weight: 400 !important;
    }

    .villa_resort_name {
      float: right;
      z-index: 9999;
      margin-top: 66px;
      font-size: 2rem;
      color: #e9e9e9;
    }

    .collection_brand_logo {
      z-index: 5001;
      img {
        height: 80px;
        width: 130px;

        @media ${device.iphonePortLandscape} {
          height: 100px;
          width: 100px;
        }
      }
    }

    .villa_price-logo-wrapper {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      @media ${device.mobileM} {
        justify-content: space-around;
      }
    }
    .villa_price {
      font-size: 1.4rem;
      -webkit-letter-spacing: 0.3rem;
      -moz-letter-spacing: 0.3rem;
      -ms-letter-spacing: 0.3rem;
      letter-spacing: 0.3rem;
      color: #7d7d7d;
      .price-from {
        text-transform: uppercase;
        font-weight: 800 !important;
        font-size: 10px;
      }
      .font-bold {
        font-family: "rivera_bold_regular", "sans-serif";
      }
      .price-category {
        font-size: 10px;
        margin-left: 5px;
      }
      // margin-left: 20px;
    }
  }
  .villa_icons {
    margin-top: 20px;
    display: grid;
    // grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr 1fr 1fr;
    font-size: 1.2rem;
    text-align: left;
    color: #fff;
    align-items: baseline;
    svg {
      height: 25px;
      width: 25px;
    }

    @media ${device.onlyMobileS} {
      grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr;
    }

    li {
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .villa_icon_label {
        display: inline-block;
        width: auto;
        font-size: 1rem;
        font-weight: bold;
        color: #787878;
        text-align: center;
        margin-top: 10px;
      }
      .inner-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  .card-image-wrapper {
    @media ${device.onlyMobileSm} {
      position: relative;
      .card-text-wrapper {
        top: 80% !important;
      }
    }
  }
  .secondary-nav .container {
    grid-template-columns: 1fr 2fr !important;
  }
`;
