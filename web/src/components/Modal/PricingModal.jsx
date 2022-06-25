import React from "react";
import { Modal } from "./Modal";
import { Table } from "../Table";

export const PricingModal = (props) => {
  const { pricingItems } = props;
  const tableData = {
    rows: pricingItems.length ? pricingItems : [],
    columns: [
      {
        name: "",
      },
      {
        name: "price",
      },
    ],
  };
  return (
    <Modal headerText="Pricing Modal" {...props}>
      <Table tableData={tableData} />
    </Modal>
  );
};
