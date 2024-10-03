import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <h4 className={styles.sectionOneHeading}>Profile</h4>
          <NavLink
            to="/user/Orders"
            className="list-group-item list-group-item-action"
          >
            <i className="bi bi-border-style"></i> Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
