import React from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/categorySlice";
import Form from "../../components/Form/Form";
import { useState } from "react";
import { addCategory } from "../../store/categorySlice";
import { NavLink } from "react-router-dom";

function CreateCategory() {
  const dispatch = useDispatch();

  const [name, setName] = useState(" ");

  const categoriesState = useSelector((state) => state.categories);
  const { categories } = categoriesState;


  const handleSubmit = () => {
    dispatch(addCategory({ name: name }));
    dispatch(getAllCategories())
    setName("");
  };


  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage Categoriers</h1>
          <div className="p-3">
            <Form handleSubmit={handleSubmit} name={name} setName={setName} />
          </div>
          <div className="card w-80 p-3">
            <table className="table">
              <thead>
                <tr>
                  <th col="">Name</th>
                  <th col="">Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td col="">{c.name}</td>
                      <td col="">
                        <NavLink to={`/edit/category/${c._id}`}>
                          <button className="btn btn-primary ms-2">edit</button>
                        </NavLink>
                        <NavLink to={`/delete/category/${c._id}`}>
                          <button className="btn btn-danger ms-2">
                            delete
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

export default CreateCategory;
