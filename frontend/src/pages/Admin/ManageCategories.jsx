import React, { useState } from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import Form from "../../components/Form/Form";
import { getAllCategories } from "../../api/Api";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { createCategory } from "../../api/Api";
import FileBase from "react-file-base64";
import styles from "./Categories.module.css";

function ManageCategories() {
  const [name, setName] = useState("");
  const [categoryImg, setCategoryImg] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = async () => {
    const data = {
      name,
      categoryImg,
    };
    // console.log(data)
    const response = await createCategory(data);
    if (response.status === 201) {
      setNewCategory(response.data.category.name);
      setName("");
    }
  };

  useEffect(() => {
    (async function getCategories() {
      const response = await getAllCategories();

      if (response.status === 200) {
        setCategories(response.data.apiResponse);
      }
    })();
  }, [newCategory]);

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h4 className="ms-3">Manage Categories</h4>
          <div className="p-3 w-50">
            <Form handleSubmit={handleSubmit} name={name} setName={setName} />
            <div>
              <button className="btn btn-outline-secondary">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setCategoryImg(base64)}
                />
              </button>
            </div>
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td col="">{c.name}</td>
                      <td col="">
                        <NavLink to={`/edit-category/${c._id}`}>
                          <button className={styles.Button}>
                            {" "}
                            <i className="bi bi-pencil-square me-2"></i>edit
                          </button>
                        </NavLink>
                        <NavLink to={`/delete-category/${c._id}`}>
                          <button className={styles.deleteButton}>
                            <i className="bi bi-trash me-2"></i> delete
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCategories;
