import React from "react";
import styles from "./Banner.module.css";

function Banner({ setKeyword }) {
  return (
    <>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.searchBox}`}>
          <input
            type="search"
            className={`form-control form-control-dark text-bg-dark ${styles.searchInput}`}
            placeholder="Search Products..."
            aria-label="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
