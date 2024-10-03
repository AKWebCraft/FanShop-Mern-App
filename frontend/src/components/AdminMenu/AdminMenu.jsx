import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AdminMenu.module.css";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/Manage-categories"
            className="list-group-item list-group-item-action text-start"
            style={{}}
          >
            <i className="bi bi-sliders me-2"></i> Manage Categories
          </NavLink>
          <NavLink
            to="/create/product"
            className="list-group-item list-group-item-action text-start"
          >
            <i className="bi bi-sliders me-2"></i> Create Product
          </NavLink>
          <NavLink
            to="/project/reviews"
            className="list-group-item list-group-item-action text-start"
          >
            <i className="bi bi-sliders me-2"></i> Project Reviews
          </NavLink>
          <NavLink
            to="/products"
            className="list-group-item list-group-item-action text-start"
          >
            <i className="bi bi-sliders me-2"></i> Products
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
