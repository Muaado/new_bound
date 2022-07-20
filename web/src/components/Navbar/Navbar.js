import React, { useState } from "react";
import { LogoWrapper, NavWrapper, SecondaryNavBarWrapper } from "./elements";
import { Link } from "gatsby";
import HamburgerIcon from "../../assets/icons/menu-solid.svg";
import ChevronDown from "../../assets/icons/chevron-down.svg";
import Image from "gatsby-plugin-sanity-image";
import { useScoll, useScrollToRef, useNavBar } from "../../hooks";
import { HOLIDAY_STAYS, HOME, RESORTS, MAGAZINE } from "../../constants";

export const NavBar = ({ logo, onMenuClick }) => {
  const { navLinks, pageName, heroRef } = useNavBar();
  const maxScroll = heroRef?.current?.clientHeight || 400;

  const renderNavBar = () => {
    switch (pageName) {
      case "homepage":
        return (
          <DefaultNavBar
            logo={logo}
            onMenuClick={onMenuClick}
            pageName={pageName}
            maxScroll={maxScroll}
          />
        );
      case "resort":
        return (
          <NavBarWithBottonLinks
            logo={logo}
            pageName={pageName}
            onMenuClick={onMenuClick}
            navLinks={navLinks}
            maxScroll={maxScroll}
          />
        );
      default:
        return (
          <DefaultNavBar
            logo={logo}
            onMenuClick={onMenuClick}
            pageName={pageName}
            maxScroll={maxScroll}
          />
        );
    }
  };
  return renderNavBar();
};

const DefaultNavBar = ({
  onMenuClick,
  logo,
  maxScroll,
  navBarStyle,
  navBarClassName,
  hideDefaultContent = false,
  children,
}) => {
  const [_, scrollPosition] = useScoll({
    scrollHeightToHide: undefined,
    scrollHeightToShow: undefined,
  });

  const hideDivider = scrollPosition > maxScroll;
  const defaultClassName = scrollPosition > maxScroll ? "blur-bg" : "";
  return (
    <NavWrapper
      className={navBarClassName || defaultClassName}
      style={navBarStyle}
    >
      {!hideDefaultContent ? (
        <ul className="container">
          <li className="hamburger-wrapper">
            <HamburgerIcon onClick={onMenuClick} />
          </li>
          <li>
            <LogoWrapper>
              <Logo logo={logo} />
            </LogoWrapper>
          </li>
          {!hideDivider ? <li className="divider"></li> : null}
        </ul>
      ) : null}
      {children}
    </NavWrapper>
  );
};

export const NavBarWithBottonLinks = ({
  pageName,
  logo,
  onMenuClick,
  navLinks,
  maxScroll,
}) => {
  const [_, scrollPosition] = useScoll({
    scrollHeightToHide: undefined,
    scrollHeightToShow: undefined,
  });

  const [activeLink, setActiveLink] = useState(null);
  const { __, executeScroll } = useScrollToRef();
  const [showMainNav, setShowMainNav] = useState(false);
  const [showMainNavContent, setShowMainNavContent] = useState(false);
  const [activeMainNavLink, setActiveMainNavLink] = useState(null);

  const onMainNavLinkClick = (linkName) => {
    setShowMainNavContent(!showMainNavContent);
    setActiveMainNavLink(linkName);
  };

  const isMaxScroll = scrollPosition < maxScroll - 100;
  const navBarStyle = { height: "5.8rem" };

  return (
    <DefaultNavBar
      navBarClassName={`${isMaxScroll ? "black-bg" : "blur-bg"}`}
      logo={logo}
      onMenuClick={onMenuClick}
      maxScroll={maxScroll}
      hideDefaultContent={!isMaxScroll}
      navBarStyle={navBarStyle}
    >
      <NavWrapper
        className={`${isMaxScroll ? "black-bg" : ""} secondary-nav`}
        style={navBarStyle}
        bottomNav
      >
        <NavBarList
          items={[
            {
              className: `${showMainNav ? "rotate" : ""} page-title`,
              icon: <ChevronDown />,
              content: <div className="text">Boundless</div>,
              onClick: () => {
                setShowMainNav(!showMainNav);
              },
            },
          ]}
          className="container"
        >
          <NavBarList
            items={[...navLinks].map(({ name, innerRef }, index) => ({
              sibling: index > 0 ? <>|</> : null,
              siblingClassName: "vertical-divider",
              className: activeLink == name ? "active" : "",
              onClick: () => {
                setActiveLink(name);
                executeScroll(innerRef);
              },
              content: name,
            }))}
            className="bottom-links"
          />
        </NavBarList>
        <SecondaryNavBar
          open={showMainNav}
          listWrapperClass={
            showMainNavContent ? "second-nav-border-bottom" : ""
          }
          listItems={[
            {
              className: `${
                activeMainNavLink === HOME ? "active" : ""
              } page-title`,
              content: "Home",
              onClick: () => onMainNavLinkClick(HOME),
            },
            {
              className:
                activeMainNavLink === RESORTS && showMainNavContent
                  ? "rotate"
                  : "",
              icon: <ChevronDown />,
              content: <div className="text">Resorts</div>,
              onClick: () => onMainNavLinkClick(RESORTS),
            },
            {
              className:
                activeMainNavLink === HOLIDAY_STAYS && showMainNavContent
                  ? "rotate"
                  : "",
              icon: <ChevronDown />,
              content: <div className="text">Holiday stays</div>,
              onClick: () => onMainNavLinkClick(HOLIDAY_STAYS),
            },
            {
              className:
                activeMainNavLink === MAGAZINE && showMainNavContent
                  ? "rotate"
                  : "",
              icon: <ChevronDown />,
              content: <div className="text">Magazine</div>,
              onClick: () => onMainNavLinkClick(MAGAZINE),
            },
          ]}
        />
        <SecondaryNavBar
          open={showMainNav && showMainNavContent}
          listItems={[]}
        />
      </NavWrapper>
    </DefaultNavBar>
  );
};

export const SecondaryNavBar = ({ open, listItems, listWrapperClass }) => {
  return (
    <SecondaryNavBarWrapper
      style={{
        height: open ? "6rem" : "0rem",
      }}
    >
      {open && (
        <NavBarList
          className={`${listWrapperClass ? listWrapperClass : ""} container`}
          items={listItems}
        />
      )}
    </SecondaryNavBarWrapper>
  );
};

const NavBarList = ({ items, className, children }) => {
  return (
    <ul className={className}>
      {items.map(
        ({
          className: className_,
          icon,
          content,
          sibling,
          siblingClassName,
          onClick,
        }) => {
          return (
            <>
              {sibling ? <li className={siblingClassName}>{sibling}</li> : null}
              <li className={className_} onClick={onClick}>
                <div className="list-icon">{icon}</div>
                {content}
              </li>
            </>
          );
        }
      )}
      {children}
    </ul>
  );
};

export const Logo = ({ logo }) => (
  <div className="logo">
    <Link to="/">
      {logo && logo.asset && (
        <Image
          asset={logo.asset}
          width={100}
          height={150}
          config={{ fit: "clip" }}
          alt={logo.alt}
        />
      )}
    </Link>
  </div>
);
