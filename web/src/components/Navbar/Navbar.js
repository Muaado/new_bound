import React from "react";
import { LogoWrapper, NavWrapper } from "./elements";
import { Link } from "gatsby";
import HamburgerIcon from "../../assets/icons/menu-solid.svg";
import Image from "gatsby-plugin-sanity-image";
import { useScoll, useScrollToRef, useNavLink } from "../../hooks";

export const NavBar = ({ logo, onMenuClick }) => {
  const [_, scrollPosition] = useScoll({
    scrollHeightToHide: undefined,
    scrollHeightToShow: undefined,
  });

  const { navLinks, pageName } = useNavLink();

  const renderNavBar = () => {
    switch (pageName) {
      case "homepage":
        return (
          <>
            <NavWrapper className={`${scrollPosition > 0 ? "blur-bg" : ""}`}>
              <DefaultNavContent
                scrollPosition={scrollPosition}
                hideDivider={scrollPosition > 0}
                logo={logo}
                onMenuClick={onMenuClick}
                pageName={pageName}
              />
            </NavWrapper>
            {/* {!(scrollPosition > 0) && <div className="divider" />} */}
          </>
        );
      case "resort":
        return (
          <NavBarWithBottonLinks
            logo={logo}
            pageName={pageName}
            onMenuClick={onMenuClick}
            navLinks={navLinks}
          />
        );
      default:
        return (
          <NavWrapper className={`${scrollPosition > 0 ? "blur-bg" : ""}`}>
            <DefaultNavContent
              scrollPosition={scrollPosition}
              hideDivider={scrollPosition > 0}
              logo={logo}
              onMenuClick={onMenuClick}
              pageName={pageName}
            />
          </NavWrapper>
        );
    }
  };
  return renderNavBar();
};

export const NavBarWithBottonLinks = ({
  pageName,
  logo,
  onMenuClick,
  navLinks,
}) => {
  const [_, scrollPosition] = useScoll({
    scrollHeightToHide: undefined,
    scrollHeightToShow: undefined,
  });
  const { __, executeScroll } = useScrollToRef();

  const isScrollOnTop = scrollPosition <= 100;
  const navBarStyle = { height: "8rem" };
  return (
    <NavWrapper
      className={`${isScrollOnTop ? "black-bg" : ""}`}
      style={navBarStyle}
    >
      {isScrollOnTop ? (
        <>
          <DefaultNavContent
            scrollPosition={scrollPosition}
            logo={logo}
            onMenuClick={onMenuClick}
            pageName={pageName}
          />
        </>
      ) : null}

      <NavWrapper
        className={`${isScrollOnTop ? "black-bg" : "blur-bg"} secondary-nav`}
        style={navBarStyle}
        bottomNav
      >
        <ul className="container">
          <li className="page-title">{pageName}</li>
          {navLinks.map(({ name, innerRef }) => (
            <li
              onClick={() => {
                console.log("test", innerRef);
                executeScroll(innerRef);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      </NavWrapper>
    </NavWrapper>
  );
};

const DefaultNavContent = ({ onMenuClick, logo, hideDivider }) => {
  return (
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
