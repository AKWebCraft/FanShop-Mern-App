import React from "react";
import UserMenu from "../../components/UserMenu/UserMenu";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";

function UserDashboard() {
  const { name, _id, email, address, number } = useSelector(
    (state) => state.user
  );
  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <div className={styles.profileBox}>
              <i className={`bi bi-person-circle ${styles.UserIcon}`}></i>
              <h3 className={styles.userName}>{name}</h3>
            </div>
            <hr />
            <h6> id : {_id}</h6>
            <hr />
            <h6> Email : {email}</h6>
            <hr />
            <h6> Number : {number}</h6>
            <hr />
            <h6> Address : {address}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
