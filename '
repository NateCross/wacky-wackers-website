import React, { Component, ReactElement } from 'react'
import { ObjectId } from 'mongodb';

import "../css/Menu.css";
import { Honeycomb } from "../components/Menu/Honeycomb";

const MenuDbURL = 'http://localhost:5000/products';

export interface ProductType {
  _id: ObjectId,
  price: number,
  name: string,
  category?: string,
  imageLink?: string,
};

interface MenuElements {
  [category: string]: ProductType[],
};

interface MenuStateType {
  menuItems: ProductType[],
}

export default class Menu extends Component {
  // Note: Make constructor here
  // needs an onClick for menu items
  // since the App will have the state of the cart

  state = {
    menuItems: [],
  }

  async fetchMenuItems() {
    const response = await fetch(MenuDbURL);

    if (!response.ok) {
      const message = `
        An error occurred: ${response.statusText}
      `;
      window.alert(message);
      return;
    }

    const menuItems = await response.json();
    this.setState({
      menuItems,
    });
  }

  createMenuItems(): ReactElement | ReactElement[] {
    const { menuItems } = this.state;

    // Declaring an empty object here.
    // Its keys are to be categories of products,
    // the values are to be arrays of that category
    // from the menuItems.

    // const menuElements: MenuElements = {};
    // menuItems.forEach((value: ProductType, index) => {
    //   const category = value.category || "";
    //   menuElements[category] = menuElements[category] || [];
    //
    //   menuElements[category].push(value);
    // });
    // console.log(menuElements);

    const menuElements = menuItems.reduce<MenuElements>((prev, current: ProductType) => {
      const category = current.category || "";
      prev[category] = prev[category] || [];
      prev[category].push(current);

      return prev;
    }, {});

    return (
      <div className="menu-container">
        {
          Object.keys(menuElements).map((value) => {
            return (
              <section className="menu-section">
                <h2 className="menu-section-header">{value}</h2>
                <hr />
                <ul className="menu-section-container">
                  {
                    menuElements[value].map((val, ind) => {
                      return (
                        <Honeycomb
                          product={val}
                          key={ind}
                        />
                      )
                    })
                  }

                </ul>
                { /* Insert honeycomb component here */ }
              </section>
            )
          })
        }
      </div>
    );
  }

  componentDidMount() {
    this.fetchMenuItems();
  }

  render() {
    return (
      <div className="page-menu">
        {this.createMenuItems()}
      </div>
    );
  }
}
