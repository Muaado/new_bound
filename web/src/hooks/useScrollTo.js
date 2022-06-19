import { useRef } from "react";

const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: "smooth" });

export const useScrollToRef = () => {
  const elementRef = useRef(null);
  const executeScroll = () => scrollToRef(elementRef);
  return { elementRef, executeScroll };
};