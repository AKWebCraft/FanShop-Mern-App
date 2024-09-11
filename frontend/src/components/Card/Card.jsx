import React from "react";
import producti from "../../images/product-3.jpeg";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import styles from "./Card.module.css";
import "bootstrap-icons/font/bootstrap-icons.css"

function Card({ item }) {
  return (
    <>
      <div className="card mt-3 ms-3" style={{ width: "16rem" }}>
        <Link className={styles.link} to={`/product/details/${item._id}`}>
          <img src={producti} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className={`card-title ${styles.title}`}>{item.name}</h5>
            <div className={styles.cardDetails}>
              <ReactStars
                edit={false}
                color="rgba(20,20,20,0.1)"
                activeColor="tomato"
                size={window.innerWidth < 600 ? 20 : 25}
                value={item.ratings}
                isHalf={true}
              />{" "}
              <span className="mt-2">{`(${item.numOfReviews} Reviews)`}</span>
            </div>
            <div className={styles.fotr}>
            <span className="text-dark">{`₹${item.price}`}</span>
            <i className="bi bi-cart4"></i>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Card;
