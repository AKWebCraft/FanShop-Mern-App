import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const erroMessage = "use lowercase, uppercase and digits";

const registerSchema = yup.object().shape({
  name: yup.string().max(30).required("Name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  number: yup.number().required("Number is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: erroMessage })
    .required("password can't be empity"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password must match")
    .required("confirm password can't be empity"),
});

export default registerSchema;
