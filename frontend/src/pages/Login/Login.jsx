import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Login.module.css";
import loginSchema from "../../Schemas/loginSchema";
import TextInput from "../../components/TextInput/Textinput";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/Api";
import { setUser } from "../../store/userSlice";

function Login() {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const data = {
      name: values.name,
      password: values.password,
    };

    const response = await login(data);

    if (response.status === 200) {
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
      password: "",
    },

    validationSchema: loginSchema,
  });

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.box}>
        <div className={styles.person}>
          <i className="bi bi-person-circle"></i>
        </div>
        <div className={styles.toptext}>
          <h5>Login</h5>
        </div>
      </div>

      <TextInput
        type="text"
        value={values.name}
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />
      <TextInput
        type="password"
        value={values.password}
        name="password"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <button className={styles.logInButton} onClick={handleLogin}>
        Log In
      </button>
      <span className={styles.bottomTxt}>
        Don't have an account?{" "}
        <button
          className={styles.createAccount}
          onClick={() => navigate("/register")}
        >
          {" "}
          Register
        </button>
      </span>
      {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
    </div>
  );
}

export default Login;
