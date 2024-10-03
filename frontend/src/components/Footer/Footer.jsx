import React from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import { createProjectReview } from "../../api/Api";
import { useSelector } from "react-redux";
import { useState } from "react";

function Footer() {
  const [review, setReview] = useState("");
  const { _id } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    const data = {
      review: review,
      author: _id,
    };

    const response = await createProjectReview(data);

    if (response.status === 201) {
      setReview("");
    }
  };

  return (
    <div className={`container-fluid ${styles.container}`}>
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h5>Quick Links</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <NavLink to="/" className="nav-link p-0 text-white">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item mb-2">
                  <NavLink to="/about" className="nav-link p-0 text-white">
                    About Me
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5>Contact Me</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a
                    href="mailto:arslankhalil660@gmail.com"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <i
                      className="bi bi-envelope-at"
                      style={{ fontSize: "20px" }}
                    ></i>{" "}
                    Email
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a
                    href="https://wa.me/03095508115"
                    style={{ textDecoration: "none", color: "white" }}
                    target="_blank"
                  >
                    <i
                      className="bi bi-whatsapp"
                      style={{ fontSize: "20px" }}
                    ></i>{" "}
                    Whatsapp
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3">
              <h5>My MERN Ecommerce Project</h5>
              <p>Don't forget to leave a review about my work.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label
                  htmlFor="newsletter1"
                  className="visually-hidden"
                ></label>
                <input
                  type="text"
                  value={review}
                  className="form-control"
                  placeholder="Leave Review Here..."
                  onChange={(e) => setReview(e.target.value)}
                />
                <button
                  className={styles.submitButton}
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2024 Company, Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
