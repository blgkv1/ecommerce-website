import formatMoney from "../../utils/money";
import type { CartItem } from "../../types/cart";
import type { CartProduct } from "../../types/products";
import { use, useState } from "react";

interface CartItemWithProduct extends CartItem {
  product: CartProduct;
}

function CartItemDetails({
  cartItem,
  deleteCartItem,
}: {
  cartItem: CartItemWithProduct;
  deleteCartItem: () => void;
}) {
  const [updated, setUpdated] = useState(false);

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <input
            type="text"
            style={{ width: "50px", display: updated ? "block" : "none" }}
          />
          <span>
            Quantity:{" "}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={() => setUpdated(true)}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItemDetails;
