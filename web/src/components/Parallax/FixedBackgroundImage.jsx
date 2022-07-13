import styled from "styled-components";
export const FixedBackgroundImage = styled.div`
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: ${({ isIos }) => (isIos ? "local" : "fixed")};
  z-index: -1;
  height: 100%;
  width: 100%;
`;
