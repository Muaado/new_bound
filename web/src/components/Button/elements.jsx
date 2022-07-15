import styled from "styled-components";
import { device } from "../../styles/deviceSizes";
export const StyledButton = styled.button`
  transition: all 1s ease-in-out;
  width: 150px;
  padding: 12px 0px 12px 0px;
  text-transform: uppercase;
  display: flex;
  border: 1.5px solid var(--primary);
  text-align: center;
  margin-top: 20px;
  color: var(--primary);
  font-size: 12px;
  justify-content: center;
  background: none;
  :hover {
    cursor: pointer;
    background: #91715c;
    color: #fff;
  }
  @media ${device.onlyMobileS} {
    font-size: 10px;
    padding: 10px 0px 10px 0px;
  }
`;
