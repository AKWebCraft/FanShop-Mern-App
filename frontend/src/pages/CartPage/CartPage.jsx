import React from "react";
import styles from "./CartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartItems } from "../../api/Api";
import { useEffect } from "react";
import { setCart } from "../../store/cartSlice";
import { deletecartItems } from "../../api/Api";
import { NavLink } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const { _id, name } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    (async function allCartItems() {
      const response = await cartItems(_id);

      if (response.status === 200) {
        dispatch(setCart(response.data.allCartItems));
      }
    })();
  }, []);

  //detele item
  const removeCartItem = (id) => {
    (async function deleteCartItem() {
      const response = await deletecartItems(id);

      if (response.status === 200) {
        try {
          let myCart = [...cart];
          let index = myCart.findIndex((item) => item._id === id);
          myCart.splice(index, 1);
          dispatch(setCart(myCart));
        } catch (error) {
          console.log(error);
        }
      }
    })();
  };

  return (
    <div className=" cart-page">
      <div className={`row bg-light ${styles.firstSection}`}>
        <div className="col-md-12">
          <h1 className={styles.firstSectionHeading}> {`Hello ${name}`}</h1>
          <p className="text-center">
            {name
              ? `You Have ${cart.length} ${
                  cart.length < 1 || cart.length === 1 ? "item" : "items"
                } in your cart`
              : " Please Login to see your cart"}
          </p>
        </div>
      </div>
      <hr />
      <div className="container ">
        <div className="row mt-5">
          <div className="col-md-7  p-0 m-0">
            {cart.map((item) => (
              <div className="row card flex-row mt-5 mb-5 p-2" key={item._id}>
                <div className="col-md-4">
                  <img
                    src={item.productId.imageUrl}
                    className="card-img-top"
                    alt="....."
                    width="100%"
                  />
                </div>
                <div className="col-md-4">
                  <p className={styles.productName}>{item.productId.name}</p>
                  <hr />
                  <p className={styles.description}>
                    {item.productId.description}
                  </p>
                  <hr />
                  <h6>{item.quantity}</h6>
                  <hr />
                  <h6>{`₹ ${item.productId.price}`}</h6>
                  <hr />
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(item._id)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 cart-summary text-center mt-5">
            {cart.length < 1 ? (
              <h2 className={styles.firstSectionHeading}>
                Add Items Into Your Cart
              </h2>
            ) : (
              <h2 className={styles.firstSectionHeading}>Check Out Now</h2>
            )}

            <hr />
            <div className="mt-5">
              {cart.length < 1 ? (
                <button className={styles.checkOutButton}>
                  {" "}
                  Add Products To Check Out
                </button>
              ) : (
                <NavLink to="/check-out">
                  <button className={styles.checkOutButton} disabled={!_id}>
                    {" "}
                    Check Out
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
