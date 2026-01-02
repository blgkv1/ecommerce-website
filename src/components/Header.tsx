import type { CartItem } from "../types/cart";
import { NavLink, useNavigate } from "react-router";
import "./Header.css";
import { useState, useEffect, type JSX } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchDropdown } from "./SearchDropdown";

interface HeaderProps {
  cart: CartItem[];
}

function Header({ cart }: HeaderProps): JSX.Element {
  let totalQuantity = 0;
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const handleSearchClick = () => {
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header className="header">
        <nav className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </NavLink>
        </nav>

        <div className="middle-section">
          <SearchDropdown
            searchValue={search}
            onSearch={setSearch}
            onSelect={setSearch}
          />

          <button
            className="search-button"
            type="submit"
            onClick={handleSearchClick}
          >
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <nav className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </nav>
      </header>
    </>
  );
}

export default Header;
