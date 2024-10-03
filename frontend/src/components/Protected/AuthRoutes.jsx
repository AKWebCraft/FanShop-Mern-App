import { Navigate } from "react-router-dom";

function AuthRoutes({ _id, children }) {
  if (_id) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default AuthRoutes;
