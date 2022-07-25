import React from "react";
import { Link, navigate } from "gatsby";
import Image from "gatsby-plugin-sanity-image";
import CloseIcon from "../../assets/icons/close.svg";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import MinusIcon from "../../assets/icons/minus-icon.svg";
import CloseSvg from "../../assets/icons/close.svg";
import { LeftSideBarWrapper, MobileDivWrapper, SvgWrapper } from "./elements";
import { RESORTS, COLLECTIONS, HOME, MAGAZINE } from "../../constants";
import { useIsMobile } from "../../hooks";

export const LeftSideBar = ({
  lists,
  marginTop,
  className,
  headerDropdownImage,
  setShowLeftSideBar,
  selectedList,
  setSelectedList,
  customStyle,
}) => {
  const isMobile = useIsMobile();
  const showResorts = selectedList === RESORTS;
  const showCollections = selectedList === COLLECTIONS;
  return (
    <LeftSideBarWrapper
      marginTop={marginTop}
      className={`dropdown  ${className} ${showResorts ? RESORTS : ""}`}
      style={customStyle}
    >
      {isMobile ? (
        <MobileView
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          lists={lists}
        />
      ) : (
        <>
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
                {HOME}
              </Link>
            </li>
            <li
              className={`${
                showResorts ? "selected" : ""
              } clickable ${className}
              route 
          `}
              onClick={() => setSelectedList(RESORTS)}
            >
              {RESORTS}
            </li>
            <li
              className={`${showCollections ? "selected" : ""} clickable
          route
            ${className}`}
              onClick={() => setSelectedList(COLLECTIONS)}
            >
              {COLLECTIONS}
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
                {MAGAZINE}
              </Link>
            </li>
          </ul>
          <DropDownList lists={lists} />
          <div className={`${className} image-container`}>
            {headerDropdownImage && headerDropdownImage.asset && (
              <Image {...headerDropdownImage} />
            )}
          </div>
        </>
      )}
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

export const MobileView = ({ setSelectedList, selectedList, lists }) => {
  const showResorts = selectedList === RESORTS;
  const showCollections = selectedList === COLLECTIONS;
  return (
    <MobileDivWrapper>
      <DropDownList_
        items={[
          {
            onClick: () => {
              setSelectedList("");
              navigate("/");
            },
            content: HOME,
          },
          {
            onClick: () => {
              if (selectedList == RESORTS) {
                setSelectedList("");
              } else {
                setSelectedList(RESORTS);
              }
            },
            content: (
              <>
                <div className="list-header">
                  {RESORTS}
                  {showResorts ? <MinusIcon /> : <PlusIcon />}
                </div>
                {showResorts ? <DropDownList lists={lists} /> : null}
              </>
            ),
          },
          {
            onClick: () => {
              if (selectedList == COLLECTIONS) {
                setSelectedList("");
              } else {
                setSelectedList(COLLECTIONS);
              }
            },
            content: (
              <>
                <div className="list-header">
                  {COLLECTIONS}
                  {selectedList === COLLECTIONS ? <MinusIcon /> : <PlusIcon />}
                </div>
                {showCollections ? <DropDownList lists={lists} /> : null}
              </>
            ),
          },
          {
            onClick: () => {
              navigate("/magazine");
            },
            content: MAGAZINE,
          },
        ]}
      />
    </MobileDivWrapper>
  );
};

export const DropDownList = ({ lists }) => {
  return (
    <ul className="second-column">
      {lists?.map(
        (item) =>
          item &&
          item.url && (
            <Link className={`clickable route`} key={item.url} to={item.url}>
              {item.name}
            </Link>
          )
      )}
    </ul>
  );
};

export const DropDownList_ = ({ items, className_, contentLink }) => {
  return (
    <ul className={className_ || ""}>
      {items?.length
        ? items.map(({ className, content, onClick }) => (
            <li className={`clickable ${className || ""}`} onClick={onClick}>
              {!contentLink ? content : <Link to={contentLink}>{content}</Link>}
            </li>
          ))
        : null}
    </ul>
  );
};
