import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
export const ScrollWrapper = styled.div`
  opacity: 0;
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: "flex-end";
  width: fit-content;
  position: fixed;
  left: 2rem;
  bottom: 2rem;
  z-index: 10000;

  transition: all 1s;

  &.show {
    opacity: 1;
  }

  @media ${device.mobileXL} {
    left: 1rem;
  }

  button {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    background: rgba(179, 159, 106, 0.5);
    border: none;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    svg {
      color: #fff;
      path {
        stroke: #fff;
      }
    }
  }
`;
