// src/components/SearchDropdown.tsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import type { CartProduct } from "../types/products";
import { useNavigate } from "react-router-dom";
import "./SearchDropdown.css";

interface SearchDropdownProps {
  searchValue: string;
  onSearch: (value: string) => void;
  onSelect: (productName: string) => void;
}

export function SearchDropdown({
  searchValue,
  onSearch,
  onSelect,
}: SearchDropdownProps) {
  const [suggestions, setSuggestions] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [lastSelected, setLastSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `/api/products?search=${searchValue}`,
          );
          setSuggestions(response.data.slice(0, 5));
          if (searchValue !== lastSelected) {
            setIsOpen(true);
          }
          setHighlightedIndex(-1);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };

      const debounceTimer = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelectProduct(suggestions[highlightedIndex]);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleSelectProduct = (product: CartProduct) => {
    setLastSelected(product.name);
    setSuggestions([]);
    onSelect(product.name);
    setIsOpen(false);
    navigate(`/?search=${encodeURIComponent(product.name)}`);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/?search=${encodeURIComponent(searchValue)}`);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onSearch("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="search-dropdown-container" ref={dropdownRef}>
      <input
        ref={inputRef}
        className={`search-bar ${
          isOpen && suggestions.length > 0 ? "dropdown-open" : ""
        }`}
        type="search"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => {
          setLastSelected(null);
          onSearch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => searchValue.trim().length > 0 && setIsOpen(true)}
      />

      {searchValue && (
        <button
          type="button"
          className="clear-button"
          aria-label="Clear search"
          onClick={handleClear}
        >
          <svg className="cross-icon">
            <use href="/images/icons/sprite.svg#icon-cross" />
          </svg>
        </button>
      )}

      {isOpen && suggestions.length > 0 && (
        <div className="dropdown-menu">
          {suggestions.map((product, index) => (
            <div
              key={product.id}
              className={`dropdown-item ${
                index === highlightedIndex ? "highlighted" : ""
              }`}
              onClick={() => handleSelectProduct(product)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="dropdown-product-image"
              />
              <div className="dropdown-product-info">
                <div className="dropdown-product-name">{product.name}</div>
                <div className="dropdown-product-rating">
                  ⭐ {product.rating.stars} ({product.rating.count})
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
