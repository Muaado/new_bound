import React from "react";
import { useScoll } from "../../hooks";
import { MouseScrollStyles, MainWrapper } from "./elements";
import { Overlay } from "../Overlay";
const PAGE_TYPE_HOME = "home";
export const MouseScroll = ({
  scrollHeightToHide,
  scrollHeightToShow,
  scrollWrapperStyles,
  mainWrapperStyle,
  pageType = "",
}) => {
  const [isVisible] = useScoll({ scrollHeightToHide, scrollHeightToShow });

  const mouseScrollComponent = (
    <MouseScrollStyles style={scrollWrapperStyles}>
      <div class="arrow arrow-first"></div>
      <div class="arrow arrow-second"></div>
    </MouseScrollStyles>
  );

  return isVisible ? (
    pageType === PAGE_TYPE_HOME ? (
      mouseScrollComponent
    ) : (
      <MainWrapper style={mainWrapperStyle}>
        <Overlay bgColor="white" opacity={1} />
        {mouseScrollComponent}
      </MainWrapper>
    )
  ) : null;
};
