import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid";
import type { CartItem } from "../../types/cart";
import type { CartProduct } from "../../types/products";
import "./HomePage.css";

function HomePage({
  cart,
  loadCart,
}: {
  cart: CartItem[];
  loadCart: () => void;
}) {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = search ? `/api/products?search=${search}` : "/api/products";
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [search]);

  return (
    <>
      <title>Ecommerce project</title>

      <Header cart={cart} />

      <main className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </main>
    </>
  );
}

export default HomePage;
