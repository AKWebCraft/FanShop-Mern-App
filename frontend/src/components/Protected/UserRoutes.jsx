import { Navigate } from "react-router-dom";
function UserRoutes({ role, children }) {
  if (role === "user") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default UserRoutes;
