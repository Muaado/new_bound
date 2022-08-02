import { useLayoutEffect, useState } from "react";

export const useScoll = ({
  scrollHeightToHide = 80,
  scrollHeightToShow = 0,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [pageYOffset, setPageYOffset] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  useLayoutEffect(() => {
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
    setScrollPosition(winScroll);
    setScrollX(window.screenX);
    setScrollY(window.scrollY);
    setPageYOffset(window.pageYOffset);
    setInnerHeight(window.innerHeight);
  };
  return [
    isVisible,
    scrollPosition,
    scrollX,
    scrollY,
    pageYOffset,
    innerHeight,
  ];
};
