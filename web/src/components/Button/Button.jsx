import React from "react";
import { StyledButton } from "./elements";

export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
