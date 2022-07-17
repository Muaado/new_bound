import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
const iosMobileDevices = `${device.onlyMobileSm} and ${device.iPadPro}`;
export const FixedBackgroundImage = styled.div`
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: ${({ isIos }) =>
    isIos ? "scroll" : "fixed"} !important;
  @supports (-webkit-touch-callout: none) {
    @media ${iosMobileDevices} {
      background-attachment: scroll !important;
    }
  }
  z-index: 0;
  height: 100%;
  width: 100%;
`;
