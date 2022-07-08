import React from "react";
import { StyledButton } from "./elements";

export const Button = ({ children, styles, ...props }) => {
  return (
    <StyledButton style={styles} {...props}>
      {children}
    </StyledButton>
  );
};
