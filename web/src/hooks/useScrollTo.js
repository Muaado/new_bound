import { useEffect, useRef } from "react";

const scrollToRef = (ref) => {
  if (ref) {
    ref?.current?.scrollIntoView(true);
  }
};

export const useScrollToRef = () => {
  let elementRef = useRef(null);
  const executeScroll = (ref) => {
    scrollToRef(ref || elementRef);
  };
  useEffect(() => {
    return () => {
      elementRef = null;
    };
  }, []);

  return { elementRef, executeScroll };
};
