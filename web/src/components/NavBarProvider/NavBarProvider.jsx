import React, { createContext, useState } from "react";

export const NavBarContext = createContext({
  pageName: "",
  navLinks: [],
  setPageName: undefined,
  setNavLinks: undefined,
  setActiveNavLink: undefined,
  activeNavLink: "",
  setHeroRef: undefined,
  heroRef: null,
});

export const NavBarProvider = ({ children }) => {
  const [pageName, setPageName] = useState("");
  const [navLinks, setNavLinks] = useState([]);
  const [heroRef, setHeroRef] = useState(null);
  const [activeNavLink, setActiveNavLink] = useState("");

  const resetValues = React.useCallback(() => {
    setPageName("");
    setNavLinks("");
    setHeroRef(null);
  });

  const setHeroRef_ = (ref) => {
    if (ref) {
      setHeroRef(ref);
    }
  };

  return (
    <NavBarContext.Provider
      value={{
        navLinks,
        pageName,
        setPageName,
        setNavLinks,
        resetValues,
        setHeroRef: setHeroRef_,
        heroRef,
        activeNavLink,
        setActiveNavLink,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};
