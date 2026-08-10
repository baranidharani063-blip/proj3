import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {

  const cart = useSelector(
    (state) => state.cart.cart
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Mobile Store
        </Link>

        <div className="flex gap-6 items-center">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/cart"
            className="font-semibold"
          >
            🛒 Cart ({totalItems})
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;