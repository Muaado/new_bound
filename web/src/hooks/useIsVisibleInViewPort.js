import { useEffect, useState } from "react";

export const useIsVisibleInViewPort = (element, rootMargin) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      {
        // root: document.querySelector(".main-content"),
        rootMargin,
        // threshold: 0.5,
      }
    );

    element?.current && observer.observe(element.current);
    return () => {
      observer.disconnect();
    };
  }, [element?.current]);

  return isVisible;
};
