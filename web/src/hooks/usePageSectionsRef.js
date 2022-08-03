import { useRef, useCallback, createRef, useState, useEffect } from "react";

export const usePageSectionsRef = (sections) => {
  const sectionRefs = useRef({});
  const contentRefs = useRef({});
  const [navLinks, setNavLinks] = useState([]);
  useEffect(() => {
    const navLinks_ = sections.map(
      ({ name, isDropDown, content, ...restContent }) => {
        const refName = `${name.split(" ")[0].toLowerCase()}Ref`;
        sectionRefs.current[refName] = createRef();
        const content_ =
          content?.length &&
          content?.map(({ name, onClick }) => {
            return {
              name,
              innerRef: (contentRefs.current[name] = createRef()),
              onClick,
            };
          });
        return {
          name: name,
          innerRef: sectionRefs.current[refName],
          content: isDropDown ? content_ : content,
          isDropDown,
          ...restContent,
        };
      }
    );
    setNavLinks(navLinks_);
  }, []);
  return { ...sectionRefs?.current, contentRefs: contentRefs, navLinks };
};
