import type { CartItem } from "../../types/cart";
import { Link } from "react-router";
import "./CheckoutHeader.css";

function CheckoutHeader({ cart }: { cart: CartItem[] }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="checkout-header">
      <div className="header-content">
        <nav className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src="images/logo.png" />
            <img className="mobile-logo" src="images/mobile-logo.png" />
          </Link>
        </nav>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            {totalItems} items
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <svg
            className="credit-card-icon"
            style={{ width: "32px", height: "32px", fill: "#555" }}
          >
            <use href="/images/icons/sprite.svg#icon-credit-card" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default CheckoutHeader;
