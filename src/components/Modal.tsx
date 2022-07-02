import React, { MouseEventHandler, ReactElement, ReactNode, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalContentType {
  text?: string,
  className?: string,
};

interface ModalType {
  header?: ModalContentType,
  body: ModalContentType,
  footer?: ModalContentType,
  isVisible: boolean,
  children?: ReactNode,
};

export const Modal = ({
  header = {},
  body,
  footer = {},
  isVisible = false,
  children,
}: ModalType) => {
  if (!isVisible) return null;

  const getModalContent = (
    baseElement: string,
    content: ModalContentType,
    onClick: MouseEventHandler | undefined = () => {},
    children: ReactNode | undefined = undefined,
  ): ReactElement | undefined => {
    if (Object.keys(content).length === 0) return undefined;

    if (baseElement === "header") {
      const cssClass = `modal-header ${content.className}`;
      return (
        <div className={cssClass}>
          <h3 className="modal-header-text">
            {content.text}
          </h3>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onClick}
          />
        </div>
      );
    }
    else if (baseElement === "body") {
      const cssClass = `modal-body ${content.className}`;
      return (
        <div className={cssClass}>
          <p className="modal-body-text">
            {content.text}
          </p>
          {children}
        </div>
      );
    }
    else if (baseElement === "footer") {
      const cssClass = `modal-footer ${content.className}`;
      return (
        <div className={cssClass}>
          <h5 className="modal-footer-text">
            {content.text}
          </h5>
        </div>
      );
    }

    else return undefined;
  }

  return (
    <div className="modal-container">
      { getModalContent("header", header) }
      { getModalContent("body", body) }
      { getModalContent("footer", footer) }
    </div>
  )
}
