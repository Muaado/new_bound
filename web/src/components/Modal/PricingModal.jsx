import React from "react";
import { Modal } from "./Modal";
import { Table } from "../Table";
import { PricingModalContentWrapper, PricingModalHeader } from "./elements";

export const PricingModal = (props) => {
  const { pricingItems, roomImages, roomName } = props;
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
        name: "Notes",
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
              <p>
                Price may vary during the festive season. The prices shown here
                are only guide prices. Please contact us to check availability
                and for the best rates.
              </p>
            </div>
          </div>
        )}
      </PricingModalContentWrapper>
    </Modal>
  );
};
