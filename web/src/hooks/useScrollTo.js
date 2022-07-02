import { useEffect, useRef } from "react";

const scrollToRef = (ref) =>
  ref?.current?.scrollIntoView({ alignToTop: false });
export const useScrollToRef = () => {
  let elementRef = useRef(null);
  const executeScroll = () => scrollToRef(elementRef);
  useEffect(() => {
    return () => {
      elementRef = null;
    };
  }, []);
  return { elementRef, executeScroll };
};
