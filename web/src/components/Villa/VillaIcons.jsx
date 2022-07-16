import React from "react";
import Measure from "../../assets/icons/villaSpecifications/measure.svg";
import TwoPeople from "../../assets/icons/villaSpecifications/two-people.svg";
import Bed from "../../assets/icons/villaSpecifications/bed.svg";
import Shower from "../../assets/icons/villaSpecifications/shower.svg";
import SwimmingPool from "../../assets/icons/villaSpecifications/swimming-pool.svg";
import { computeVillaFields } from "../../lib/helpers";

export const VillaIcons = ({ villa, className }) => {
  const {
    sizeSqm,
    villMaxOccupancy,
    numofRooms,
    villaShowers,
    villaPoolTypes,
  } = computeVillaFields({
    villa,
  });
  return (
    <ul className={className}>
      <li>
        <Measure />
        <div className="icon-label">{sizeSqm}m2</div>
      </li>
      <li>
        <TwoPeople />
        <div className="icon-label">{villMaxOccupancy} </div>
      </li>
      <li>
        <Bed />
        <div className="icon-label">{numofRooms}</div>
      </li>
      <li>
        <Shower />
        <div className="icon-label">{villaShowers}</div>
      </li>
      {villaPoolTypes?.[0] && (
        <li>
          <SwimmingPool />
          <div className="icon-label">{villaPoolTypes[0]?.poolType}</div>
        </li>
      )}
    </ul>
  );
};
