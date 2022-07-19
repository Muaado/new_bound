import { useEffect, useRef } from "react";

const scrollToRef = (ref) => ref?.current?.scrollIntoView();

export const useScrollToRef = () => {
  let elementRef = useRef(null);
  const executeScroll = (ref) => scrollToRef(ref || elementRef);
  useEffect(() => {
    return () => {
      elementRef = null;
    };
  }, []);

  return { elementRef, executeScroll };
};
