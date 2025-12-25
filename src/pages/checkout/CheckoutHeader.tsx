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
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </header>
  );
}

export default CheckoutHeader;
