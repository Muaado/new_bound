import React, { useState } from "react";
import LightboxReact from "lightbox-react";
import "lightbox-react/style.css";

import { GalleryImage } from "./style";

import Image from "gatsby-plugin-sanity-image";

const Lightbox = ({ images, selectedImage, handleClose, showLightbox }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(selectedImage);

  const allImages = images?.map((image) => (
    <GalleryImage className={`gallery ${showLightbox ? "open" : ""}`}>
      {image && image.asset && <Image {...image} alt={image.alt} />}
    </GalleryImage>
  ));

  return (
    <LightboxReact
      className="modal"
      enableZoom={false}
      clickOutsideToClose={true}
      mainSrc={allImages[currentImageIndex]}
      nextSrc={allImages[(currentImageIndex + 1) % allImages.length]}
      prevSrc={
        allImages[(currentImageIndex + allImages.length - 1) % allImages.length]
      }
      onCloseRequest={handleClose}
      onMovePrevRequest={() =>
        setCurrentImageIndex(
          (currentImageIndex + images.length - 1) % images.length
        )
      }
      onMoveNextRequest={() =>
        setCurrentImageIndex((currentImageIndex + 1) % images.length)
      }
    />
  );
};

export default Lightbox;
