import styled from "styled-components";
export const MouseScrollStyles = styled.div`
  position: absolute;
  bottom: 4rem;
  transform: translate(-50%, 0);
  left: 50%;
  height: 10%;
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
    animation: arrow-movement 3s ease-in-out infinite;
  }
  .arrow-second {
    animation: arrow-movement 2s 3s ease-in-out infinite;
  }

  .arrow:before,
  .arrow:after {
    background: var(--primary);
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
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
      top: 30%;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 5vh;
`;
