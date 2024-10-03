import React from "react";
import styles from "./UpdateUser.module.css";
import updateUserSchema from "../../Schemas/updateUserSchema";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "../../components/TextInput/Textinput";
import { useFormik } from "formik";
import { setUser } from "../../store/userSlice";
import { update } from "../../api/Api";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { name, _id, email, address, number } = useSelector(
    (state) => state.user
  );

  const handleUpdate = async () => {
    const data = {
      name: values.name,
      address: values.address,
      number: values.number,
      email: values.email,
      id: _id,
    };

    const response = await update(data);

    if (response.status === 200) {
      const user = {
        _id: response.data.updatedUser._id,
        name: response.data.updatedUser.name,
        email: response.data.updatedUser.email,
        role: response.data.updatedUser.role,
        address: response.data.updatedUser.address,
        number: response.data.updatedUser.number,
        auth: response.data.auth,
      };

      dispatch(setUser(user));
      navigate("/check-out");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: name,
      email: email,
      address: address,
      number: number,
    },

    validationSchema: updateUserSchema,
  });

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.box}>
        <div className={styles.person}>
          <i className="bi bi-person-circle"></i>
        </div>
        <div className={styles.toptext}>
          <h5>Update Information</h5>
        </div>
      </div>
      <TextInput
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />

      <TextInput
        type="text"
        name="address"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Address"
        error={errors.address && touched.address ? 1 : undefined}
        errormessage={errors.address}
      />
      <TextInput
        type="number"
        name="number"
        value={values.number}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Number"
        error={errors.number && touched.number ? 1 : undefined}
        errormessage={errors.number}
      />

      <TextInput
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email"
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />

      <button
        className={styles.signupButton}
        onClick={handleUpdate}
        disabled={
          !values.address ||
          !values.name ||
          !values.email ||
          errors.address ||
          errors.name ||
          errors.email
        }
      >
        update
      </button>

      {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
    </div>
  );
}

export default UpdateUser;
