import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./ConfirmOrder.module.css";
import { newOrder } from "../../api/Api";
import { reSetCart } from "../../store/cartSlice";
import { clearCart } from "../../api/Api";
import { useNavigate } from "react-router-dom";

function ConfirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, name } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.productId.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "PKR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async () => {
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      products.push(cart[i].productId._id);
    }

    const data = {
      products: products,
      buyer: _id,
    };

    const response = await newOrder(data);
    if (response.status === 201) {
      console.log("Waho Arslan you have dont it");
    }

    const resetCart = await clearCart(_id);

    if (resetCart.status === 200) {
      console.log(resetCart.data.message);
      dispatch(reSetCart());
    }
    navigate("/user/Orders");
  };

  return (
    <div className=" cart-page">
      <div className={`row bg-light ${styles.firstSection}`}>
        <div className="col-md-12">
          <i className={`bi bi-bank ${styles.bankIcon}`}></i>
          <p className={styles.firstSectionHeading}>Confirm Order</p>
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
                    width="50%"
                  />
                </div>
                <div className="col-md-4">
                  <h5 className="mt-5 ms-5">{item.productId.name}</h5>
                  <hr />
                  <h5 className="mt-5 ms-5">{`₹ ${item.productId.price}`}</h5>
                  <hr />
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 cart-summary text-center mt-5">
            <h3 className={styles.secondSectionHeading}>Order Summary</h3>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            <div className="mt-5">
              <NavLink to="#">
                <button
                  className={styles.conFirmOrderButton}
                  onClick={handleConfirm}
                >
                  Confirm Order
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
