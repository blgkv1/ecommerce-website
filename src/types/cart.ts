import type { CartProduct } from "./products";

export interface CartItem {
  productId: string;
  quantity: number;
  deliveryOptionId: string;
  product?: CartProduct;
}

export interface DeliveryOption {
  id: string;
  priceCents: number;
  estimatedDeliveryTimeMs: number;
}
