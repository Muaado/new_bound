import React from "react";
import Header from "./header_new";

import AOS from "aos";

import { GlobalStyle } from "../styles/GlobalStyle";
import "../styles/typography.css";

import "aos/dist/aos.css";
import Footer from "./Footer";
import "../styles/layout.css";

import { Helmet } from "react-helmet";
import { BottomToTopScroll } from "./Scroll";

const windowGlobal = typeof window !== "undefined";
if (windowGlobal) AOS.init();

const Layout = ({
  children,
  siteTitle,
  navData,
  logo,
  location,
  contactUs,
  headerDropdownImage,
}) => {
  return (
    <>
      <BottomToTopScroll />
      <Helmet>
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js-na1.hs-scripts.com/21013560.js"
        ></script>
      </Helmet>
      <Header
        logo={logo}
        location={location}
        navData={navData}
        siteTitle={siteTitle}
        headerDropdownImage={headerDropdownImage}
      />

      {children}
      <Footer logo={logo} contactUs={contactUs} />
      <GlobalStyle />
    </>
  );
};

export default Layout;
