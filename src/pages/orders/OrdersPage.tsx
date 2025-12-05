// 7:37:17
import type { CartItem } from "../../types/cart";
import axios from "axios";
import Header from "../../components/Header";
import "./OrdersPage.css";
import { useEffect, useState } from "react";
import type { Order } from "../../types/orders";
import OrdersGrid from "./OrdersGrid";

interface OrdersPageProps {
  cart: CartItem[];
  loadCart: () => void;
}

function OrdersPage({ cart, loadCart }: OrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}

export default OrdersPage;
