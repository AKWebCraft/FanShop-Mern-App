import React from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { getAllCategories } from "../../api/Api";
import { getProduct } from "../../api/Api";
import { updateProduct } from "../../api/Api";
import { deleteProduct } from "../../api/Api";
import { deleteReviews } from "../../api/Api";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./UpdateProduct.module.css";
import { useParams } from "react-router-dom";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
const { Option } = Select;

function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function getCategories() {
      const response = await getAllCategories();

      if (response.status === 200) {
        setCategories(response.data.apiResponse);
      }
    })();
  }, []);

  useEffect(() => {
    (async function getProductDetails() {
      const response = await getProduct(id);

      if (response.status === 200) {
        setName(response.data.product.name);
        setDescription(response.data.product.description);
        setPrice(response.data.product.price);
        setStock(response.data.product.Stock);
        setImageUrl(response.data.product.imageUrl);
        setCategory(response.data.product.category.name);
      }
    })();
  }, []);

  const handleUpdate = async () => {
    const data = {
      id,
      name,
      description,
      price,
      imageUrl,
      category,
      Stock,
    };

    // console.log(data)

    const response = await updateProduct(data);
    if (response.status === 200) {
      console.log(response.data);
      navigate("/products");
    }
  };

  // DELETING PRODUCT
  const handleDelete = async () => {
    const response = await deleteProduct(id);
    if (response.status === 200) {
      console.log(response.data.message);
      navigate("/products");
    }

    const clearReviews = await deleteReviews(id);

    if (clearReviews.status === 200) {
      console.log("i love you Alishba");
    }
  };

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h4 className="ms-3 mb-4">Update Product</h4>

            <div className="mb-3">
              <Select
                variant={false}
                placeholder="Update category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <div className="mb-3">
                  <input
                    type="text"
                    readOnly
                    value={category}
                    className="form-control"
                  />
                </div>
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
                <button className={styles.Button} onClick={handleUpdate}>
                  <i
                    className="bi bi-pencil-square"
                    style={{ fontSize: "17px" }}
                  ></i>{" "}
                  Update Product
                </button>
                <button className={styles.deleteButton} onClick={handleDelete}>
                  <i className="bi bi-trash" style={{ fontSize: "17px" }}></i>{" "}
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
