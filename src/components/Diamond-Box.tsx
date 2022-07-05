import React, { ReactElement } from 'react'

interface DiamondBoxClasses {
  inner: string,
  outer: string,
}

interface DiamondBoxType {
  children: ReactElement | ReactElement[],
  classes?: DiamondBoxClasses,
}

export const DiamondBox = ({ children, classes }: DiamondBoxType) => {
  const outerClass = `diamond-outer ${classes?.outer}`;
  const innerClass = `diamond-inner ${classes?.inner}`;

  return (
    <div className={outerClass}>
      <div className={innerClass}>
        {children}
      </div>
    </div>
  );
}
