import React from "react";
import Carousel_ from "nuka-carousel";
import ChevronRightIcon from "../../assets/icons/chevron-right-circle.svg";
import ChevronLeftIcon from "../../assets/icons/chevron-left-circle.svg";
import { StyledButton } from "./elements";

export const Carousel = ({
  children,
  totalItems,
  getCurrentSlideIndex,
  ...props
}) => {
  return (
    <Carousel_
      speed={1000}
      adaptiveHeight={true}
      className="carousel"
      renderTopCenterControls={({ currentSlide }) => {
        getCurrentSlideIndex?.(currentSlide);
      }}
      renderCenterLeftControls={({ previousSlide, currentSlide }) => {
        return (
          <StyledButton
            type="button"
            disabled={currentSlide === 0}
            onClick={previousSlide}
          >
            <ChevronLeftIcon />
          </StyledButton>
        );
      }}
      renderCenterRightControls={({ nextSlide, currentSlide }) => (
        <StyledButton
          type="button"
          disabled={currentSlide === totalItems - 1}
          onClick={nextSlide}
        >
          <ChevronRightIcon />
        </StyledButton>
      )}
      {...props}
    >
      {children}
    </Carousel_>
  );
};
