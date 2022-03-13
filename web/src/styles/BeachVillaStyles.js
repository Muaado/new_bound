import styled from "styled-components";
import { device } from "../styles/deviceSizes";
export const BeachVillaStyles = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  .collection_container {
    padding: 0 3%;

    @media ${device.laptopL} {
      padding: 0;
    }
  }

  .col_name {
    font-size: 4rem;
    text-transform: uppercase;
    color: #606060;
    width: 100%;
    letter-spacing: 1rem;
    font-family: ui-monospace;
    font-weight: bold;
    margin-bottom: 25px;
  }

  .collection_wrap {
    display: flex;
  }
  .collection_wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(537px, 1fr));
    gap: 1.3rem;

    
    @media ${device.onlyMobile} {
      grid-template-columns: 1fr 1fr;

      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 100vw;
    }

 


    li.collection_wrap_item {
      list-style: none;
      height: 600px;
      background-color: #f1f1f1;
      width: 100%;
      .collection__image {
        height: 390px;

        @media ${device.onlyMobile} {
          height:unset !important;
        }
      }
    }
  }
  .collection__image {
    position: relative;
    overflow-y: hidden;
    -webkit-transition: 1s all;
    transition: 1s all;
    opacity: 1;
  }

  .collection__image img {
    width: 100%;
    height: 60vh;
    object-fit: cover;
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
    z-index: 9999;

    @media ${device.onlyMobile} {
      font-size: 4rem;
      top:40vh;
      padding: 0 2%;
      letter-spacing: 0.5rem;
      
    }
  }

  .mastercol {
    margin-bottom: 8rem;
    margin-top: 5rem;
  }

  .collection__details {
    padding: 15px;
    h4 {
      font-size: 2rem;
      text-transform: uppercase;
      color: #b49466;
      font-weight: bold;
    }

    .villa_resort_name{
      float: right;
      z-index: 9999;
      margin-top: 66px;
      font-size: 2rem;
      color: #e9e9e9;
    }
    .collection_brand_logo {
      width: 100%;
      position: relative;
    }

    .collection_brand_logo img{
      height: 130px;
      width: 200px;
      position: absolute;
      right: 0;
      top: -7rem;
    }

  .villa_price{
    font-size: 2rem;
    font-weight: 500;
    -webkit-letter-spacing: 0.3rem;
    -moz-letter-spacing: 0.3rem;
    -ms-letter-spacing: 0.3rem;
    letter-spacing: 0.3rem;
    color: #7b7b7b;
  }

  .villa_icons{
    margin-top: 20px;
    display: grid;
    // grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 0rem;

    text-align: center;
    coor:#fff;

    svg:not(.measureicon) {
      width: 25px;
      height: 25px;
    }

    li{
      width: 80px;

      
      

      .villa_icon_label{
        display:inline-block;
        width:60px;
        font-size:11px;
        font-weight: bold;
        color: #787878;
        margin-top:10px;
      }
    }

  }

  




`;
