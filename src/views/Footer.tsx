import React, { Component } from 'react'

import "../css/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer-banner">
          { /* Basically the It's Finger Lickin' Good */ }
        </div>
        <div className="footer-menu">

        </div>
        <div className="footer-legal">
          <ul className="footer-legal-links">
            <li><a href=""><span>
              Privacy
            </span></a></li>
            <li><a href=""><span>
              Terms & Conditions
            </span></a></li>
            <li><a href=""><span>
              Waiver
            </span></a></li>
          </ul>
          <div className="footer-copyright">
            <p>
              © 205 - 206 Wacky Wackers Food and Services Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
}

export default Footer;
