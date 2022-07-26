import React, { useState } from "react";
import { LogoWrapper, NavWrapper, SecondaryNavBarWrapper } from "./elements";
import { Link, navigate } from "gatsby";
import HamburgerIcon from "../../assets/icons/menu-solid.svg";
import ChevronDown from "../../assets/icons/chevron-down.svg";
import Image from "gatsby-plugin-sanity-image";
import { useScoll, useScrollToRef, useNavBar } from "../../hooks";
import {
  COLLECTIONS,
  HOME,
  RESORTS,
  MAGAZINE,
  SIMPLE_MAIN_NAVBAR,
} from "../../constants";

export const NavBar = ({ logo, onMenuClick, sideWideNavContent }) => {
  const { navLinks, heroRef, pageName } = useNavBar();
  const maxScroll = heroRef?.current?.clientHeight || 200;

  const [_, scrollPosition] = useScoll({
    scrollHeightToHide: undefined,
    scrollHeightToShow: undefined,
  });

  const isMaxScroll = scrollPosition < maxScroll / 2;
  const renderNavBar = () => {
    switch (pageName) {
      case SIMPLE_MAIN_NAVBAR:
        return (
          <NavWrapper
            className={`${isMaxScroll ? "black-bg" : ""}`}
            style={{ height: "6rem" }}
          >
            <SideWideNavBar
              showSiteWideNav
              onMenuClick={onMenuClick}
              sideWideNavContent={sideWideNavContent}
              isMaxScroll={!isMaxScroll}
              showTopNav
            />
          </NavWrapper>
        );
      default:
        return (
          <DefaultNavBar
            maxScroll={maxScroll}
            navLinks={navLinks}
            onMenuClick={onMenuClick}
            sideWideNavContent={sideWideNavContent}
            isMaxScroll={isMaxScroll}
          />
        );
    }
  };
  return renderNavBar();
};

const DefaultNavBar = ({
  navLinks,
  onMenuClick,
  sideWideNavContent,
  isMaxScroll,
}) => {
  // const [_, scrollPosition] = useScoll({
  //   scrollHeightToHide: undefined,
  //   scrollHeightToShow: undefined,
  // });

  const [activeLink, setActiveLink] = useState(null);
  const { __, executeScroll } = useScrollToRef();
  const [showSiteWideNav, setShowSiteWideNav] = useState(false);
  const [showMainNav, setShowMainNav] = useState(false);
  const [mainNavContent, setMainNavContent] = useState([]);

  // const isMaxScroll = scrollPosition < maxScroll - 100;
  const navBarStyle = { height: "5.8rem" };
  return (
    <NavWrapper
      className={`${isMaxScroll ? "black-bg" : "blur-bg"}`}
      style={navBarStyle}
    >
      {!!isMaxScroll ? (
        <NavBarList
          className="container"
          items={[
            {
              className: "hamburger-wrapper",
              content: <HamburgerIcon />,
              onClick: onMenuClick,
            },
            {
              content: <LogoWrapper>BOUNDLESS MALDIVES</LogoWrapper>,
              onClick: () => navigate("/"),
            },
            { className: "divider", content: <></> },
          ]}
        />
      ) : null}

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
          {navLinks?.length ? (
            <NavBarList
              items={navLinks?.map(
                ({ name, innerRef, isDropDown, content, onClick }, index) => ({
                  sibling: index > 0 ? <>|</> : null,
                  siblingClassName: "vertical-divider",
                  className: !onClick
                    ? isDropDown
                      ? `page-title ${showMainNav ? "rotate" : ""} `
                      : activeLink == name
                      ? "active"
                      : undefined
                    : undefined,
                  icon: isDropDown ? <ChevronDown /> : undefined,
                  onClick: () => {
                    setActiveLink(name);
                    onClick?.();
                    if (isDropDown) {
                      setShowMainNav(!showMainNav);
                      setMainNavContent(content);
                      setShowSiteWideNav(false);
                    }
                    executeScroll(innerRef);
                  },
                  content: <div className="text">{name}</div>,
                })
              )}
              className="bottom-links"
            />
          ) : null}
        </NavBarList>
        <SideWideNavBar
          showSiteWideNav={showSiteWideNav}
          sideWideNavContent={sideWideNavContent}
          onMenuClick={onMenuClick}
        />
        <SecondaryNavBar open={showMainNav} listItems={mainNavContent} />
      </NavWrapper>
    </NavWrapper>
  );
};

const SideWideNavBar = ({
  showSiteWideNav,
  sideWideNavContent,
  onMenuClick,
  showTopNav,
  isMaxScroll,
}) => {
  const [activeSiteWideNavLink, setActiveSiteWideNavLink] = useState(null);
  const [showSiteWideNavContent, setShowSiteWideContent] = useState(false);

  const siteWideNavContent_ = (
    activeSiteWideNavLink
      ? activeSiteWideNavLink === COLLECTIONS
        ? sideWideNavContent.collections
        : sideWideNavContent.resorts.slice(0, 5)
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

  const isActiveHome = activeSiteWideNavLink === HOME;
  const isActiveCollections = activeSiteWideNavLink === COLLECTIONS;
  const isActiveResort = activeSiteWideNavLink === RESORTS;

  const listItems = [
    {
      className: `${isActiveHome ? "active" : ""} page-title`,
      content: HOME,
      onClick: () => {
        navigate("/");
      },
    },
    {
      className: isActiveResort ? "rotate" : "",
      icon: <HamburgerIcon />,
      content: <div className="text">{RESORTS}</div>,
      onClick: (e) => onMenuClick(e, RESORTS),
    },
    {
      className: isActiveCollections ? "rotate" : "",
      icon: <ChevronDown />,
      content: <div className="text">{COLLECTIONS}</div>,
      onClick: () => onSiteWideNavLinkClick(COLLECTIONS),
    },
    {
      content: <div className="text">{MAGAZINE}</div>,
      onClick: () => {
        navigate(`/${MAGAZINE.toLowerCase()}`);
      },
    },
  ];
  console.log("isMaxScroll >>", isMaxScroll);
  return (
    <>
      {showTopNav && !isMaxScroll ? (
        <NavBarList
          className="container"
          items={[
            {
              className: "hamburger-wrapper",
              content: <></>,
              onClick: onMenuClick,
            },
            {
              content: <LogoWrapper>BOUNDLESS MALDIVES</LogoWrapper>,
              onClick: () => navigate("/"),
            },
            { className: "divider", content: <></> },
          ]}
        />
      ) : null}
      <SecondaryNavBar
        open={showSiteWideNav}
        listWrapperClass={
          showSiteWideNavContent ? "second-nav-border-bottom" : ""
        }
        className={`${!isMaxScroll ? "black-bg" : ""}`}
        listItems={listItems}
      />
      <SecondaryNavBar
        open={showSiteWideNavContent}
        listItems={siteWideNavContent_}
      />
    </>
  );
};

export const SecondaryNavBar = ({
  open,
  listItems,
  listWrapperClass,
  className,
}) => {
  return (
    <SecondaryNavBarWrapper
      style={{
        height: open ? "6rem" : "0rem",
      }}
      className={className}
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
