import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
export const DropDownWrapper = styled.div`
  display: flex;
  color: #b39a6a !important;
  align-self: center;
  border: 1.5px solid #b39a6a;
  cursor: pointer;
  padding: 20px 0px;
  vertical-align: middle;
  align-items: center;
  flex-direction: column;
  width: 203px;
  justify-content: center;
  transition: all 0.2s;

  :not(.noHover):hover {
    cursor: pointer;
    background: #91715c;
    color: #fff !important;
    svg {
      fill: #fff !important;
    }
  }
`;
export const DropDownHeader = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 700;
  padding: ${({ isOpen }) => `0px 0px ${isOpen ? "20px" : "0px"} 0px;`};
`;

export const DropDownList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0px 25px;
`;

export const ListItem = styled.div`
  padding: 0px 0px 10px 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .month {
    width: 20%;
    display: flex;
    font-size: 12px;
    text-transform: capitalize;
    text-align: left;
  }
  .pricing {
    display: flex;
    font-size: 12px;
    font-weight: 600;
    width: 30%;
    text-align: center;
  }
  .price-category {
    width: 30%;
    display: flex;
    font-size: 10px;
    text-align: left;
  }
  p {
    padding: 0 !important;
    text-align: center !important;
  }
`;

export const IconWrapper = styled.div`
  position: relative;

  width: 100%;
  svg {
    position: absolute;
    left: 92%;
    bottom: 10%;
  }
`;
export const SvgWrapper = styled.div`
  svg {
    fill: #b39a6a;
    stroke: #b39a6a;
    stroke-width: ${({ strokeWidth }) => strokeWidth || "2px"};
    width: ${({ dimension }) => (dimension ? dimension : "10px")};
    height: ${({ dimension }) => (dimension ? dimension : "10px")};
  }
`;
