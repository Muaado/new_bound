import styled from "styled-components";
import { device } from "../styles/deviceSizes";
export const BeachVillaStyles = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  .collection_container {
    padding: 0 15%;

    @media ${device.laptopL} {
      padding: 0 5%;
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
    grid-template-columns: 1fr 1fr 1fr;
    // grid-template-columns: 35rem 1fr;
    gap: 4rem;
    
    @media ${device.onlyMobile} {
      grid-template-columns: 1fr 1fr;

      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 100vw;
    }

 


    li {
      list-style: none;
      height: 500px;
      background-color: #f1f1f1;
      width: 100%;
      img {
        height: 300px;

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
  }
`;
