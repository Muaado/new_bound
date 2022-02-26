import styled from "styled-components";
import { device } from "../styles/deviceSizes";
export const BeachVillaStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .collection_card_container{
    padding :0 10%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5rem;

    @media ${device.laptop} {
      gap: 2.5rem;
    }

    @media ${device.tablet} {
      grid-template-columns: 1fr;
    }
  }

  .collection__image{
    max-height: 80vh;
    overflow-y: hidden;
  }

  .collection_card_item{
    // height: 20rem;
    background: #f6f5f3;

    @media ${device.laptop} {
      height: 20rem;
    }
  }

  .collection__footer{
    // height: 10rem;
  }


`;
