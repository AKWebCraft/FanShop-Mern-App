import React from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { useParams } from "react-router-dom";
import styles from "./EditCategory.module.css";

function EditCategory() {
  const params = useParams();
  const { id } = params;

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
                <input type="text" className="form-control" />
              </div>
              <div>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.btn}`}
                >
                  update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
