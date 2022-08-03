import { useEffect, useRef } from "react";

const scrollToRef = ({ ref, scrollTo, topMargin }) => {
  if (ref) {
    if (scrollTo) {
      window.scrollTo(0, ref?.current.offsetTop - topMargin);
    } else {
      ref?.current?.scrollIntoView(true);
    }
  }
};

export const useScrollToRef = (scrollTo = false, topMargin = 0) => {
  let elementRef = useRef(null);
  const executeScroll = (ref) => {
    scrollToRef({ ref: ref || elementRef, scrollTo, topMargin });
  };
  useEffect(() => {
    return () => {
      elementRef = null;
    };
  }, []);

  return { elementRef, executeScroll };
};
