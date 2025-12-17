import { it, expect, describe, vi, beforeEach } from "vitest";
import Product from "./Product";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

interface ProductRating {
  stars: number;
  count: number;
}

interface ProductType {
  id: string;
  image: string;
  name: string;
  rating: ProductRating;
  priceCents: number;
  keywords: string[];
}

describe("Product component", () => {
  let product: ProductType;

  let loadCart: () => void;
  let user = userEvent.setup();

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    loadCart = vi.fn();
  });

  it("describes product details correctly", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );
    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png"
    );
    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it('adds product to cart when "Add to Cart" button is clicked', async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });

  it("correctly displays quantity selected when adding to cart", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const quantitySelector = screen.getByTestId("quantitySelector");
    expect(quantitySelector).toBeInTheDocument();
    expect(quantitySelector).toHaveValue("1");
    await user.selectOptions(quantitySelector, "3");
    expect(quantitySelector).toHaveValue("3");
  });

  it('adds correct quantity to cart when quantity is changed before clicking "Add to Cart" button', async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const quantitySelector = screen.getByTestId("quantitySelector");
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.selectOptions(quantitySelector, "4");
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 4,
    });
    expect(loadCart).toHaveBeenCalled();
  });
});
