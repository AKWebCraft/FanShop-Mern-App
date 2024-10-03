import React from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import styles from "./Products.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { getProducts } from "../../api/Api";
import { useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function getCategories() {
      const response = await getProducts();

      if (response.status === 200) {
        setProducts(response.data.products);
      }
    })();
  }, []);
  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h4 className="ms-5 mb-4">All Products</h4>
          <div className="d-flex flex-wrap ms-5">
            {products?.map((item) => (
              <NavLink
                key={item._id}
                to={`/update/product/${item._id}`}
                className={styles.link}
              >
                <div className="card m-2" style={{ width: "15rem" }}>
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className={`card-title ${styles.title}`}>
                      {item.name}
                    </h5>
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

export default Products;
