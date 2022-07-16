import React from "react";
import Image from "gatsby-plugin-sanity-image";
import { Overlay } from "../Overlay";
import { navigate } from "gatsby";
import { JourneyStyles } from "./elements";

const Journey = ({ collections }) => {
  return (
    <JourneyStyles>
      <h2>Start your journey</h2>
      <ul className="images">
        {collections.edges
          .sort((a, b) => a.node.rank - b.node.rank)
          .map(({ node }) => (
            <div
              className="clickable"
              onClick={() => {
                navigate(`/collections/${node.slug.current}/`);
              }}
              key={node.name}
            >
              <div
                className="card-text-wrapper"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/collections/${node.slug.current}/`);
                }}
              >
                {node.CollectionPageName}
              </div>
              <Overlay className="overlay" />
              {node.image && node.image.asset && (
                <Image {...node.image} alt={node.image.alt} />
              )}
            </div>
          ))}
      </ul>
    </JourneyStyles>
  );
};

export default Journey;
