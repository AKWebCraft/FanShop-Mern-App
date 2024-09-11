import React from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../store/categorySlice";
import { addProduct } from "../../store/productSlice";
import { useState } from "react";
import { Select } from "antd";
import FileBase from "react-file-base64";
const { Option } = Select;

function CreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState(" ");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(1);

  const categoriesState = useSelector((state) => state.categories);
  const { categories } = categoriesState;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleCreate = () => {
    const data = {
      name,
      description,
      price,
      imageUrl,
      category,
      Stock,
    };

    dispatch(addProduct(data));
    navigate("/products");
  };

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3>create product</h3>

            <div className="mb-3">
              <Select
                variant={false}
                placeholder="select category"
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
                  placeholder="Product name"
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
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
