import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import styles from "./CheckOut.module.css";
import { NavLink } from "react-router-dom";

function CheckOut() {
  const { name, _id, email, address, number } = useSelector(
    (state) => state.user
  );
  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <div className={styles.Wrapper}>
              <i className={`bi bi-truck ${styles.truckIcon}`}></i>
              <h3 className={styles.name}>Shipping Address</h3>
            </div>
            <hr />
            <h6> id : {_id}</h6>
            <hr />
            <h6> Name : {name}</h6>
            <hr />
            <h6> Email : {email}</h6>
            <hr />
            <h6> Number : {number}</h6>
            <hr />
            <h6> Address : {address}</h6>
            <hr />
            <div className={styles.btnContainer}>
              <NavLink to="/update-info" style={{ textDecoration: "none" }}>
                <p className={styles.btn}>Update Shipping Address!</p>
              </NavLink>
              <NavLink to="/confirm-order" style={{ textDecoration: "none" }}>
                <p className={styles.btn}>
                  Next <i className="bi bi-arrow-right"></i>
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
