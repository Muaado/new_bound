import styled from "styled-components";
import { device } from "../styles/deviceSizes";
export const BeachVillaStyles = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  .collection_container {
    padding: 0 3%;

    @media ${device.laptopL} {
      padding: 0 3%;
    }
  }

  .collection__image_hero img{
    height:560px;

    @media ${device.onlyMobile} {
      height : 400px;
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

    @media ${device.onlyMobile} {
      font-size: 3rem;
      letetr-spacing: 0.2rem;
      text-align: center;
    }
  }

  .collection_wrap {
    display: flex;
  }
  .collection_wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.3rem;

    
    @media ${device.iphonePortLandscape} {
      grid-template-columns: 1fr;
      gap : 1 rem;
      align-items: center;
      max-width: 100vw;
    }

    // @media ${device.mobileSmall} {
    //   grid-template-columns: 1fr;
    //   gap : 1 rem;
    // }



    li.collection_wrap_item {
      list-style: none;
      background-color: #f9f9f9;
      width: 100%;
      .collection__image {
        

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
    min-height:390px;
    max-height:390px;
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
    z-index: 20;

    @media ${device.onlyMobile} {
      font-size: 3rem;
      top:30vh;
      padding: 0 2%;
      letter-spacing: 0.5rem;
      
    }
  }

  .mastercol {
    margin-bottom: 8rem;
    margin-top: 5rem;
  }


  .featured_villa_section{
    margin-top: 9rem;
    display: grid;
    grid-template-columns: minmax(auto, 2fr) 1fr;
    // grid-template-columns: repeat(auto-fill, minmax(840px, 1fr));
    gap: 1.3rem;

    
    @media ${device.iphonePortLandscape} {
      grid-template-columns: 1fr;
      gap : 1 rem;
      align-items: center;
      max-width: 100vw;
    }

    width:100%;
    position: relative;
    
    .photofeatured{
      // padding:8px;
      text-transform: uppercase;

      img{
      }
      
      .featuredVillaName{
        font-size: 30px;
        color: #fff;
        border-bottom: 2px solid #afafaf;
        margin-bottom:5px;
      }
      h4{
        font-size: 20px;
      }

      
     
      
      .featuredreslogo{
        width:200px;
        height:200px;
        position:absolute;
        top:0;
        left:0;
      }

      .featuredVillaPrice{
        font-size: 20px;
      }

      .featuredVillaFooter{
        font-family: 'rivera_ultra_light_regular' sans-serif;
        padding:10px;
        position: absolute;
        bottom: 0;

        .featuredVillaPrice{
          width:200px;
          float:left;
        }

        .featuredVillaView{
          float:right;
        }

        h4{
          color: #fff;
        }

      }




    }
    // end left section styling 
    .rightfeatured{
      width:100%;
      background: blue;
      position: relative;

      img{
        background-size: contain;
      }

      .txtwrap{
        text-transform: uppercase;
        position: absolute;
        top:10%;
        text-align: center;
        width:100%;
        
        h3{
          font-size: 30px;
          color: #fff;
          border-bottom: 2px solid #afafaf;
          margin-bottom:5px;
          width: unset !important;
          display: inline-block;
        }

        .tagline{
          font-size: 20px;
          font-size: 20px;
          margin-top: 40px;
          color: #fff;
        }

        .description{
          padding:10%;
          text-transform: none;
          color: #fff;
        }

      }
    }

  }

  .collection__details {
    padding: 20px 20px 33px 20px;
    h4 {
      font-size: 2rem;
      text-transform: uppercase;
      color: #76622e;
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
      height: 130px;
      width: 202px;
      position: absolute;
      top: -8rem;
      right: -1rem;
    }

    .collection_brand_logo img{
      height: 130px;
      width: 200px;
      position: absolute;
      top: -10rem;
      right:0rem;

      @media ${device.iphonePortLandscape} {
        height: 130px;
        width: 130px;
        top: -9rem;
        right:-2rem;
      }
    }

  .villa_price{
    font-size: 2rem;
    font-weight: 500;
    -webkit-letter-spacing: 0.3rem;
    -moz-letter-spacing: 0.3rem;
    -ms-letter-spacing: 0.3rem;
    letter-spacing: 0.3rem;
    color: #7d7d7d;
    // margin-left: 20px;
  }

  .villa_icons{
    margin-top: 20px;
    display: grid;
    // grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 0rem;

    text-align: center;
    coor:#fff;
    padding-bottom:25px;

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