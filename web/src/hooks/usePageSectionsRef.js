import { useRef, useCallback, createRef, useState, useEffect } from "react";

export const usePageSectionsRef = (sections) => {
  const sectionRefs = useRef({});
  const [navLinks, setNavLinks] = useState([]);
  useEffect(() => {
    const navLinks_ = sections.map(({ name, ...restContent }) => {
      const refName = `${name.split(" ")[0].toLowerCase()}Ref`;
      sectionRefs.current[refName] = createRef();
      return {
        name: name,
        innerRef: sectionRefs.current[refName],
        ...restContent,
      };
    });
    setNavLinks(navLinks_);
  }, []);
  return { ...sectionRefs?.current, navLinks };
};
