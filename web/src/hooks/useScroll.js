import { useEffect, useState } from "react";

export const useScoll = ({
  scrollHeightToHide = 80,
  scrollHeightToShow = 0,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const scrollEvent = window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > scrollHeightToHide) {
      setIsVisible(false);
    }
    if (winScroll <= scrollHeightToShow) {
      setIsVisible(true);
    }
  };
  return [isVisible];
};
