import styled from "styled-components";
export const FixedBackgroundImage = styled.div`
  background: ${({ bgImage, bgPosition }) =>
    `url(${bgImage}) center center / cover ${bgPosition || "fixed"};`};
  z-index: -1;
  height: 100%;
  width: 100%;
`;
