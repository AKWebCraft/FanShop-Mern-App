import React from "react";
import styles from "./UpdateProduct.module.css";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../store/categorySlice";
import { productDetail } from "../../api/Api";
import { updateProduct } from "../../api/Api";
import { deleteProduct } from "../../api/Api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Select } from "antd";
import FileBase from "react-file-base64";
const { Option } = Select;

function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(1);

  const categoriesState = useSelector((state) => state.categories);
  const { categories } = categoriesState;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    async function getProductDetails() {
      const response = await productDetail(id);
      if (response.status === 200) {
        setName(response.data.product.name);
        setDescription(response.data.product.description);
        setPrice(response.data.product.price);
        setStock(response.data.product.Stock);
        setImageUrl(response.data.product.imageUrl);
        setCategory(response.data.product.category.name);
      }
    }
    getProductDetails();
  }, []);

  const handleUpdate = () => {
    const data = {
      name,
      description,
      price,
      imageUrl,
      category,
      Stock,
    };

    updateProduct(id, data);
  };

  // DELETING PRODUCT
  const handleDelete = () => {
      deleteProduct(id)
      navigate("/products");
  }

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3>Update product</h3>

            <div className="mb-3">
              <Select
                variant={false}
                placeholder="select category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <button className="btn btn-outline-secondary">
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setImageUrl(base64)}
                  />
                </button>
              </div>
              <div className="mb-3">
                {imageUrl && (
                  <div>
                    <img
                      src={imageUrl}
                      alt="product-photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Set Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={Stock}
                  placeholder="Set Stock"
                  className="form-control"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="mb-3 d-flex">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Product
                </button>
                <button className="btn btn-danger ms-5" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
