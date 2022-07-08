import React from "react";
import { TableWrapper, StyledTable } from "./elements";

const renderTableHeader = (columns) => {
  return (
    <tr>
      {columns.length &&
        columns.map((col) => {
          return <th>{col}</th>;
        })}
    </tr>
  );
};

const renderTableRow = (rows) => {
  return (
    rows.length &&
    rows.map((row) => {
      return (
        <tr>
          {row.map((row_) => (
            <td>{row_}</td>
          ))}
        </tr>
      );
    })
  );
};

export const Table = ({ tableContent }) => {
  const { rows, columns } = tableContent;
  return (
    <TableWrapper>
      <StyledTable>
        {renderTableHeader(columns)}
        {renderTableRow(rows)}
      </StyledTable>
    </TableWrapper>
  );
};
