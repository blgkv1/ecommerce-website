import axios from "axios";
import { Routes, Route } from "react-router-dom";
import type { CartItem } from "./types/cart";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import { useState, useEffect } from "react";
import NotFound from "./pages/NotFound";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = async () => {
    try {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route
        path="orders"
        element={<OrdersPage cart={cart} loadCart={loadCart} />}
      />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<NotFound cart={cart} />} />
    </Routes>
  );
}

export default App;
