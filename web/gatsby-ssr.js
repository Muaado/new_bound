/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react";

export const wrapRootElement = ({ element }) => (
  <div
    className="root-parallax"
    bgImage="https://cdn.sanity.io/images/y7yu20xn/master/5779a34c7b24c85ccfc7af2f57860afb4fa5b4ce-3508x2480.jpg"
  >
    {element}
  </div>
);
