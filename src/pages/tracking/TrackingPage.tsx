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

  const trackedProduct = order.products?.find(
    (product: any) => product.productId.toString() === productId
  );

  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(trackedProduct?.estimatedDeliveryTime).format(
              "MMMM D, YYYY"
            )}
          </div>

          <div className="product-info">{trackedProduct.product.name}</div>

          <div className="product-info">
            Quantity: {trackedProduct.quantity}
          </div>

          <img className="product-image" src={trackedProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
