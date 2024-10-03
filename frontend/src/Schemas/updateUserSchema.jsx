import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const erroMessage = "use lowercase, uppercase and digits";

const updateUserSchema = yup.object().shape({
  name: yup.string().max(30).required("Name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  number: yup.number().required("Number is required"),
});

export default updateUserSchema;
