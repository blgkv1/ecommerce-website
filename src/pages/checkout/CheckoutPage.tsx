import axios from "axios";
import { useState, useEffect } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import "./CheckoutPage.css";
import CheckoutHeader from "./CheckoutHeader";

function CheckoutPage({
  cart,
  loadCart,
}: {
  cart: any[];
  loadCart: () => void;
}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([null]);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        let response = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime"
        );
        setDeliveryOptions(response.data);
        response = await axios.get("/api/payment-summary");
        setPaymentSummary(response.data);
      } catch (error) {
        console.error("Error fetching checkout data:", error);
      }
    };
    fetchCheckoutData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
