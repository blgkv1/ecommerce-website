import axios from "axios";

export function useAddToCart(loadCart: () => void) {
  const addToCart = async (productId: string, quantity: number) => {
    await axios.post("/api/cart-items", {
      productId,
      quantity,
    });
    await loadCart();
  };
  return addToCart;
}
