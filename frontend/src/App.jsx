import { Routes, Route } from "react-router-dom";
import { useCart } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import ProductsAdmin from "./pages/ProductsAdmin";

function App() {
  const { notification } = useCart();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<ProductsAdmin />} />
        </Route>
      </Routes>

      <Footer />

      {notification && (
        <div className="cart-notification">
          {notification}
        </div>
      )}
    </>
  );
}

export default App;