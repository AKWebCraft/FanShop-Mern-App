import React from "react";
import styles from "./Header.module.css"
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
         <div className={styles.logo}>
           <h3 className="mt-3">SHOP-NOW</h3>
         </div>

          <ul className="nav col-12 col-lg-auto me-lg-auto ms-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink to="/" className="nav-link px-2 text-white">
                Home
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/products" className="nav-link px-2 text-white">
                All products
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/" className="nav-link px-2 text-white">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link px-2 text-white">
                Contact us
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" className="nav-link px-2 text-white">
                Admin
              </NavLink>
            </li>
          </ul>

        </div>
      </div>
    </header>
  );
}

export default Header;
