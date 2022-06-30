import styled from "styled-components";

export const StyledButton = styled.button`
  width: fit-content;
  height: fit-content;
  background: none;
  border: none;
  svg {
    background: white;
    background-position: center;
    border-radius: 50%;
    border-color: black;
    opacity: 0.65;
    stroke: black;
    stroke-width: 10px;
    width: 3rem;
    height: 3rem;
  }

  :hover {
    cursor: pointer;
  }
  :disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;
