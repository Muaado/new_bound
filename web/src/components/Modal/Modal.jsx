import React, { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import CloseSvg from "../../assets/icons/close.svg";
import {
  StyledModel,
  ModalContent,
  SvgWrapper,
  ModalHeader,
  ModalBody,
} from "./elements";

const createWrapperAndAppendToBody = (wrapperId) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export const Modal = ({
  children,
  headerText,
  handleClose,
  isOpen,
  alignContentCenter,
  contentStyle,
}) => {
  if (!isOpen) return null;
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <StyledModel onClick={handleClose}>
        <ModalBody>
          <ModalHeader>
            <div className="circle"></div>
            <h2>{headerText}</h2>
          </ModalHeader>
          <ModalContent
            alignContentCenter={alignContentCenter}
            style={contentStyle}
          >
            <SvgWrapper>
              <CloseSvg />
            </SvgWrapper>
            {children}
          </ModalContent>
        </ModalBody>
      </StyledModel>
    </ReactPortal>
  );
};

const ReactPortal = ({ children, wrapperId }) => {
  const [wrapperElement, setWrapperElement] = useState(null);
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);
  if (wrapperElement === null) return null;
  return createPortal(children, wrapperElement);
};
