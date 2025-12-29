import axios from "axios";
import { useState, useEffect } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import "./CheckoutPage.css";
import CheckoutHeader from "./CheckoutHeader";
import type { CartItem } from "../../types/cart";

export interface PaymentSummaryData {
  totalItems: number;
  productCostCents: number;
  shippingCostCents: number;
  totalCostBeforeTaxCents: number;
  taxCents: number;
  totalCostCents: number;
}

function CheckoutPage({
  cart,
  loadCart,
}: {
  cart: CartItem[];
  loadCart: () => void;
}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryData | null>(
    null
  );

  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      try {
        const response = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime"
        );
        setDeliveryOptions(response.data);
      } catch (error) {
        console.error("Error fetching checkout data:", error);
      }
    };
    fetchDeliveryOptions();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get<PaymentSummaryData>("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <main className="checkout-page">
        <h1 className="page-title">Review your order</h1>

        <section className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </section>
      </main>
    </>
  );
}

export default CheckoutPage;
