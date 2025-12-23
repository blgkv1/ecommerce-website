import type { CartItem } from "../types/cart";
import { NavLink, useNavigate } from "react-router";
import "./Header.css";
import { useState, useEffect, type JSX } from "react";
import { useSearchParams } from "react-router-dom";

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

        <form className="middle-section" onSubmit={handleSubmit}>
          <input
            className="search-bar"
            type="search"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />

          <button className="search-button" type="submit">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </form>

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
