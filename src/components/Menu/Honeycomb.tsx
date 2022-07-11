import React, { ReactElement } from 'react'
import { ProductType } from "../../views/Menu";


interface HoneycombType {
  children?: ReactElement | ReactElement[],
  product: ProductType,
}

export const Honeycomb = (props: HoneycombType) => {
  const { product } = props;
  const link = `/menu/${product._id}`;
  return (
    <li className="honeycomb-cell">
      <a href={link} className="honeycomb-link">
        <img
          src={product.imageLink || ""}
          alt={product.name}
          className="honeycomb-image"
        />
        <h3
          className="honeycomb-title"
        >
          {product.name}
        </h3>
      </a>
    </li>
  );
};
