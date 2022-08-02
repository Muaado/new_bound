import React, { useEffect, useState, useCallback } from "react";
import {
  LogoWrapper,
  NavWrapper,
  SecondaryNavBarWrapper,
  DropDownWrapper,
  ImageWrapper,
  StyledList,
} from "./elements";
import { Link, navigate } from "gatsby";
import HamburgerIcon from "../../assets/icons/menu-solid.svg";
import ChevronDown from "../../assets/icons/chevron-down.svg";
import Image from "gatsby-plugin-sanity-image";
import { useScoll, useScrollToRef, useNavBar, useIsMobile } from "../../hooks";
import {
  COLLECTIONS,
  HOME,
  RESORTS,
  MAGAZINE,
  SIMPLE_MAIN_NAVBAR,
} from "../../constants";
import { Overlay } from "../Overlay";

export const NavBar = ({ logo, onMenuClick, sideWideNavContent }) => {
  const { navLinks, heroRef, pageName, activeNavLink } = useNavBar();
  const maxScroll = heroRef?.current?.clientHeight || 200;

  const [_, scrollPosition] = useScoll({
    scrollHeightToHide: undefined,
    scrollHeightToShow: undefined,
  });

  // useEffect(() => {

  //   console.log("activeNavLink>>", activeNavLink);
  // }, [activeNavLink]);

  const isMaxScroll = scrollPosition < maxScroll / 2;
  const renderNavBar = () => {
    switch (pageName) {
      case SIMPLE_MAIN_NAVBAR:
        return (
          <NavWrapper
            className={`${isMaxScroll ? "black-bg" : "blur-bg"}`}
            style={{ height: "6rem" }}
          >
            <SideWideNavBar
              showSiteWideNav
              onMenuClick={onMenuClick}
              sideWideNavContent={sideWideNavContent}
              className={isMaxScroll ? "black-bg" : ""}
              isMaxScroll={!isMaxScroll}
              scrollPosition={scrollPosition}
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
            scrollPosition={scrollPosition}
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
  scrollPosition,
}) => {
  const [activeLink, setActiveLink] = useState(null);
  const { __, executeScroll } = useScrollToRef();
  const [showSiteWideNav, setShowSiteWideNav] = useState(false);
  const [showMainNav, setShowMainNav] = useState(false);
  const [mainNavContent, setMainNavContent] = useState([]);
  const [showMainNavDropDown, setShowMainNavDropDown] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (showSiteWideNav || setShowMainNav || showMainNavDropDown) {
      setShowSiteWideNav(false);
      setShowMainNav(false);
      setShowMainNavDropDown(false);
    }
  }, [scrollPosition]);

  const { activeNavLink } = useNavBar();
  useEffect(() => {
    setActiveLink(activeNavLink);
  }, [activeNavLink]);

  const onIconClick = useCallback(
    ({ hasSubNav, isDropDown, name, content }) => {
      const isActive = activeLink === name;
      if (hasSubNav) {
        setShowMainNav(!showMainNav);
        setMainNavContent(content);
        setShowSiteWideNav(false);
      }
      if (isDropDown) {
        setShowMainNavDropDown(!showMainNavDropDown);
        setActiveLink(!isActive ? name : "");
      }
    },
    [showMainNavDropDown, showMainNav]
  );

  const onItemClick = useCallback(
    ({ name, onClick, innerRef, isDropDown }) => {
      setActiveLink(name);
      onClick?.();
      if (innerRef?.current && !isDropDown) {
        executeScroll(innerRef);
      }
    },
    [activeLink]
  );

  let navLinkContainerClass = "";
  const navLinks_ =
    navLinks?.length &&
    navLinks?.map(
      ({ name, innerRef, hasSubNav, content, isDropDown, onClick }, index) => {
        navLinkContainerClass = "full-column";
        const isActive = activeLink === name;
        return {
          sibling: !isMobile ? index > 0 ? <>|</> : null : null,
          siblingClassName: "vertical-divider",
          className: !onClick
            ? hasSubNav
              ? `page-title ${showMainNav ? "rotate" : ""} `
              : isActive
              ? "active"
              : undefined
            : isDropDown
            ? `page-title hasDropDown ${showMainNavDropDown ? "rotate" : ""}`
            : undefined,
          icon: !isMobile ? (
            hasSubNav || isDropDown ? (
              <ChevronDown />
            ) : undefined
          ) : undefined,
          onIconClick: () =>
            onIconClick({ hasSubNav, isDropDown, name, content }),
          onClick: () => onItemClick({ name, innerRef, onClick, isDropDown }),
          content: (
            <div className="text">
              {name}
              <DropDown
                listItems={content}
                isActive={isDropDown && showMainNavDropDown}
                onListClick={(e, ref) => {
                  setActiveLink("");
                  e.stopPropagation();
                  executeScroll(ref);
                }}
              />
            </div>
          ),
        };
      }
    );

  const navBarStyle = { height: "5.8rem" };
  return (
    <NavWrapper
      className={`${isMaxScroll ? "black-bg" : "blur-bg"}`}
      style={navBarStyle}
    >
      {isMaxScroll || isMobile ? (
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
            !isMobile ? { className: "divider", content: <></> } : {},
          ]}
        />
      ) : null}

      {!isMobile ? (
        <NavWrapper
          className={`${
            isMaxScroll ? "black-bg" : isMobile ? "blur-bg" : ""
          } secondary-nav`}
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
            className={`container ${navLinkContainerClass}`}
          >
            {navLinks?.length ? (
              <NavBarList items={navLinks_} className="bottom-links" />
            ) : null}
          </NavBarList>

          <SideWideNavBar
            showSiteWideNav={showSiteWideNav}
            sideWideNavContent={sideWideNavContent}
            onMenuClick={onMenuClick}
          />
          <SecondaryNavBar
            height="10rem"
            open={showMainNav}
            listItems={mainNavContent}
          />
        </NavWrapper>
      ) : null}
    </NavWrapper>
  );
};

