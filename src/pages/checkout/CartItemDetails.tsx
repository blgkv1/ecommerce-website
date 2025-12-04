import formatMoney from "../../utils/money";
import type { CartItem } from "../../types/cart";
import type { CartProduct } from "../../types/products";

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
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary">Update</span>
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
