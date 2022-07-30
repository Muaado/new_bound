import React from "react";
import { ScrollWrapper } from "./elements";
import { useScoll } from "../../hooks";
import ChevronUp from "../../assets/icons/chevron-up.svg";
export const BottomToTopScroll = () => {
  const [_, scrollPosition, __] = useScoll({
    scrollHeightToHide: undefined,
    scrollHeightToShow: undefined,
  });

  const isMaxScroll = scrollPosition > 200;
  return (
    <ScrollWrapper className={`left-nav ${isMaxScroll ? "show" : ""}`}>
      <button
        type="button"
        onClick={() => {
          const windowGlobal = typeof window !== "undefined";
          if (windowGlobal) {
            window.scrollTo(0, 0);
          }
        }}
      >
        <ChevronUp />
      </button>
    </ScrollWrapper>
  );
};
