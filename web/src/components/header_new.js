import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/icons/close.svg";
import styled from "styled-components";
import { device } from "../styles/deviceSizes";
import PlusIcon from "../assets/icons/plus-icon.svg";
import MinusIcon from "../assets/icons/minus-icon.svg";
import { useIsMobile } from "../hooks";
import { NavBar } from "./Navbar";
import { LeftSideBar } from "./SideBar/LeftSideBar";
import { MAGAZINE, HOME, RESORTS, COLLECTIONS } from "../constants";

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

  .mobile-nav {
    z-index: 30000;
    padding: 0 3rem;
    background: #fff;
    top: 0;
    right: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: flex-start;
    text-align: center;
    padding-top: 5rem;
    transition: all 1s;
    .close-icon {
      display: none;
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 2rem;
      height: 2rem;

      path {
        fill: #000;
        stroke: #000;
      }

      @media ${device.tablet} {
        display: unset;
        padding: 0;
      }
    }
    &.show {
      transform: translateX(0);
    }
    &.hide {
      transform: translateX(-100vw);
    }
    ul {
      color: #000;
      text-align: left;
      width: 100%;
      li {
        margin-bottom: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--lightGrey);
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        font-size: 2rem;
        a {
          font-family: "rivera_ultra_light_regular", sans-serif !important;
        }
        /* color: var(--primary;) */
        svg {
          width: 1.5rem;
          height: 1.5rem;
          path {
            fill: var(--primary);
          }
        }
      }
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

  const [list] = useState([]);

  const [selectedList, setSelectedList] = useState("");

  const lists = {
    resorts: navData?.resorts,
    collections: navData?.collections,
  };
  const dropdownLists =
    selectedList === RESORTS ? lists.resorts : lists.collections;

  useEffect(() => {
    if (showLeftSideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [showLeftSideBar]);

  const isMobile = useIsMobile();
  return (
    <HeaderStyles
      className={showLeftSideBar ? "show-header" : ""}
      pathname={location?.pathname}
    >
      {!showLeftSideBar && (
        <NavBar
          onMenuClick={(selectedItem) => {
            setShowLeftSideBar(true);
            if (selectedItem) setSelectedList(selectedItem);
          }}
          sideWideNavContent={lists}
          logo={logo}
        />
      )}
      {isMobile ? (
        <div className={`mobile-nav ${showLeftSideBar ? "show" : "hide"}`}>
          <CloseIcon
            className="close-icon"
            onClick={() => {
              setShowLeftSideBar(false);
            }}
          />
          <ul>
            <a href="/">
              <li
                className="clickable"
                onClick={() => {
                  document.body.style.overflow = "unset";
                  setSelectedList("");
                  setShowLeftSideBar(false);
                }}
              >
                {HOME}
              </li>
            </a>
            <li
              className={`clickable`}
              onClick={() => {
                if (selectedList == RESORTS) {
                  setSelectedList("");
                } else {
                  setSelectedList(RESORTS);
                }
              }}
            >
              {RESORTS}
              {selectedList === RESORTS ? <MinusIcon /> : <PlusIcon />}
              <LeftSideBar
                className={selectedList === RESORTS ? "show resorts" : ""}
                lists={lists.resorts}
                setShowLeftSideBar={setShowLeftSideBar}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
              />
            </li>

            <li
              className="clickable"
              onClick={() => {
                if (selectedList == COLLECTIONS) {
                  setSelectedList("");
                } else {
                  setSelectedList(COLLECTIONS);
                }
              }}
            >
              {COLLECTIONS}
              {selectedList === COLLECTIONS ? <MinusIcon /> : <PlusIcon />}
              <LeftSideBar
                className={`collections ${
                  selectedList === COLLECTIONS ? "show collections" : ""
                }`}
                lists={lists.collections}
                setShowLeftSideBar={setShowLeftSideBar}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
              />
            </li>
            <li>
              <Link to="/magazine" className="clickable">
                {MAGAZINE}
                {showLeftSideBar === 4 && <LeftSideBar list={list} />}
              </Link>
            </li>
          </ul>
        </div>
      ) : showLeftSideBar ? (
        <LeftSideBar
          className={showLeftSideBar ? "show" : ""}
          lists={dropdownLists}
          headerDropdownImage={headerDropdownImage}
          setShowLeftSideBar={setShowLeftSideBar}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      ) : null}
    </HeaderStyles>
  );
};

export default Header;
