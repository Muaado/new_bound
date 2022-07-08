import React from "react";
import { Modal } from "./Modal";
import { Table } from "../Table";
import { PricingModalContentWrapper, PricingModalHeader } from "./elements";

export const PricingModal = (props) => {
  const { pricingItems, roomImages, roomName, generalNote } = props;
  const tableData = {
    rows: pricingItems.length ? pricingItems : [],
    columns: [
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
    ],
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
        <Table tableData={tableData} />
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
