import type { CartProduct } from "../../types/products";
import type { JSX } from "react";
import Product from "./Product";

interface ProductsGridProps {
  products: CartProduct[];
}

function ProductsGrid({ products, loadCart }: ProductsGridProps): JSX.Element {
  return (
    <div className="products-grid">
      {products.map((product: CartProduct) => {
        return (
          <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}

export default ProductsGrid;
