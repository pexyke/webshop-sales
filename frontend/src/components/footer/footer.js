import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer>
      <div className="container">
        <div className="footerInside">
          <div className="footerNav">
            <p>
              <Link to="/">Főoldal</Link>
            </p>
            <p>
              <Link to="/contact">Rólunk</Link>
            </p>
            <p>
              <Link to="/">Termékek</Link>
            </p>
          </div>
          <div className="footerNav">
            <p>
              <Link to="/cart">Kosár</Link>
            </p>
            <p>
              <Link to="/blog">blog</Link>
            </p>            
          </div>
          <div className="send-email">            
            <p>Feliratkozáshoz</p>
            <p>küldjön e-mailt</p>
          </div>
          <div className="footerMedia">
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
