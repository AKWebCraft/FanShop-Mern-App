import React from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import styles from "./DeleteCategory.module.css"

function DeleteCategory() {
  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3 className="ms-5">Delete Category</h3>
          <div className="p-3">
            <div className={styles.container}>
              <div className={`mb-3`}>
                <h5>Category Name</h5>
              </div>
              <div>
                <p>Are you sure you want to this category category?</p>
              </div>
              <div>
                <button
                  type="submit"
                  className={`btn btn-danger`}
                >
                  Yes
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ms-5`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategory;
