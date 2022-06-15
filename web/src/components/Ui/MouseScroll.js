import React from "react";
import styled from "styled-components";
import { device } from "../../styles/deviceSizes";

const MouseScrollStyles = styled.div`
  position: absolute;
  bottom: 4rem;
  transform: translate(-50%, 0);
  left: 50%;
  height: 20%;
  body {
    background: #222;
  }

  .arrow {
    opacity: 1;
    position: absolute;
    top: 50%;
    transform-origin: 50% 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .arrow-first {
    animation: arrow-movement 2s ease-in-out infinite;
  }
  .arrow-second {
    animation: arrow-movement 2s 1s ease-in-out infinite;
  }

  .arrow:before,
  .arrow:after {
    background: #fff;
    content: "";
    display: block;
    height: 3px;
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
  }

  .arrow:before {
    transform: rotate(45deg) translateX(-23%);
    transform-origin: top left;
  }

  .arrow:after {
    transform: rotate(-45deg) translateX(23%);
    transform-origin: top right;
  }

  // Animation
  @keyframes arrow-movement {
    0% {
      opacity: 0;
      top: 40%;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const MouseScroll = () => (
  <MouseScrollStyles className="disappear-on-scroll">
    {/* <div className="mouse">
      <div className="wheel"></div>
    </div> */}
    <div class="arrow arrow-first"></div>
    <div class="arrow arrow-second"></div>
    {/* <div className="container">
     <span className="m_scroll_arrows unu"></span> 
      <span className="m_scroll_arrows doi"></span>
      <span className="m_scroll_arrows trei"></span>
    </div> */}
  </MouseScrollStyles>
);
