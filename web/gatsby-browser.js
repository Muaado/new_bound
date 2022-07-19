/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import { NavLinkProvider } from "./src/components";
import React from "react";
export const wrapRootElement = ({ element }) => (
  <div>
    <div className="root-parallax" />
    <div className="main-content">
      <NavLinkProvider>{element}</NavLinkProvider>
    </div>
  </div>
);
