import { useContext, useEffect } from "react";
import { NavBarContext } from "../components";
export const useNavBar = () => useContext(NavBarContext);
