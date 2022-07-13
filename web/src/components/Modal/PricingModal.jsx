import React from "react";
import { Modal } from "./Modal";
import { Table } from "../Table";
import { Button } from "../Button";
import { PricingModalContentWrapper, PricingModalHeader } from "./elements";
import { navigate } from "gatsby";
import { priceFormatter } from "../../lib/helpers";

const createHeaders = [
  {
    name: "",
  },
  {
    name: "Price",
  },
  {
    name: "Note",
  },
  {
    name: "",
  },
].map(({ name }) => <>{name}</>);

const createRow = ({ monthName, price, note }, villaId) => {
  return [
    monthName,
    priceFormatter.format(price),
    note,
    <Button
      styles={{ padding: "10px 2px", margin: "0" }}
      onClick={() => {
        navigate(`/enquire?id=${villaId}`);
      }}
    >
      Enquire Now
    </Button>,
  ];
};

export const PricingModal = (props) => {
  const { pricingItems, roomImages, roomName, generalNote, villaId } = props;
  const createdRows = pricingItems?.length
    ? pricingItems?.map((row) => createRow(row, villaId))
    : [];

  const tableContent = {
    rows: createdRows,
    columns: createHeaders,
  };
  return (
    <Modal
      headerText="Mothly Pricing"
      contentStyle={{ flexDirection: "column" }}
      {...props}
    >
      <PricingModalHeader>
        <h2>{roomName}</h2>
      </PricingModalHeader>
      <PricingModalContentWrapper>
        <Table tableContent={tableContent} />
        {roomImages.length && (
          <div className="detail-section">
            <img src={roomImages[0]?.asset.url} />
            <div className="note-text-wrapper">
              <h5>Note:</h5>
              {generalNote && <p>{generalNote}</p>}
            </div>
          </div>
        )}
      </PricingModalContentWrapper>
    </Modal>
  );
};
