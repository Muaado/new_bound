import styled, { css } from "styled-components";
export const FixedBackgroundImage = styled.div`
  ${({ isMainWrapper }) =>
    isMainWrapper
      ? css`
          #gatsby-focus-wrapper {
            background-image: ${({ bgImage }) => `url(${bgImage})`} !important;
            background-repeat: no-repeat !important;
            background-position: center;
            background-size: cover;
            background-attachment: ${({ isIos }) =>
              isIos ? "local" : "fixed"};
            z-index: -1;
            height: 100%;
            width: 100%;
          }
        `
      : css`
          background-image: ${({ bgImage }) => `url(${bgImage})`};
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          background-attachment: ${({ isIos }) => (isIos ? "local" : "fixed")};
          z-index: -1;
          height: 100%;
          width: 100%;
        `}
`;
