import React from "react";
import styles from "./ProductDetails.module.css"
import image from "../../images/product-3.jpeg";

function ProductDetails() {
  return (
    <>
      <div className={styles.ProductDetails}>
        <div>
         <img src={image} alt="image" width={"400px"} />
        </div>

        <div>
          <div className={styles.detailsBlock1}>
            <h2>product.name</h2>
            <p>Product #</p>
          </div>
          <div className={styles.detailsBlock2}>
            {/* <Rating {...options} /> */}
            <span className={styles.detailsBlock2span}> (0 Reviews)</span>
          </div>
          <div className={styles.detailsBlock3}>
            <h1>{`₹price`}</h1>
            <div className={styles.detailsBlock31}>
              <div className={styles.detailsBlock311}>
                <button>-</button>
                <input readOnly type="number" />
                <button>+</button>
              </div>
              <button>Add to Cart</button>
            </div>

            <p>
              Status:
              <b>
                stock status
              </b>
            </p>
          </div>

          <div className={styles.detailsBlock4}>
            Description : <p>description</p>
          </div>

          <button className={styles.submitReview}>
            Submit Review
          </button>
        </div>
      </div>

      <h3 className={styles.reviewsHeading}>REVIEWS</h3>

      {/* <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <div className="reviews">
        {product.reviews &&
          product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
      </div>

      <p className="noReviews">No Reviews Yet</p> */}
    </>
  );
}

export default ProductDetails;
