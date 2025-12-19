import { it, expect, describe, vi, beforeEach } from "vitest";
import HomePage from "./HomePage";
import { render, screen, within, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Routes, Route } from "react-router-dom";

vi.mock("axios");

vi.mock("../../components/Header", () => ({
  default: () => <div data-testid="header" />,
}));

describe("HomePage component", () => {
  let loadCart: () => void;
  beforeEach(() => {
    loadCart = vi.fn();

    (axios.post as any) = vi
      .fn()
      .mockImplementation((urlPath: string, data: any) => {
        if (urlPath === "/api/cart-items") {
          return Promise.resolve({
            data: {
              productId: data.productId,
              quantity: data.quantity,
              id: `cart-item-${Math.random()}`,
            },
          });
        }
      });

    (axios.get as any).mockImplementation(async (urlPath: string) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });
  });

  it("displays the products correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<HomePage cart={[]} loadCart={loadCart} />}
          />
        </Routes>
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId("product-container");

    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball")
    ).toBeInTheDocument();
  });

  it('calls loadCart correctly when "Add to Cart" button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<HomePage cart={[]} loadCart={loadCart} />}
          />
        </Routes>
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId("product-container");

    // Get quantity selectors
    const firstQuantitySelector = within(productContainers[0]).getByTestId(
      "quantitySelector"
    ) as HTMLSelectElement;
    const secondQuantitySelector = within(productContainers[1]).getByTestId(
      "quantitySelector"
    ) as HTMLSelectElement;

    // Update quantities
    firstQuantitySelector.value = "2";

    secondQuantitySelector.value = "3";
    secondQuantitySelector.dispatchEvent(
      new Event("change", { bubbles: true })
    );

    // Get and click buttons
    const firstAddToCartButton = within(productContainers[0]).getByTestId(
      "add-to-cart-button"
    );
    const secondAddToCartButton = within(productContainers[1]).getByTestId(
      "add-to-cart-button"
    );

    firstAddToCartButton.click();
    secondAddToCartButton.click();

    await waitFor(() => {
      expect(loadCart).toHaveBeenCalledTimes(2);
      expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
      });
      expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3,
      });
    });
  });
});
