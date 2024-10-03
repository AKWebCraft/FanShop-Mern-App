import React, { useEffect } from "react";
import { filterProducts } from "../../api/Api";
import { useState } from "react";
import Pagination from "react-js-pagination";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import { getAllCategories } from "../../api/Api";
import Banner from "../../components/Banner/Banner";
import { Prices } from "../../components/Prices/Prices";
import { Radio } from "antd";

function Home() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState("");
  const [price, setPrice] = useState([0, 25000]);

  const [products, setProducts] = useState([]);
  const [filteredProductsCount, setFilteredProductsCount] = useState(0);
  const [resultPerPage, setResultPerPage] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    (async function getAllProducts() {
      const response = await filterProducts({
        keyword,
        category,
        currentPage,
        price,
      });

      if (response.status === 200) {
        setProducts(response.data.products);
        setFilteredProductsCount(response.data.filteredProductsCount);
        setResultPerPage(response.data.resultPerPage);
      }
    })();
  }, [category, currentPage, keyword, price]);

  useEffect(() => {
    (async function getCategories() {
      const response = await getAllCategories();

      if (response.status === 200) {
        setCategories(response.data.apiResponse);
      }
    })();
  }, []);

  return (
    <>
      <Banner setKeyword={setKeyword} />
      <div className="container">
        <div className="row mt-5">
          <div className={`col-md-3 ${styles.FilterBox}`}>
            <h5 className={styles.filterHeading}>Find by Category</h5>
            <hr />
            <div className="d-flex flex-column">
              {categories &&
                categories.map((c) => (
                  <span
                    className="badge d-flex align-items-center p-1 pe-2 text-warning-emphasis
                       bg-warning-subtle border border-warning-subtle
                        rounded-pill mt-2 mb-2"
                    style={{ cursor: "pointer" }}
                    key={c._id}
                    onClick={() => setCategory(c._id)}
                  >
                    <img
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                      src={c.categoryImg}
                      alt=""
                    />
                    {c.name}
                  </span>
                ))}
            </div>
            <hr />
            <h5 className={styles.filterHeading}>Find by Price</h5>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setPrice(e.target.value)}>
                {Prices.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="col-md-9">
            <div className={styles.heading}>
              <h3 className={styles.productsHeading}>FEATURED PRODUCTS</h3>
            </div>
            <div className={styles.productsBox}>
              {products &&
                products.map((item) => (
                  <Card
                    key={item._id}
                    item={item}
                    cart={cart}
                    setCart={setCart}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className={styles.paginaton}>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={filteredProductsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
