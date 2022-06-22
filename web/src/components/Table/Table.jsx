import React from "react";
import { TableWrapper, StyledTable } from "./elements";

const renderTableHeader = (columns) => {
  return (
    <tr>
      {columns.length &&
        columns.map(({ name }) => {
          return <th>{name}</th>;
        })}
    </tr>
  );
};

const renderTableRow = (rows) => {
  return (
    rows.length &&
    rows.map(({ monthName, price }) => {
      return (
        <tr>
          <td>{monthName}</td>
          <td>{price}</td>
          <td>per night</td>
          <td>note example</td>
        </tr>
      );
    })
  );
};

export const Table = ({ tableData }) => {
  const { rows, columns } = tableData;
  return (
    <TableWrapper>
      <StyledTable>
        {renderTableHeader(columns)}
        {renderTableRow(rows)}
      </StyledTable>
    </TableWrapper>
  );
};