import React, { ReactElement } from 'react'

import { DiamondBox } from "../Diamond-Box";
import { Button } from '../Buttons';

import HiringImg1 from "../../imgs/hiring stock image 1.jpg";
import HiringImg2 from "../../imgs/hiring stock image 2.jpg";
import HiringImg3 from "../../imgs/hiring stock image 3.jpg";

const HiringDiamondStyles = {
  inner: "hiring-diamond-inner",
  outer: "hiring-diamond-outer",
};

interface HiringDivType {
  image: string,
  children: ReactElement | ReactElement[],
}

const HiringDiv = ({
  image,
  children,
}: HiringDivType) => {
  return (
    <div className="hiring-container">
      <div className="hiring-image-container">
        <DiamondBox
          classes={HiringDiamondStyles}
        >
          <img src={image} alt="" />
        </DiamondBox>

      </div>
      <div className="hiring-text-container">
        {children}
      </div>
    </div>
  );
}

export const Hiring = () => {
  return (
    <div className="hiring">
      <h1 className="hiring-banner">
        We're Hiring
      </h1>
      <HiringDiv image={HiringImg1}>
        <h3>
          Welcome to your new family.
        </h3>
        <p>
          Lorem ipsum blah blah blah
        </p>
      </HiringDiv>
      <HiringDiv image={HiringImg2}>
        <h3>
          Welcome to your new family.
        </h3>
        <p>
          Lorem ipsum blah blah blah
        </p>
      </HiringDiv>
      <HiringDiv image={HiringImg3}>
        <h3>
          Welcome to your new family.
        </h3>
        <p>
          Lorem ipsum blah blah blah
        </p>
      </HiringDiv>
      <a
        href="mailto:hiring@wackywackers.com"
        className="hiring-link"
      >
        <Button
          text="Get in touch"
          glowClassName="hiring-button-glow"
          outerClassName="hiring-button-outer"
          innerClassName="hiring-button-inner"
          onClick={() => {}}
        />
      </a>
    </div>
  );
};
