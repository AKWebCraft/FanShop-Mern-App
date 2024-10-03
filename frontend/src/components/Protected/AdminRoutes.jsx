import { Navigate } from "react-router-dom";
function AdminRoutes({ role, children }) {
  if (role === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default AdminRoutes;
