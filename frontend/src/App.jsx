import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Search from "./pages/Search/Search";
import Products from "./pages/Products/Products";
import AdminDasboard from "./pages/AdminDashboard/AdminDashboard";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import CreateCategory from "./pages/CreateCategory/CreateCategory";
import EditCategory from "./pages/EditCategory/EditCategory";
import DeleteCategory from "./pages/DeleteCategory/DeleteCategory";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <div className="container" style={{ minHeight: "100vh" }}>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route
                path="/product/details/:id"
                exact
                element={<ProductDetails />}
              />
              <Route path="/search" exact element={<Search />} />
              <Route path="/products" exact element={<Products />} />
              <Route path="/admin" exact element={<AdminDasboard />} />
              <Route path="/create/product" exact element={<CreateProduct />} />
              <Route path="/update/product/:id" exact element={<UpdateProduct />} />
              <Route
                path="/create/category"
                exact
                element={<CreateCategory />}
              />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/edit/category/:id" exact element={<EditCategory/>} />
              <Route path="/delete/category/:id" exact element={<DeleteCategory/>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
