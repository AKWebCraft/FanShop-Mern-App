import React from "react";
import styles from "./ReviewList.module.css";
import Review from "../Review/Review";

function ReviewList({ reviews }) {
  return (
    <div className={styles.commentListWrapper}>
      <div className={styles.commentList}>
        {reviews.length === 0 ? (
          <div className={styles.noReviews}>
            This Product has no reviews yet
          </div>
        ) : (
          reviews.map((review) => <Review key={review._id} review={review} />)
        )}
      </div>
    </div>
  );
}

export default ReviewList;
