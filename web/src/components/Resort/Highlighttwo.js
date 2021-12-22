import Carousel from "nuka-carousel";
import React from "react";
import PortableText from "../Ui/portableText";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import Image from "gatsby-plugin-sanity-image";
import Placeholder from "../../assets/placeholder.svg";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";

const Highlightstwo = ({ title, highlights }) => {
  return (
      <h2>{title}</h2>
      <Carousel
        wrapAround
        withoutControls
        dragging={false}
        cellSpacing={10}
        renderBottomCenterControls={({ currentSlide }) => (
          <div>
            <div className="slider-control-bottomcenter">
              <ul>
                {highlights.map((highlight, index) => {
                  return (
                    <li key={index}>
                      <a href={highlight.link}>
                        <Image
                          alt={highlight.title}
                          fluid={highlight.image.asset.fluid}
                          placeholder={Placeholder}
                        />
                        <PortableText blocks={highlight.description} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      >
        <ul>
          {highlights.map((highlight, index) => {
            return (
              <li key={index}>
                <a href={highlight.link}>
                  <Image
                    alt={highlight.title}
                    fluid={highlight.image.asset.fluid}
                    placeholder={Placeholder}
                  />
                  <PortableText blocks={highlight.description} />
                </a>
              </li>
            );
          })}
        </ul>
      </Carousel>
    </HighlightsStyles>
  );
};
export default Highlightstwo;