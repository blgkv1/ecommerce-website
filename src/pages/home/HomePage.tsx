import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid";
import "./HomePage.css";

function HomePage({ cart, loadCart }: { cart: any[]; loadCart: () => void }) {
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <>
      <title>Ecommerce project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;
