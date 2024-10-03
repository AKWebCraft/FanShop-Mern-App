import React from "react";
import { Link } from "react-router-dom";
import styles from "./CartItem.module.css";

function CartItem() {
  return (
    <div className={styles.CartItemCard}>
      <img src="....." alt="ssa" />
      <div>
        <Link to="#">
          <span>Product Name</span>
        </Link>
        <span>Price</span>
        <p>Remove</p>
      </div>
    </div>
  );
}

export default CartItem;
