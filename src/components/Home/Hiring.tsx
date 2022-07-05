import React from 'react'

import { DiamondBox } from "../Diamond-Box";

const HiringDiamondStyles = {
  inner: "hiring-diamond-inner",
  outer: "hiring-diamond-outer",
};

export const Hiring = () => {
  return (
    <div className="hiring">
      <h1 className="hiring-banner">
        We're Hiring
      </h1>
      <div className="hiring-container">
        <div className="hiring-image-container">
          <DiamondBox
            classes={HiringDiamondStyles}
          >
            <p>Hi!</p>
            <p>Hi again!</p>
          </DiamondBox>

        </div>
        <div className="hiring-text-container">
          <h3>
            Welcome to your new family.
          </h3>
          <p>
            Lorem ipsum blah blah blah
          </p>
        </div>
      </div>

    </div>
  );
};
