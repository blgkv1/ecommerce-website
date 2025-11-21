export interface OrderProduct {
  product: {
    id: string;
    name: string;
    image: string;
  };
  quantity: number;
  estimatedDeliveryTimeMs: number;
}

export interface Order {
  id: string;
  orderTimeMs: number;
  totalCostCents: number;
  products: OrderProduct[];
}
