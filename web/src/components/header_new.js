import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/icons/close.svg";
import styled from "styled-components";
import { device } from "../styles/deviceSizes";
import PlusIcon from "../assets/icons/plus-icon.svg";
import MinusIcon from "../assets/icons/minus-icon.svg";
import { useScoll, useIsMobile } from "../hooks";
import { NavBar } from "./Navbar";
import { LeftSideBar } from "./SideBar/LeftSideBar";

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
    margin-left: auto;
    margin-right: auto;
    padding-left: 5rem;
    padding-right: 5rem;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .black-bg {
    background: rgba(0, 0, 0, 0.6);
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
    position: absolute;
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

  /* nav {
    position: relative;
    z-index: 100000;

    transition: all 1s;

    .close-icon {
      display: none;
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 2rem;
      height: 2rem;

      @media ${device.tablet} {
        display: unset;
        padding: 0;
      }
    }

    svg {
      path {
        stroke: #000;
      }
    }

    @media ${device.tablet} {
      display: none;
      padding: 0 1.5rem;
      background: #fff;
      top: 0;
      right: 0;
      position: absolute;
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: flex-start;
      text-align: center;
      padding-top: 5rem;
      &.show {
        transform: translateX(0);
     
      }
      &.hide {
        transform: translateX(-100vw);
       
      }
     
    }

    opacity: 1;
    font-size: 1.6rem;
    .nav-top-list {
      display: flex;
      gap: 6rem;
      letter-spacing: 1px;

      @media ${device.tablet} {
       
        gap: 1rem;
      
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: max-content;
      }

      li {
        font-size: 1.6rem;

        display: flex;
        align-items: center;

        svg {
          path {
            stroke: #fff;
            @media ${device.tablet} {
              stroke: #000;
            }
          }
          margin-left: 1rem;
        }
        @media ${device.tablet} {
          color: #000;
          padding: 0.5rem 0;
          text-align: center;

          &.selected {
            font-weight: bold;
          }
        }
        &.selected {
          font-weight: bold;
        }
        p {
          color: #fff;
        }
        a {
          position: relative;
        }
      }
    }
  } */

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
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  navData,
  logo,
  location,
  headerDropdownImage,
}) => {
  const [showLeftSideBar, setShowLeftSideBar] = useState(false);

  const [list, setList] = useState([]);

  const [selectedList, setSelectedList] = useState("");

  const [showMobileDropDown, setShowMobileDropDown] = useState(Number);
  let lists = { resorts: navData?.resorts, collections: navData?.collections };
  const dropdownLists =
    selectedList === "resorts" ? lists.resorts : lists.collections;

  useEffect(() => {
    if (showLeftSideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "s";
    }
  }, [showLeftSideBar, showNav]);

  const isMobile = useIsMobile();
  return (
    <HeaderStyles
      className={showNav ? "show-header" : ""}
      pathname={location?.pathname}
    >
      {!showLeftSideBar && (
        <NavBar
          onMenuClick={() => {
            setShowLeftSideBar(true);
          }}
          logo={logo}
        />
      )}
      {isMobile ? (
        <div className={`mobile-nav ${showNav ? "show" : "hide"}`}>
          <CloseIcon
            className="close-icon"
            onClick={() => {
              if (!showNav) {
                onShowNav();
              } else {
                setTimeout(() => {
                  onHideNav();
                }, 200);
              }
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
                Home
              </li>
            </a>
            <li
              className={` ${
                selectedList === "resorts" ? "selected" : ""
              } clickable`}
              onClick={() => {
                if (showMobileDropDown === 2) {
                  setShowMobileDropDown(0);
                  setTimeout(() => {
                    if (showMobileDropDown !== 1) {
                      setShowMobileDropDown(1);
                    } else {
                      setShowMobileDropDown(0);
                    }
                  }, 700);
                } else {
                  if (showMobileDropDown !== 1) {
                    setShowMobileDropDown(1);
                  } else {
                    setShowMobileDropDown(0);
                  }
                }
              }}
            >
              Resorts {showMobileDropDown === 1 ? <MinusIcon /> : <PlusIcon />}
              <LeftSideBar
                className={showMobileDropDown === 1 ? "show resorts" : ""}
                lists={lists.resorts}
                setShowLeftSideBar={setShowLeftSideBar}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
              />
            </li>

            <li
              className={` ${
                selectedList === "collections" ? "selected" : ""
              } clickable`}
              onClick={() => {
                if (showMobileDropDown !== 2) {
                  setShowMobileDropDown(2);
                } else {
                  setShowMobileDropDown(0);
                }
              }}
            >
              Holiday stays
              {showMobileDropDown == 2 ? <MinusIcon /> : <PlusIcon />}
              <LeftSideBar
                className={`collections ${
                  showMobileDropDown === 2 ? "show collections" : ""
                }`}
                lists={lists.collections}
                setShowLeftSideBar={setShowLeftSideBar}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
              />
            </li>
            <li>
              <Link to="/magazine" className="clickable">
                Magazine
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
