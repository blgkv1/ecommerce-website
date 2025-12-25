import Header from "../../components/Header";
import "./TrackingPage.css";
import { Link, useParams } from "react-router-dom";
import type { CartItem } from "../../types/cart";
import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

interface TrackingPageProps {
  cart: CartItem[];
}

function TrackingPage({ cart }: TrackingPageProps) {
  const { orderId, productId } = useParams<{
    orderId: string;
    productId: string;
  }>();
  type Order = {
    id: string;
    orderTimeMs: number;
    products?: any[];
  };
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(
          `/api/orders/${orderId}?expand=products`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching tracking data:", error);
      }
    };
    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const orderProduct = order.products?.find(
    (product: any) => product.productId.toString() === productId
  );

  const totalDeliveryTime =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTime) * 100;

  let isPreparing = false;
  let isShipped = false;
  let isDelivered = false;

  if (deliveryPercent >= 100) {
    deliveryPercent = 100;
    isDelivered = true;
  } else if (deliveryPercent >= 33 && deliveryPercent < 66) {
    isShipped = true;
  } else if (deliveryPercent < 33) {
    isPreparing = true;
  }

  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />

      <main className="tracking-page">
        <section className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"}{" "}
            {dayjs(orderProduct?.estimatedDeliveryTimeMs).format(
              "MMMM D, YYYY"
            )}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TrackingPage;
