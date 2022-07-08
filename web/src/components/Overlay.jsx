import styled from "styled-components";
export const Overlay = styled.div`
  background: ${({ bgColor }) => (bgColor ? bgColor : "#000")};
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : -1)};
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: ${({ opacity }) => (opacity ? opacity : 0)};
  -webkit-transition: all 0.6s ease-in-out 0s;
  -moz-transition: all 0.6s ease-in-out 0s;
  transition: all 0.6s ease-in-out 0s;
`;
