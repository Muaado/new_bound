import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
export const FixedBackgroundImage = styled.div`
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: ${({ isIos }) =>
    isIos ? "scroll" : "fixed"} !important;
  /* position: fixed; */
  @supports (-webkit-touch-callout: none) {
    @media ${device.onlyMobileSm} {
      background-attachment: scroll !important;
    }
  }
  z-index: 0;
  height: 100%;
  width: 100%;
  /* overflow: scroll; */
`;
