import React, { MouseEventHandler } from 'react'

// This file handles the custom angled buttons
// for the site.

interface ButtonType {
  text: string,
  innerClassName?: string,
  outerClassName?: string,
  glowClassName?: string,
  onClick: MouseEventHandler,
}

interface FormButtonType {
  text?: string,
  type: string,
  value?: string,
  innerClassName?: string,
  outerClassName?: string,
  glowClassName?: string,
  onClick?: MouseEventHandler,
}

interface LinkButtonType {
  text: string,
  href: string,
  title?: string,
  innerClassName?: string,
  outerClassName?: string,
  glowClassName?: string,
}

export const Button = ({
  text,
  innerClassName = "",
  outerClassName = "",
  glowClassName = "",
  onClick,
}: ButtonType) => {
  const shadowName = `button-shadow ${glowClassName}`;
  const outerName = `button-outer ${outerClassName}`;
  const innerName = `button-inner ${innerClassName}`;

  return (
    <div className={shadowName}>
      <div className={outerName}>
        <button
          className={innerName}
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    </div>
  )
};

export const FormButton = ({
  text,
  innerClassName = "",
  outerClassName = "",
  glowClassName = "",
  onClick = () => {},
  type,
  value = "",
}: FormButtonType) => {
  const shadowName = `button-shadow ${glowClassName}`;
  const outerName = `button-outer ${outerClassName}`;
  const innerName = `button-inner ${innerClassName}`;

  return (
    <div className={shadowName}>
      <div className={outerName}>
        <input
          type={type}
          value={value}
          className={innerName}
          onClick={onClick}
        >
        </input>
      </div>
    </div>
  )
};
