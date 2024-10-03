import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUS/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ManageCategories from "./pages/Admin/ManageCategories";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditCategory from "./pages/Admin/EditCategory";
import DeleteCategory from "./pages/Admin/DeleteCategory";
import UserDashboard from "./pages/User/UserDashboard";
import Profile from "./pages/User/Profile";
import Orders from "./pages/User/Orders";
import useAutoLogin from "./hooks/userAutoLogin";
import Loader from "./components/Loader/Loader";
import AdminRoutes from "./components/Protected/AdminRoutes";
import UserRoutes from "./components/Protected/UserRoutes";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CartPage from "./pages/CartPage/CartPage";
import CheckOut from "./pages/User/CheckOut";
import ConfirmOrder from "./pages/User/ConfirmOrder";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import AuthRoutes from "./components/Protected/AuthRoutes";
import ProjectReviews from "./pages/Admin/ProjectReviews";

function App() {
  const { role, _id } = useSelector((state) => state.user);
  const loading = useAutoLogin();
  return loading ? (
    <Loader text="..." />
  ) : (
    <BrowserRouter>
      <div>
        <Header />
        <div
          className="container-fluid"
          style={{ minHeight: "80vh", padding: "0px" }}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/contact" element={<ContactUs />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/logIn" element={<Login />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route
              exact
              path="/check-out"
              element={
                <AuthRoutes _id={_id}>
                  <CheckOut />
                </AuthRoutes>
              }
            />
            <Route
              exact
              path="/confirm-order"
              element={
                <AuthRoutes _id={_id}>
                  <ConfirmOrder />
                </AuthRoutes>
              }
            />
            <Route exact path="/update-info" element={<UpdateUser />} />

            <Route
              exact
              path="/Admin"
              element={
                <AdminRoutes role={role}>
                  <AdminDashboard />
                </AdminRoutes>
              }
            />
            <Route
              exact
              path="/Manage-categories"
              element={
                <AdminRoutes role={role}>
                  <ManageCategories />
                </AdminRoutes>
              }
            />
            <Route
              exact
              path="/edit-category/:id"
              element={
                <AdminRoutes role={role}>
                  <EditCategory />
                </AdminRoutes>
              }
            />
            <Route
              exact
              path="/delete-category/:id"
              element={
                <AdminRoutes role={role}>
                  <DeleteCategory />
                </AdminRoutes>
              }
            />
            <Route
              exact
              path="/create/product"
              element={
                <AdminRoutes role={role}>
                  <CreateProduct />
                </AdminRoutes>
              }
            />
            <Route
              exact
              path="/product/details/:id"
              element={<ProductDetails />}
            />
            <Route
              exact
              path="/update/product/:id"
              element={
                <AdminRoutes role={role}>
                  <UpdateProduct />
                </AdminRoutes>
              }
            />
            <Route
              exact
              path="/products"
              element={
                <AdminRoutes role={role}>
                  <Products />
                </AdminRoutes>
              }
            />
            <Route
              exact
              path="/project/reviews"
              element={
                <AdminRoutes role={role}>
                  <ProjectReviews />
                </AdminRoutes>
              }
            />
            <Route
              exact
              path="/user"
              element={
                <UserRoutes role={role}>
                  <UserDashboard />
                </UserRoutes>
              }
            />
            <Route
              exact
              path="/user/profile"
              element={
                <UserRoutes role={role}>
                  <Profile />
                </UserRoutes>
              }
            />
            <Route
              exact
              path="/user/Orders"
              element={
                <UserRoutes role={role}>
                  <Orders />
                </UserRoutes>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