const SideWideNavBar = ({
  showSiteWideNav,
  sideWideNavContent,
  onMenuClick,
  showTopNav,
  isMaxScroll,
  scrollPosition,
  className,
}) => {
  const [activeSiteWideNavLink, setActiveSiteWideNavLink] = useState(null);
  const [showSiteWideNavContent, setShowSiteWideContent] = useState(false);
  const isMobile = useIsMobile();

  const siteWideNavContent_ = (
    activeSiteWideNavLink
      ? activeSiteWideNavLink === COLLECTIONS
        ? sideWideNavContent.collections
        : activeSiteWideNavLink === RESORTS
        ? sideWideNavContent.resorts.slice(0, 5)
        : activeSiteWideNavLink === MAGAZINE
        ? sideWideNavContent.posts
        : []
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
  const isActiveMagazine = activeSiteWideNavLink === MAGAZINE;

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
      icon: !isMobile ? <HamburgerIcon /> : null,
      content: <div className="text">{RESORTS}</div>,
      onClick: (e) => onMenuClick(e, RESORTS),
    },
    {
      className: isActiveCollections ? "rotate" : "",
      icon: !isMobile ? <ChevronDown /> : null,
      content: <div className="text">{COLLECTIONS}</div>,
      onClick: () => onSiteWideNavLinkClick(COLLECTIONS),
    },
    {
      className: isActiveMagazine ? "rotate" : "",
      content: <div className="text">{MAGAZINE}</div>,
      icon: !isMobile ? <ChevronDown /> : null,
      onIconClick: () => onSiteWideNavLinkClick(MAGAZINE),
      onClick: () => navigate(`/${MAGAZINE.toLowerCase()}`),
    },
  ];

  useEffect(() => {
    if (showSiteWideNavContent) {
      setShowSiteWideContent(false);
    }
  }, [scrollPosition]);

  return (
    <>
      {(showTopNav && !isMaxScroll) || isMobile ? (
        <NavBarList
          className="container"
          items={[
            {
              className: "hamburger-wrapper",
              content: isMobile ? <HamburgerIcon /> : null,
              onClick: onMenuClick,
            },
            {
              content: <LogoWrapper>BOUNDLESS MALDIVES</LogoWrapper>,
              onClick: () => navigate("/"),
            },
            !isMobile ? { className: "divider", content: <></> } : {},
          ]}
        />
      ) : null}
      {!isMobile ? (
        <React.Fragment>
          <SecondaryNavBar
            open={showSiteWideNav}
            listWrapperClass={
              showSiteWideNavContent ? "second-nav-border-bottom" : ""
            }
            className={className}
            listItems={listItems}
            height={isMobile ? "20rem" : undefined}
          />
          <SecondaryNavBar
            open={showSiteWideNavContent && showSiteWideNav}
            listItems={siteWideNavContent_}
            height={isMobile ? "25rem" : undefined}
          />
        </React.Fragment>
      ) : null}
    </>
  );
};

export const SecondaryNavBar = ({
  open,
  listItems,
  listWrapperClass,
  className,
  height,
}) => {
  const isMobile = useIsMobile();
  return (
    <SecondaryNavBarWrapper
      style={{
        height: open ? height || "6rem" : "0rem",
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
        (
          {
            className: className_,
            icon,
            content,
            sibling,
            siblingClassName,
            thumbImage,
            onClick,
            onIconClick,
          },
          index
        ) => {
          return (
            <React.Fragment key={index}>
              {sibling ? (
                <StyledList className={siblingClassName}>{sibling}</StyledList>
              ) : null}
              <StyledList
                className={`${className_} ${thumbImage ? "image-wrapper" : ""}`}
                onClick={onClick}
              >
                {icon ? (
                  <div
                    className="list-icon"
                    onClick={(e) => {
                      if (onIconClick) {
                        e.stopPropagation();
                        onIconClick?.();
                      }
                    }}
                  >
                    {icon}
                  </div>
                ) : null}
                {thumbImage?.asset ? (
                  <RoomImage image={thumbImage} content={content} />
                ) : (
                  content
                )}
              </StyledList>
            </React.Fragment>
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

const DropDown = ({ listItems, onListClick, isActive }) => {
  return (
    <DropDownWrapper style={{ height: isActive ? "400px" : "0px" }}>
      {listItems?.length &&
        listItems?.map(({ name, innerRef }) => {
          return (
            <div
              key={name}
              className="item"
              onClick={(e) => onListClick(e, innerRef)}
            >
              {name}
            </div>
          );
        })}
    </DropDownWrapper>
  );
};

export const RoomImage = ({ image, content }) => {
  return (
    <ImageWrapper>
      <div className="inner-wrapper">
        <Image {...image} height={70} />
        <Overlay opacity={0.3} zIndex={1} />
      </div>
      <div className="content">{content}</div>
    </ImageWrapper>
  );
};
