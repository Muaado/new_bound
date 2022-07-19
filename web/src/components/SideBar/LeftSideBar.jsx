import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-plugin-sanity-image";
import CloseIcon from "../../assets/icons/close.svg";
import { LeftSideBarWrapper } from "./elements";

export const LeftSideBar = ({
  lists,
  marginTop,
  className,
  headerDropdownImage,
  setShowLeftSideBar,
  selectedList,
  setSelectedList,
}) => {
  return (
    <LeftSideBarWrapper
      marginTop={marginTop}
      className={`dropdown ${className} ${
        selectedList === "collections" ? "collections" : ""
      }`}
    >
      <ul className="first-column">
        <li>
          <Link
            to="/"
            className="clickable"
            onClick={() => {
              // handleOpenDropDown([], false);
              document.body.style.overflow = "unset";
              setSelectedList("");
              setShowLeftSideBar(false);
            }}
          >
            Home
          </Link>
        </li>
        <li
          className={`${selectedList === "resorts" ? "selected" : ""} clickable
          ${className}
          route 
          `}
          onClick={() => setSelectedList("resorts")}
        >
          Resorts
        </li>
        <li
          className={`${
            selectedList === "collections" ? "selected" : ""
          } clickable
          route
            ${className}`}
          onClick={() => setSelectedList("collections")}
        >
          Holiday stays
        </li>
        <li>
          <Link
            className="clickable"
            to="/magazine"
            onClick={() => {
              // handleOpenDropDown([], false);
              document.body.style.overflow = "unset";
              setSelectedList("");
              setShowLeftSideBar(false);
            }}
          >
            Magazine
          </Link>
        </li>
      </ul>
      <ul className="second-column">
        {lists?.map(
          (item) =>
            item &&
            item.url && (
              <Link
                className={`${className} clickable route`}
                key={item.url}
                to={item.url}
                onClick={() => {
                  document.body.style.overflow = "unset";
                  setShowLeftSideBar(false);
                  // handleOpenDropDown([], false);
                }}
              >
                {item.name}
              </Link>
            )
        )}
      </ul>

      <div className={`${className} image-container`}>
        {headerDropdownImage && headerDropdownImage.asset && (
          <Image {...headerDropdownImage} />
        )}
      </div>
      <CloseIcon
        className="dropdown-close-icon"
        onClick={() => {
          document.body.style.overflow = "unset";
          setSelectedList("");
          setShowLeftSideBar(false);
        }}
      />
    </LeftSideBarWrapper>
  );
};
