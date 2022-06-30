import React from "react";
import Image from "gatsby-plugin-sanity-image";
import { Overlay } from "../Overlay";
import { Link } from "gatsby";
import { getCollectionUrl } from "../../lib/helpers";
import { JourneyStyles } from "./elements";
import { useIsTablet } from "../../hooks";
import { Carousel } from "../Carousel";

const Journey = ({ collections }) => {
  const isTablet = useIsTablet();
  return (
    <JourneyStyles>
      <h2>Start your journey</h2>
      {!isTablet ? (
        <ul className="images">
          {collections.edges
            .sort((a, b) => a.node.rank - b.node.rank)
            .map(({ node }) => (
              <Link
                to={`/collections/${node.slug.current}/`}
                className="clickable"
                key={node.name}
              >
                <div className="card-text-wrapper">
                  {node.CollectionPageName}
                </div>
                <Overlay className="overlay" />
                {node.image && node.image.asset && (
                  <Image {...node.image} alt={node.image.alt} />
                )}
              </Link>
            ))}
        </ul>
      ) : (
        <Carousel
          speed={1000}
          className="carousel"
          slidesToShow={1}
          disableEdgeSwiping
          dragging
          renderCenterRightControls={() => ""}
          renderCenterLeftControls={() => ""}
        >
          {collections.edges
            .sort((a, b) => a.node.rank - b.node.rank)
            .map(({ node }) => (
              <Link
                key={node.alt}
                className="carousel__image-container clickable"
                to={getCollectionUrl({ name: node.name, type: node.type })}
              >
                <div className="card-text-wrapper">
                  {node.CollectionPageName}
                </div>
                {node.image && node.image.asset && (
                  <Image {...node.image} alt={node.image.alt} />
                )}
              </Link>
            ))}
        </Carousel>
      )}
    </JourneyStyles>
  );
};

export default Journey;
