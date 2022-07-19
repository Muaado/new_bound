import React, { createContext, useState } from "react";

export const NavLinkContext = createContext({
  pageName: "",
  navLinks: [],
  setPageName: undefined,
  setNavLinks: undefined,
});

export const NavLinkProvider = ({ children }) => {
  const [pageName, setPageName] = useState("");
  const [navLinks, setNavLinks] = useState([]);

  const resetValues = React.useCallback(() => {
    setPageName("");
    setNavLinks("");
  });

  return (
    <NavLinkContext.Provider
      value={{
        navLinks,
        pageName,
        setPageName,
        setNavLinks,
        resetValues,
      }}
    >
      {children}
    </NavLinkContext.Provider>
  );
};
