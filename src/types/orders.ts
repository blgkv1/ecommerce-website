import type { Product } from "./products";

export interface OrderProduct {
  product: Product;
  quantity: number;
  estimatedDeliveryTimeMs: number;
}

export interface Order {
  id: string;
  orderTimeMs: number;
  totalCostCents: number;
  products: OrderProduct[];
}
