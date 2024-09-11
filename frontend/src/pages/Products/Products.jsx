import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../store/productSlice";
import { useSelector } from "react-redux";
import styles from "./Products.module.css";
import { NavLink } from "react-router-dom";

function Product() {
  const dispatch = useDispatch();

  const productsstate = useSelector((state) => state.products);
  const { products } = productsstate;

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3 className="text-center">All Products</h3>
          <div className="d-flex flex-wrap ms-5">
            {products?.map((item) => (
              <NavLink key={item._id} to={`/update/product/${item._id}`} className={styles.link}>
                <div className="card m-2" style={{ width: "15rem" }}>
                  <img src={item.imageUrl} className="card-img-top" alt={item.name}/>
                  <div className="card-body">
                    <h5 className={`card-title ${styles.title}`}>{item.name}</h5>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
