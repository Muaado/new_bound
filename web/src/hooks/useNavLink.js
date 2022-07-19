import React, { useContext } from "react";
import { NavLinkContext } from "../components";
export const useNavLink = () => useContext(NavLinkContext);
