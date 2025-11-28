import Header from "../components/Header";
import type { CartItem } from "../types/cart";

interface NotFoundProps {
  cart: CartItem[];
}

function NotFound({ cart }: NotFoundProps) {
  return (
    <>
      <Header cart={cart} />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </>
  );
}

export default NotFound;
