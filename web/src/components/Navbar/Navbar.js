import React, { useState } from "react";
import { LogoWrapper, NavWrapper, SecondaryNavBarWrapper } from "./elements";
import { Link, navigate } from "gatsby";
import HamburgerIcon from "../../assets/icons/menu-solid.svg";
import ChevronDown from "../../assets/icons/chevron-down.svg";
import Image from "gatsby-plugin-sanity-image";
import { useScoll, useScrollToRef, useNavBar } from "../../hooks";
import {
  HOLIDAY_STAYS,
  HOME,
  RESORTS,
  NAVBAR_WITH_BOTTOM_LINK,
} from "../../constants";

export const NavBar = ({ logo, onMenuClick, mainNavContent }) => {
  const { navLinks, pageName, heroRef } = useNavBar();
  const maxScroll = heroRef?.current?.clientHeight || 400;

  const renderNavBar = () => {
    switch (pageName) {
      case NAVBAR_WITH_BOTTOM_LINK:
        return (
          <NavBarWithBottonLinks
            logo={logo}
            pageName={pageName}
            onMenuClick={onMenuClick}
            navLinks={navLinks}
            maxScroll={maxScroll}
            siteWideNavContent={mainNavContent}
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
  siteWideNavContent,
}) => {
  const [_, scrollPosition] = useScoll({
    scrollHeightToHide: undefined,
    scrollHeightToShow: undefined,
  });

  const [activeLink, setActiveLink] = useState(null);
  const { __, executeScroll } = useScrollToRef();
  const [showSiteWideNav, setShowSiteWideNav] = useState(false);
  const [showSiteWideNavContent, setShowSiteWideContent] = useState(false);
  const [activeSiteWideNavLink, setActiveSiteWideNavLink] = useState(null);
  const [showMainNav, setShowMainNav] = useState(false);
  const [mainNavContent, setMainNavContent] = useState([]);

  const siteWideNavContent_ = (
    activeSiteWideNavLink
      ? activeSiteWideNavLink === HOLIDAY_STAYS
        ? siteWideNavContent.collections
        : siteWideNavContent.resorts.slice(0, 5)
      : []
  ).map(({ name, url }, index) => {
    return {
      className: index === 0 ? "page-title" : "",
      content: name,
      onClick: () => onSiteWideNavContentClick(url),
    };
  });

  const onSiteWideNavContentClick = (url) => {
    navigate(url);
  };

  const onSiteWideNavLinkClick = (linkName) => {
    if (activeSiteWideNavLink === linkName) {
      setShowSiteWideContent(false);
      setActiveSiteWideNavLink(null);
    } else {
      setActiveSiteWideNavLink(linkName);
      setShowSiteWideContent(true);
    }
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
              className: `${showSiteWideNav ? "rotate" : ""} page-title`,
              icon: <ChevronDown />,
              content: <div className="text">Boundless</div>,
              onClick: () => {
                setShowSiteWideNav(!showSiteWideNav);
                setShowMainNav(false);
              },
            },
          ]}
          className="container"
        >
          <NavBarList
            items={
              navLinks?.length
                ? navLinks?.map(
                    ({ name, innerRef, isDropDown, content }, index) => ({
                      sibling: index > 0 ? <>|</> : null,
                      siblingClassName: "vertical-divider",
                      className: isDropDown
                        ? `page-title ${showMainNav ? "rotate" : ""} `
                        : activeLink == name
                        ? "active"
                        : "",
                      icon: isDropDown ? <ChevronDown /> : undefined,
                      onClick: () => {
                        setActiveLink(name);
                        if (isDropDown) {
                          setShowMainNav(!showMainNav);
                          setMainNavContent(content);
                          setShowSiteWideNav(false);
                        }
                        executeScroll(innerRef);
                      },
                      content: <div className="text">{name}</div>,
                    })
                  )
                : []
            }
            className="bottom-links"
          />
        </NavBarList>
        <SecondaryNavBar
          open={showSiteWideNav}
          listWrapperClass={
            showSiteWideNavContent ? "second-nav-border-bottom" : ""
          }
          listItems={[
            {
              className: `${
                activeSiteWideNavLink === HOME ? "active" : ""
              } page-title`,
              content: "Home",
              onClick: () => {
                navigate("/");
              },
            },
            {
              className:
                activeSiteWideNavLink === RESORTS && showSiteWideNavContent
                  ? "rotate"
                  : "",
              icon: <ChevronDown />,
              content: <div className="text">Resorts</div>,
              onClick: () => onSiteWideNavLinkClick(RESORTS),
            },
            {
              className:
                activeSiteWideNavLink === HOLIDAY_STAYS &&
                showSiteWideNavContent
                  ? "rotate"
                  : "",
              icon: <ChevronDown />,
              content: <div className="text">Holiday stays</div>,
              onClick: () => onSiteWideNavLinkClick(HOLIDAY_STAYS),
            },
            {
              content: <div className="text">Magazine</div>,
              onClick: () => {
                navigate("/magazine");
              },
            },
          ]}
        />
        <SecondaryNavBar
          open={showSiteWideNav && showSiteWideNavContent}
          listItems={siteWideNavContent_}
        />
        <SecondaryNavBar open={showMainNav} listItems={mainNavContent} />
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
                {icon ? <div className="list-icon">{icon}</div> : null}
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
