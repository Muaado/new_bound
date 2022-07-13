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
import PlusIcon from "../../assets/icons/plus-icon.svg";
import MinusIcon from "../../assets/icons/minus-icon.svg";
import { truncate, priceFormatter } from "../../lib/helpers";
import { PricingModal } from "../../components";
import { useIsMobile } from "../../hooks";

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

export const PricingDropDown = ({ rateModel, headerImages, ...props }) => {
  const [showList, setShowList] = useState(false);
  const [activeMonth, setActiveMonth] = useState(null);
  const isMobile = useIsMobile();
  const generalNote = rateModel?.generalNote;
  const sortedItems =
    rateModel && Object.keys(rateModel).length
      ? sortByCurrentMonthName(Object.keys(rateModel))
          .map((key) => {
            if (key === "generalNote") {
              return;
            }
            return {
              monthName: key,
              price: rateModel[key]?.price,
              note: rateModel[key]?.note,
            };
          })
          .filter((item) => item !== undefined)
      : [];
  return (
    <>
      {!isMobile && showList && (
        <PricingModal
          isOpen={showList}
          handleClose={() => setShowList(false)}
          pricingItems={sortedItems}
          generalNote={generalNote}
          roomImages={headerImages?.images}
          {...props}
        />
      )}
      <DropDownWrapper
        className={`${showList ? "noHover" : ""}`}
        onClick={() => {
          setShowList(!showList);
          setActiveMonth(null);
        }}
      >
        {showList && (
          <IconWrapper
            onClick={() => {
              setShowList(false);
              setActiveMonth(null);
            }}
          >
            <SvgWrapper>
              <CloseSvg />
            </SvgWrapper>
          </IconWrapper>
        )}
        <DropDownHeader isOpen={showList}>
          <div className="header-title">Monthly Pricing</div>
          <SvgWrapper dimension={"16px"} style={{ marginLeft: "10px" }}>
            <Calendar />
          </SvgWrapper>
        </DropDownHeader>
        {isMobile &&
          showList &&
          sortedItems &&
          Object.keys(sortedItems).length && (
            <DropDownList>
              {sortedItems.map(({ monthName, price, note }) => {
                return (
                  <>
                    <ListItem key={monthName}>
                      <span className="month">
                        {truncate(monthName, 3, " ")}{" "}
                      </span>
                      <span className="pricing">{`${priceFormatter.format(
                        price
                      )}`}</span>
                      <span className="price-category">per night</span>

                      <SvgWrapper
                        dimension={"8px"}
                        style={{
                          marginLeft: "10px",
                          display: "flex",
                          width: "10%",
                          justifyContent: "space-around",
                        }}
                        strokeWidth="1px"
                      >
                        {activeMonth === monthName ? (
                          <MinusIcon
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveMonth(null);
                            }}
                          />
                        ) : (
                          <PlusIcon
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveMonth(monthName);
                            }}
                          />
                        )}
                      </SvgWrapper>
                    </ListItem>
                    {activeMonth === monthName ? (
                      <ListItem>
                        <p>{note}</p>
                      </ListItem>
                    ) : null}
                  </>
                );
              })}
            </DropDownList>
          )}
      </DropDownWrapper>
    </>
  );
};
