import { Fragment } from "react";
import type { Order } from "../../types/orders";
import dayjs from "dayjs";
import { Link } from "react-router";
import { useAddToCart } from "../../hooks/useAddToCart";

function OrderDetailsGrid({
  order,
  loadCart,
}: {
  order: Order;
  loadCart: () => void;
}) {
  const addToCart = useAddToCart(loadCart);

  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button
                className="buy-again-button button-primary"
                onClick={() => addToCart(orderProduct.product.id, 1)}
              >
                <img
                  className="buy-again-icon"
                  src="images/icons/buy-again.png"
                />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}

      <div className="product-actions">
        <Link to="/tracking">
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderDetailsGrid;
