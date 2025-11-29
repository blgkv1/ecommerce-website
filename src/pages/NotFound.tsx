import Header from "../components/Header";
import type { CartItem } from "../types/cart";

interface NotFoundProps {
  cart: CartItem[];
}

function NotFound({ cart }: NotFoundProps) {
  return (
    <div>
      <Header cart={cart} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
