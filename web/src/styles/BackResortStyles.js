import { Placeholder } from "gatsby-plugin-image";
import styled from "styled-components";
import { device } from "../styles/deviceSizes";
const BackResortStyles = styled.div`

    /* align-self: flex-end ; */
    border-radius: 50%;
    /* padding: 2rem; */
    width: 5rem;
    height: 5rem;
    background: var(--darkGreen);
    border: none;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    svg {
      color: #fff;
      path {
        stroke: #fff;
      }
    }
  
`;
export default BackResortStyles;
