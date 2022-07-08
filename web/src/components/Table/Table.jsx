import React from "react";
import { Button } from "../Button";
import { navigate } from "gatsby";
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

const renderTableRow = (rows, villaId) => {
  return (
    rows.length &&
    rows.map(({ monthName, price, note }) => {
      return (
        <tr>
          <td>{monthName}</td>
          <td>$ {price}</td>
          <td>{note}</td>
          <td
            onClick={() => {
              navigate(`/enquire?id=${villaId}`);
            }}
          >
            <Button styles={{ padding: "10px 2px", margin: "0" }}>
              Enquire Now
            </Button>
          </td>
        </tr>
      );
    })
  );
};

export const Table = ({ tableData, villaId }) => {
  const { rows, columns } = tableData;
  return (
    <TableWrapper>
      <StyledTable>
        {renderTableHeader(columns)}
        {renderTableRow(rows, villaId)}
      </StyledTable>
    </TableWrapper>
  );
};
