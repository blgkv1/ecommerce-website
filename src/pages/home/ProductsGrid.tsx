import type { CartProduct } from "../../types/products";
import type { JSX } from "react";
import Product from "./Product";

interface ProductsGridProps {
  products: CartProduct[];
  loadCart: () => void;
}

function ProductsGrid({ products, loadCart }: ProductsGridProps): JSX.Element {
  return (
    <section className="products-grid">
      {products.map((product: CartProduct) => {
        return (
          <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </section>
  );
}

export default ProductsGrid;
