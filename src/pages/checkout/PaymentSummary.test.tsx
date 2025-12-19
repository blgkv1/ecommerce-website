import { it, expect, describe, vi, beforeEach } from "vitest";
import PaymentSummary from "./PaymentSummary";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Routes, Route } from "react-router-dom";

vi.mock("axios");
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("PaymentSummary component", () => {
  let loadCart: () => void;

  beforeEach(() => {
    loadCart = vi.fn();

    (axios.get as any).mockImplementation(async (urlPath: string) => {
      if (urlPath === "/api/payment-summary") {
        return {
          data: {
            totalItems: 7,
            productCostCents: 11877,
            shippingCostCents: 0,
            totalCostBeforeTaxCents: 11877,
            taxCents: 1188,
            totalCostCents: 13065,
          },
        };
      }
    });

    (axios.post as any) = vi.fn().mockResolvedValue({});
  });

  it("displays payment summary correctly with correct dollar amounts", async () => {
    const paymentSummary = {
      totalItems: 7,
      productCostCents: 11877,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 11877,
      taxCents: 1188,
      totalCostCents: 13065,
    };

    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route
            path="/checkout"
            element={
              <PaymentSummary
                paymentSummary={paymentSummary}
                loadCart={loadCart}
              />
            }
          />
          <Route path="/orders" element={<div>Orders Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Check payment summary title
    expect(screen.getByText("Payment Summary")).toBeInTheDocument();

    // Check items row contains the item count and price
    expect(screen.getByText(/Items \(7\):/)).toBeInTheDocument();
    const allPrices = screen.getAllByText("$118.77");
    expect(allPrices.length).toBeGreaterThan(0); // Items price

    // Check shipping row
    expect(screen.getByText("Shipping & handling:")).toBeInTheDocument();
    expect(screen.getByText("$0.00")).toBeInTheDocument();

    // Check total before tax row
    expect(screen.getByText("Total before tax:")).toBeInTheDocument();

    // Check tax row
    expect(screen.getByText("Estimated tax (10%):")).toBeInTheDocument();
    expect(screen.getByText("$11.88")).toBeInTheDocument();

    // Check order total row
    expect(screen.getByText("Order total:")).toBeInTheDocument();
    expect(screen.getByText("$130.65")).toBeInTheDocument();

    // Check place order button exists
    expect(screen.getByText("Place your order")).toBeInTheDocument();
  });

  it("calls createOrder when Place your order button is clicked", async () => {
    const paymentSummary = {
      totalItems: 7,
      productCostCents: 11877,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 11877,
      taxCents: 1188,
      totalCostCents: 13065,
    };

    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route
            path="/checkout"
            element={
              <PaymentSummary
                paymentSummary={paymentSummary}
                loadCart={loadCart}
              />
            }
          />
          <Route path="/orders" element={<div>Orders Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByText("Place your order");
    placeOrderButton.click();

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/orders");
      expect(loadCart).toHaveBeenCalled();
    });
  });
});
