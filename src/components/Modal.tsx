import React, { MouseEventHandler, ReactElement, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

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
  onClose?: MouseEventHandler,
  containerClassName?: string,
};

enum ModalPart {
  header = "header",
  body = "body",
  footer = "footer",
}

export const Modal = ({
  header = {},
  body,
  footer = {},
  isVisible = false,
  children,
  onClose = () => {},
  containerClassName = "",
}: ModalType) => {
  if (!isVisible) return null;

  const getModalContent = (
    baseElement: string,
    content: ModalContentType,
    onClose: MouseEventHandler | undefined = () => {},
    children: ReactNode | undefined = undefined,
  ): ReactElement | undefined => {
    if (Object.keys(content).length === 0) return undefined;

    if (baseElement === "header") {
      const cssClass = `modal-header ${content.className}`;
      return (
        <>
          <div className={cssClass}>
            <h3 className="modal-header-text">
              {content.text}
            </h3>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={onClose}
            />
          </div>
          <hr />
        </>
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

  const containerClass =
    `modal-container ${containerClassName}`;

  return createPortal (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className={containerClass}>
        { getModalContent("header", header, onClose) }
        { getModalContent("body", body, undefined, children) }
        { getModalContent("footer", footer) }
      </div>
    </>,
    document.getElementById('portal')!,
  )
}
