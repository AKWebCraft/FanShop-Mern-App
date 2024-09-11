import React from "react";
import styles from "./Banner.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Banner({ searchHandler, setKeyword }) {
  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.rw}>
        <div className={styles.col1}>
          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button className="btn btn-primary" onClick={searchHandler}>
              Search
            </button>
          </form>
        </div>
        <div className={styles.col2}>
          {" "}
          <div className="text-end">
            <button type="button" className="btn btn-primary me-2">
              Login
            </button>
            <button type="button" className="btn btn-warning">
              Sign-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
