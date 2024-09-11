import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AdminMenu.module.css"

function AdminMenu() {
  return (
    <div className="text-center">
      <div className={`list-group dashboard-menu ${styles.menu}`}>
        <h4 className={styles.heading}>Admin Panel</h4>
        <NavLink
          to="/create/category"
          className={`list-group-item list-group-item-action ${styles.link}`}
        >
          Create Category
        </NavLink>
        <NavLink to="/create/product" className={`list-group-item list-group-item-action ${styles.link}`}>
          Create Product
        </NavLink>
        <NavLink to="/products" className={`list-group-item list-group-item-action ${styles.link}`}>
          Products
        </NavLink>
        <NavLink to="/" className={`list-group-item list-group-item-action ${styles.link}`}>
          Orders
        </NavLink>
        <NavLink to="/" className={`list-group-item list-group-item-action ${styles.link}`}>
          Users
        </NavLink>
      </div>
    </div>
  );
}

export default AdminMenu;
