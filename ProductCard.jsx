import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (

    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl duration-300 overflow-hidden">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-contain p-6"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {product.name}
        </h2>

        <p className="text-yellow-500 mt-2">
          ⭐ {product.rating}
        </p>

        <h3 className="text-3xl text-green-600 font-bold mt-3">
          ₹ {product.price}
        </h3>

        <Link
          to={`/product/${product.id}`}
          className="block mt-6 bg-blue-600 hover:bg-blue-700 text-center text-white py-3 rounded-lg font-semibold"
        >
          View Details
        </Link>

      </div>

    </div>

  );
}

export default ProductCard;