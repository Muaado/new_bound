import { useEffect, useState } from "react";

export const useIsVisibleInViewPort = (element, rootMargin) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    if (element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setState(entry.isIntersecting);
        },
        { rootMargin }
      );

      element?.current && observer.observe(element.current);

      return () => observer.unobserve(element.current);
    }
  }, [element?.current]);

  return isVisible;
};
