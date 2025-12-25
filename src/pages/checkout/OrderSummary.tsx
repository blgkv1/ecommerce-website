import DeliveryOptions from "./DeliveryOptions";
import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";
import axios from "axios";

function OrderSummary({
  cart,
  deliveryOptions,
  loadCart,
}: {
  cart: any[];
  deliveryOptions: any[];
  loadCart: () => void;
}) {
  return (
    <section className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );

          const deleteCartItem = async () => {
            axios.delete(`/api/cart-items/${cartItem.productId}`);
            loadCart();
          };

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

              <div className="cart-item-details-grid">
                <CartItemDetails
                  loadCart={loadCart}
                  cartItem={cartItem}
                  deleteCartItem={deleteCartItem}
                />

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default OrderSummary;
