import React from "react";
import styles from "./Register.module.css";
import TextInput from "../../components/TextInput/Textinput";
import registerSchema from "../../Schemas/registerSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { register } from "../../api/Api";
import { setUser } from "../../store/userSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const data = {
      name: values.name,
      address: values.address,
      number: values.number,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    const response = await register(data);

    if (response.status === 201) {
      const user = {
        _id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role,
        address: response.data.user.address,
        number: response.data.user.number,
        auth: response.data.auth,
      };

      dispatch(setUser(user));

      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      number: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,
  });

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.box}>
        <div className={styles.person}>
          <i className="bi bi-person-circle"></i>
        </div>
        <div className={styles.toptext}>
          <h5>SignUp</h5>
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

      <TextInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Confirm password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />

      <button
        className={styles.signupButton}
        onClick={handleSignup}
        disabled={
          !values.address ||
          !values.password ||
          !values.name ||
          !values.confirmPassword ||
          !values.email ||
          errors.address ||
          errors.password ||
          errors.confirmPassword ||
          errors.name ||
          errors.email
        }
      >
        Sign Up
      </button>

      <span className="text-dark">
        Already have an account?{" "}
        <button className={styles.login} onClick={() => navigate("/logIn")}>
          Log In
        </button>
      </span>

      {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
    </div>
  );
}

export default Register;
