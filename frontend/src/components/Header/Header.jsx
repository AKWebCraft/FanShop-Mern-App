import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { logout } from "../../api/Api";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { setCart } from "../../store/cartSlice";
import { cartItems } from "../../api/Api";
import { useEffect } from "react";
import ProfileImg from "../../images/ProfilePic.png";
import { reSetCart } from "../../store/cartSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.auth);
  const { name, role, _id } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const handleLogOut = async () => {
    await logout();
    dispatch(resetUser());
    dispatch(reSetCart());
    navigate("/logIn");
  };

  useEffect(() => {
    (async function allCartItems() {
      const response = await cartItems(_id);

      if (response.status === 200) {
        dispatch(setCart(response.data.allCartItems));
      }
    })();
  }, []);

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <div className={styles.logo}>
            <h3 className="mt-3">FanShop</h3>
          </div>

          <ul className="nav col-12 col-lg-auto me-lg-auto ms-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.activeStyle : styles.inActiveStyle
                }
              >
                <i className="bi bi-house"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? styles.activeStyle : styles.inActiveStyle
                }
              >
                <i className="bi bi-file-earmark-person"></i> AboutMe
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? styles.activeStyle : styles.inActiveStyle
                }
              >
                <i className="bi bi-phone"></i> ContactMe
              </NavLink>
            </li>
          </ul>
          <div className="me-5">
            {name && (
              <NavLink
                to={`${role === "admin" ? "/admin" : "/user"}`}
                className="nav-link px-2 text-white"
              >
                <span className="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
                  <img
                    className="rounded-circle me-1"
                    width="24"
                    height="24"
                    src={ProfileImg}
                    alt=""
                  />
                  {name}
                </span>
              </NavLink>
            )}
          </div>
          <div className="d-flex">
            {isAuthenticated ? (
              <div>
                {" "}
                <button
                  type="button"
                  className={styles.logout}
                  onClick={handleLogOut}
                >
                  <i
                    className={`bi bi-box-arrow-right ${styles.logOutIcon}`}
                  ></i>
                </button>
              </div>
            ) : (
              <div className={styles.registerBox}>
                <NavLink
                  to="/register"
                  className="d-flex"
                  style={{ textDecoration: "none" }}
                >
                  <i
                    className={`bi bi-person-circle ${styles.RegisterIcon}`}
                  ></i>
                  <p className={styles.txt}>Register</p>
                </NavLink>
                <NavLink to="/logIn" style={{ textDecoration: "none" }}>
                  <p className={styles.txt}>/LogIn</p>
                </NavLink>
              </div>
            )}
            <div className="mt-1">
              <NavLink to="/cart" className="nav-link px-2 text-white">
                <Badge
                  count={cart.length}
                  showZero
                  offset={[10, -5]}
                  className="text-white"
                >
                  <i className={`bi bi-bag-check ${styles.bag}`}></i>
                </Badge>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
