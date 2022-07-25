import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../styles/deviceSizes";
import { useIsMobile } from "../hooks";
import { NavBar } from "./Navbar";
import { LeftSideBar } from "./SideBar/LeftSideBar";
import { RESORTS, COLLECTIONS } from "../constants";

const HeaderStyles = styled.header`
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  top: 0;
  color: #fff;
  z-index: 1000;
  &.show {
    height: 100vh;
    .icon {
      opacity: 0;
    }
  }

  @media ${device.tablet} {
    padding: 0 4rem;
    flex-direction: row-reverse;
    justify-content: space-between;
    justify-items: flex-end;
    width: 100%;

    &.show-header {
      display: flex;
      .contact-us,
      .logo,
      .hamburger-icon {
        display: none;
      }
    }
    .logo {
      justify-self: center;
    }

    .contact-us {
      justify-self: start;
    }

    svg {
      width: 3rem;
      z-index: 2000;
      g {
        fill: #fff;
      }
    }
  }
  .container {
    height: 100%;
    position: relative;
    margin-left: 10rem;
    margin-right: 10rem;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .black-bg {
    background-color: rgba(21, 21, 21, 0.5);
  }

  .icon {
    display: none;
    @media ${device.tablet} {
      display: unset;
    }
  }

  .contact-us {
    display: none;

    @media ${device.tablet} {
      display: unset;
    }
    a {
      flex-direction: column;
      align-items: center;
      @media ${device.tablet} {
        display: flex;
        svg {
          margin-bottom: 1rem;
          path {
            fill: var(--primary);
          }
        }
      }
    }
  }
`;

const Header = ({
  siteTitle,
  navData,
  logo,
  location,
  headerDropdownImage,
}) => {
  const [showLeftSideBar, setShowLeftSideBar] = useState(false);
  const isMobile = useIsMobile();
  const [listItems, setListItems] = useState([]);

  const [selectedList, setSelectedList] = useState(
    !isMobile ? COLLECTIONS : ""
  );

  useEffect(() => {
    if (selectedList) {
      const listItems_ =
        selectedList === RESORTS
          ? navData?.resorts
          : selectedList === COLLECTIONS
          ? navData?.collections
          : [];

      setListItems(listItems_);
    }
  }, [selectedList]);

  useEffect(() => {
    if (showLeftSideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [showLeftSideBar]);

  return (
    <HeaderStyles
      className={showLeftSideBar ? "show-header" : ""}
      pathname={location?.pathname}
    >
      {!showLeftSideBar && (
        <NavBar
          onMenuClick={(_, selectedItem) => {
            setShowLeftSideBar(true);
            if (selectedItem) setSelectedList(selectedItem);
          }}
          sideWideNavContent={navData}
          logo={logo}
        />
      )}
      <LeftSideBar
        className={showLeftSideBar ? "show" : "hide"}
        customStyle={{ width: showLeftSideBar ? "100vw" : "0" }}
        lists={listItems}
        headerDropdownImage={headerDropdownImage}
        setShowLeftSideBar={setShowLeftSideBar}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      />
    </HeaderStyles>
  );
};

export default Header;
