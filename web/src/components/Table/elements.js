import styled from "styled-components";

export const StyledTable = styled.table`
  background: inherit;
  border-collapse: collapse;
  width: 100%;
  color: #76622e;
  border-color: #76622e;
  width: 100%;
  text-transform: capitalize;
  td,
  th {
    padding: 20px;
    text-align: center;
  }
  tr {
    border-bottom: 1px solid !important;
  }
  th {
    text-transform: uppercase;
    font-size: 16px;
    padding-top: 2rem;
    padding-bottom: 1.2rem;
  }
  td {
    font-size: 14px;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
`;
