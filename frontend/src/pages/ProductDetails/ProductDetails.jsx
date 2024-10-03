import React from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/Api";
import { useEffect, useState } from "react";
import { addToCart } from "../../api/Api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/cartSlice";
import { createReview } from "../../api/Api";
import { getReviews } from "../../api/Api";
import ReviewList from "../../components/ReviewList/ReviewList";

function ProductDetails() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(false);
  const params = useParams();
  const { id } = params;

  const { _id } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    (async function getProductDetails() {
      const response = await getProduct(id);

      if (response.status === 200) {
        setProduct(response.data.product);
      }
    })();
  }, []);

  useEffect(() => {
    (async function getProductReviews() {
      const response = await getReviews(id);

      if (response.status === 200) {
        setReviews(response.data.reviews);
        setCount(response.data.reviewsCount);
      }
    })();
  }, [reload]);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handleCart = () => {
    const data = {
      productId: product._id,
      UserId: _id,
      quantity: quantity,
    };
    (async function addItemToCart() {
      const response = await addToCart(data);

      if (response.status === 201) {
        dispatch(setCart([...cart, response.data.cartResponse]));
      }
    })();
  };

  const reviewHandler = async () => {
    const data = {
      author: _id,
      product: id,
      review: newReview,
    };

    const response = await createReview(data);

    if (response.status === 201) {
      setNewReview("");
      setReload(!reload);
    }
  };

  const stockColor = product.Stock < 1 ? "red" : "green";

  return (
    <>
      <div className={styles.ProductDetails}>
        <div>
          <img src={product.imageUrl} alt="image" width={"400px"} />
        </div>

        <div>
          <div className={styles.detailsBlock1}>
            <h2>{product.name}</h2>
            <p>{product._id}</p>
          </div>
          <div className={styles.detailsBlock2}>
            <span className={styles.detailsBlock2span}>
              {" "}
              {`(${count} Reviews)`}
            </span>
          </div>
          <div className={styles.detailsBlock3}>
            <h1>{`₹${product.price}`}</h1>
            <div className={styles.detailsBlock31}>
              <div className={styles.detailsBlock311}>
                <button onClick={decreaseQuantity}>-</button>
                <input
                  className={styles.stockk}
                  readOnly
                  type="number"
                  value={quantity}
                />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button onClick={handleCart} disabled={!_id}>
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b style={{ color: stockColor }}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className={styles.detailsBlock4}>
            Description : <p>{product.description}</p>
          </div>
        </div>
      </div>

      <h3 className={styles.reviewsHeading}>REVIEWS</h3>

      <div className={styles.comentBox}>
        <div className={styles.commentsWrapper}>
          <div className="container">
            <input
              className={styles.input}
              placeholder="Type review here..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button
              className={styles.postCommentButton}
              onClick={reviewHandler}
              disabled={!_id}
            >
              Submit Review
            </button>
          </div>
          <div className={`container mt-5 mb-5 ${styles.reviewsContainer}`}>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
