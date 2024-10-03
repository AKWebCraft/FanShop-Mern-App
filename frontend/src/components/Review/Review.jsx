import React from "react";
import styles from "./Review.module.css";

function Review({ review }) {
  const date = new Date(review.createdAt).toDateString();
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.author}>
          {" "}
          <i className="bi bi-person"></i> {review.author.name}
        </div>
        <div className={styles.date}>
          <i className="bi bi-calendar-check"></i> {date}
        </div>
        <div className={styles.reviewtText}>{review.review}</div>
      </div>
    </div>
  );
}

export default Review;
