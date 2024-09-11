import React from "react";
import Banner from "../../components/Banner/Banner";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllCategories } from "../../store/categorySlice";
import { filterProducts } from "../../store/productSlice";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [category, setCategory] = useState();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { filterProduct, productsCount, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.products);

  // const totalPages = productsCount/resultPerPage;

  useEffect(() => {
    dispatch(filterProducts({ category, keyword, currentPage }));
  }, [category, keyword, currentPage]);

  let totalPages;

  if (category) {
    totalPages = filteredProductsCount / resultPerPage;
  }else {
    totalPages = productsCount / resultPerPage;
  }

  const categoriesState = useSelector((state) => state.categories);
  const { categories } = categoriesState;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const searchHandler = (e) => {
    e.preventDefault();
    // dispatch(filterProducts({keyword}))
  };

  return (
    <div>
      <Banner setKeyword={setKeyword} searchHandler={searchHandler} />
      <div className="row mt-5">
        <div className="col-md-3">
          <h5>Filter by Category</h5>
          <div className="d-flex flex-column">
            <ul>
              {categories &&
                categories.map((c) => (
                  <li
                    className={styles.cat}
                    key={c._id}
                    onClick={() => setCategory(c._id)}
                  >
                    {c.name}
                  </li>
                ))}
            </ul>
          </div>
          <h5>Filter by Price</h5>
          <div className="d-flex flex-column">
            <h3>price</h3>
          </div>
        </div>
        <div className="col-md-9">
          <div className={styles.heading}>
            <h3>FEATURED PRODUCTS</h3>
          </div>
          <div className="d-flex flex-wrap">
            {filterProduct &&
              filterProduct.map((item) => <Card key={item._id} item={item} />)}
          </div>
        </div>
      </div>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Home;
