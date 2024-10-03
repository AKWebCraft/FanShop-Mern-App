import React from "react";
import { getOrders } from "../../api/Api";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Orders.module.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState({});
  const { name, role, _id } = useSelector((state) => state.user);
  useEffect(() => {
    (async function getallOrders() {
      const response = await getOrders();

      if (response.status === 200) {
        setOrders(response.data.allCofirmOrders);
      }
    })();
  }, []);

  return (
    <div className="container-flui p-3 m-3 dashboard">
      <div className={`row ${styles.wrapper}`}>
        <div className="col-md-9">
          <h1 className={`text-center ${styles.heading}`}>All Orders</h1>
          <hr />
          {orders?.map((o) => {
            return (
              <div className="border shadow" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{o.status}</td>
                      <td>{name}</td>
                      <td>{new Date(o.createdAt).toDateString()}</td>
                      <td>Cash On Delievry</td>
                      <td>{o.products.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o.products.map((p) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className={`col-md-4 ${styles.imgContainer}`}>
                        <img
                          src={p.imageUrl}
                          className="card-img-top"
                          alt={p.name}
                        />
                      </div>
                      <div className="col-md-8 ms-4">
                        <h5>{p.name}</h5>
                        <p>{p.description}</p>
                        <p>Price : {`₹ ${p.price}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;
