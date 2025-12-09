import formatMoney from "../../utils/money";
import type { CartItem } from "../../types/cart";
import type { CartProduct } from "../../types/products";
import { useState } from "react";
import axios from "axios";

interface CartItemWithProduct extends CartItem {
  product: CartProduct;
}

function CartItemDetails({
  cartItem,
  deleteCartItem,
  loadCart,
}: {
  cartItem: CartItemWithProduct;
  deleteCartItem: () => void;
  loadCart: () => void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateCartItemQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.product.id}`, {
      quantity: quantity,
    });
    setIsUpdating(false);
    loadCart();
  };

  const quantityDisplay = isUpdating ? (
    <>
      <input
        type="text"
        style={{ width: "50px" }}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <span
        className="save-quantity-link link-primary"
        onClick={updateCartItemQuantity}
      >
        Save
      </span>
    </>
  ) : (
    <>
      <span>
        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
      </span>
      <span
        className="update-quantity-link link-primary"
        onClick={() => setIsUpdating(true)}
      >
        Update
      </span>
    </>
  );

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          {quantityDisplay}{" "}
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
