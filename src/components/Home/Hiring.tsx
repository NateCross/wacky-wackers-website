import React from 'react'

import { DiamondBox } from "../Diamond-Box";

import HiringImg1 from "../../imgs/hiring stock image 1.jpg";

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
            <img src={HiringImg1} alt="" />
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
