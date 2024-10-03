import React from "react";
import styles from "./Card.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart } from "../../api/Api";
import { setCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

function Card({ item }) {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const handleCart = () => {
    const data = {
      productId: item._id,
      UserId: _id,
    };
    (async function addItemToCart() {
      const response = await addToCart(data);

      if (response.status === 201) {
        dispatch(setCart([...cart, response.data.cartResponse]));
      }
    })();
  };

  return (
    <>
      <div className="card mt-3 ms-3" style={{ width: "16rem" }}>
        <Link className={styles.link} to={`/product/details/${item._id}`}>
          <img
            src={item.imageUrl}
            className="card-img-top"
            alt="..."
            height="250"
          />
        </Link>
        <div className="card-body">
          <Link className={styles.link} to={`/product/details/${item._id}`}>
            <h5 className={`card-title ${styles.productName}`}>{item.name}</h5>
          </Link>
          <div className={styles.wrapper}>
            <h6
              className={`text-dark mt-2 ${styles.productPrice}`}
            >{`₹ ${item.price}`}</h6>
            <i
              className={`bi bi-cart-plus ${styles.cartIcon}`}
              onClick={handleCart}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
