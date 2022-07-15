import React, { useEffect, useState } from "react";
import LightBox from "./lightbox";
// import Image from "next/image"
import Image from "gatsby-plugin-sanity-image";

import { Carousel } from "../Carousel";
import useWindowSize from "../../lib/useWindowSize";

import Placeholder from "../../assets/placeholder.svg";

const GalleryComponent = ({ images, styles }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [numberOfSlides, setNumberOfSlides] = useState(3);
  const [cellSpacing, setCellSpacing] = useState(10);
  const size = useWindowSize();

  useEffect(() => {
    const { width } = size;
    const isMobileOnly = width <= 576;
    const isTablet = width > 576 && width < 780;
    const isTabletL = width > 780 && width < 992;
    const isSreenSM = width > 992 && width < 1024;
    const isSreenLG = width > 1024 && width < 1440;
    const screenXL = width > 1440 && width < 1600;
    const screenXXL = width > 1600 && width < 1700;
    const screenXXXL = width > 1700;

    const slides = () => {
      if (isMobileOnly) return 1;
      if (isTablet) return 1;
      if (isTabletL) return 1;
      if (isSreenSM) return 1;
      if (isSreenLG) return 1;
      if (screenXL) return 1;
      if (screenXXL) return 1;
      if (screenXXXL) return 1;
      return 1;
    };
    const spacing = () => {
      // if (isMobileOnly) return 50;
      if (isMobileOnly) return 0;
      if (isTablet) return 0;
      if (isTabletL) return 20;
      if (isSreenSM) return 20;
      if (isSreenSM) return 20;
      // return 200;
      return 0;
    };

    setNumberOfSlides(slides);
    setCellSpacing(spacing);
  }, [size]);

  const handleOpen = (index) => {
    setSelectedImage(index);
    setShowLightbox(true);
  };

  const handleClose = () => {
    setShowLightbox(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Carousel
        cellSpacing={cellSpacing}
        slidesToShow={numberOfSlides}
        totalItems={images?.images?.length}
        getCurrentSlideIndex={(activeSlide) => setSelectedImage(activeSlide)}
        style={styles}
        className=""
      >
        {images?.images.length
          ? images.images.map((image, index) => (
              <React.Fragment key={image.alt}>
                {image && image.asset && (
                  <Image
                    {...image}
                    alt={image.alt}
                    onClick={() => handleOpen(index)}
                  />
                )}
              </React.Fragment>
            ))
          : [1, 2, 3].map((item) => <Placeholder />)}
      </Carousel>

      {showLightbox && selectedImage !== null ? (
        <LightBox
          showLightbox={showLightbox}
          images={images?.images}
          handleClose={handleClose}
          selectedImage={selectedImage}
        />
      ) : null}
    </>
  );
};
export default GalleryComponent;
