import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
export const StyledModel = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 1001;
`;

export const ModalBody = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  background-color: white;
`;
export const ModalContent = styled.div`
  color: #fff;
  display: flex;
  flex-direction: ${({ contentDirection }) =>
    contentDirection ? contentDirection : "row"};

  align-items: ${({ alignContentCenter }) =>
    alignContentCenter ? "center" : "auto"};
  justify-content: ${({ alignContentCenter }) =>
    alignContentCenter ? "center" : "auto"};
  font-size: 2rem;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  background: white;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--grey1);

    /* border-radius: 20px; */
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: rgba(179, 159, 106, 0.9);
    /* box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3); */
    height: 2px;
  }
`;

export const SvgWrapper = styled.div`
  background: rgba(179, 159, 106, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  position: absolute;
  border-radius: 50%;
  left: 97.5%;
  bottom: 97%;
  svg {
    path {
      stroke: white;
    }
    stroke-width: 10px;
    width: ${({ dimension }) => (dimension ? dimension : "15px")};
    height: ${({ dimension }) => (dimension ? dimension : "15px")};
  }
`;

export const ModalHeader = styled.div`
  background-color: var(--primary);
  width: 100%;
  height: 50px;
  color: white;
  display: flex;

  h2 {
    font-size: 25px;
    color: white;
    width: 100%;
    text-align: center;
    align-self: center;
  }
`;

export const PricingModalContentWrapper = styled.div`
  display: grid;
  padding: 0.5rem 5rem 5rem 5rem;
  grid-template-columns: 1fr 1fr;

  @media ${device.desktopS} {
    grid-template-columns: 1.5fr 1fr;
  }
  grid-gap: 20px;
  img {
    height: 50%;
    margin-top: 52px;
  }
  .detail-section {
    display: flex;
    flex-direction: column;
  }
  .note-text-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-top: 5rem;
    align-items: center;
    h5 {
      align-self: flex-start;
      font-weight: bold;
      color: #76622e;
    }
  }
`;

export const PricingModalHeader = styled.div`
  h2 {
    font-size: 30px;
    color: #76622e;
    padding: 2rem 0;
    font-weight: bold;
    text-align: center;
  }
`;
