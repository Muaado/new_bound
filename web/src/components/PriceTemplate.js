import React from "react";
import styled from "styled-components";

const PriceWrapper = styled.div`
  font-size: 1.6rem;
  -webkit-letter-spacing: 0.3rem;
  -moz-letter-spacing: 0.3rem;
  -ms-letter-spacing: 0.3rem;
  letter-spacing: 0.3rem;
  color: #7d7d7d;
  .price-from {
    text-transform: uppercase;
    font-weight: 400 !important;
    font-size: 10px;
  }
  .font-bold {
    font-family: "rivera_bold_regular", "sans-serif";
  }
  .price-category {
    font-size: 11px;
    margin-left: 5px;
  }
`;

export const PriceTemplate = ({ price, styles }) => {
  return (
    <PriceWrapper style={styles}>
      <span className="price-from">From</span>{" "}
      <span className="font-bold">{price}</span>
      <span className="price-category">per night</span>
    </PriceWrapper>
  );
};
