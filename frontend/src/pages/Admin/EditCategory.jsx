import React from "react";
import styles from "./EditCategory.module.css";
import { useParams } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { getCategory } from "../../api/Api";
import { useState } from "react";
import { useEffect } from "react";
import { updateCategory } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

function EditCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [categoryImg, setCategoryImg] = useState("");
  const params = useParams();
  const { id } = params;

  const handleUpdate = async () => {
    const data = {
      name,
      categoryImg,
      id,
    };

    const response = await updateCategory(data);

    if (response.status === 200) {
      navigate("/Manage-categories");
    }
  };

  useEffect(() => {
    (async function getSingleCategory() {
      const response = await getCategory(id);

      if (response.status === 200) {
        setName(response.data.category.name);
        setCategoryImg(response.data.category.categoryImg);
      }
    })();
  }, []);

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3 className="ms-5">Edit Category</h3>
          <div className="p-3">
            <div className={styles.container}>
              <div className={`mb-3 ${styles.box}`}>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.btn}`}
                  onClick={handleUpdate}
                >
                  update
                </button>
              </div>
            </div>
          </div>
          <div className="row ms-5" style={{ width: "50%" }}>
            <button className="btn btn-outline-secondary">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setCategoryImg(base64)}
              />
            </button>
            <div className="mt-5">
              {categoryImg && (
                <div>
                  <img
                    src={categoryImg}
                    alt="product-photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
