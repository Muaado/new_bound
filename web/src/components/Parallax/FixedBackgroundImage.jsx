import styled from "styled-components";
export const FixedBackgroundImage = styled.div`
  background: ${({ bgImage }) =>
    `url(${bgImage}) center center / cover fixed;`};
  z-index: -1;
  height: 100%;
  width: 100%;
`;
