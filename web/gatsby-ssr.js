/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react";

export const wrapRootElement = ({ element }) => (
  <div>
    <div className="root-parallax" />
    <div className="main-content"> {element}</div>
  </div>
);
