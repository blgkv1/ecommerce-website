import type { CartProduct } from "./products";

export interface OrderProduct {
  product: CartProduct;
  quantity: number;
  estimatedDeliveryTimeMs: number;
}

export interface Order {
  id: string;
  orderTimeMs: number;
  totalCostCents: number;
  products: OrderProduct[];
}
