import React, { useState } from "react";
import {
  DropDownWrapper,
  DropDownHeader,
  DropDownList,
  ListItem,
  IconWrapper,
  SvgWrapper,
} from "./elements";
import CloseSvg from "../../assets/icons/close.svg";
import Calendar from "../../assets/icons/calendar.svg";
import { truncate } from "../../lib/helpers";

const sortByCurrentMonthName = (array) => {
  const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const month = new Date().getMonth();
  return array.sort(function (m1, m2) {
    var n1 = months[m1],
      n2 = months[m2];
    if (n1 < month) {
      n1 = n1 + 12;
    }
    if (n2 < month) {
      n2 = n2 + 12;
    }
    return n1 - n2;
  });
};

export const PricingDropDown = ({ items }) => {
  const [showList, setShowList] = useState(false);
  return (
    <DropDownWrapper>
      {showList && (
        <IconWrapper
          onClick={() => {
            setShowList(false);
          }}
        >
          <SvgWrapper>
            <CloseSvg />
          </SvgWrapper>
        </IconWrapper>
      )}
      <DropDownHeader
        isOpen={showList}
        onClick={() => {
          setShowList(true);
        }}
      >
        <div className="header-title">Monthly Pricing</div>
        <SvgWrapper dimension={"16px"} style={{ marginLeft: "10px" }}>
          <Calendar />
        </SvgWrapper>
      </DropDownHeader>
      {showList && items && Object.keys(items).length && (
        <DropDownList>
          {sortByCurrentMonthName(Object.keys(items)).map((key) => {
            const value = items[key];
            return (
              <ListItem>
                <span className="month"> {truncate(key, 3)} </span>
                <span className="pricing">{`$${value}`}</span>
                <span className="price-category">per person</span>
              </ListItem>
            );
          })}
        </DropDownList>
      )}
    </DropDownWrapper>
  );
};
