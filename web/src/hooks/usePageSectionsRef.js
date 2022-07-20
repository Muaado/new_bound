import { useRef, useCallback, createRef, useState, useEffect } from "react";

export const usePageSectionsRef = (sections) => {
  const sectionRefs = useRef({});
  const [navLinks, setNavLinks] = useState([]);
  useEffect(() => {
    const navLinks_ = sections.map((section) => {
      const refName = `${section.split(" ")[0].toLowerCase()}Ref`;
      sectionRefs.current[refName] = createRef();
      return {
        name: section,
        innerRef: sectionRefs.current[refName],
      };
    });
    setNavLinks(navLinks_);
  }, []);
  return { ...sectionRefs?.current, navLinks };
};
