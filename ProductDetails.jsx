import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import products from "../data/products";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Product Not Found
      </h1>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left */}
          <div className="flex justify-center">

            <img
              src={product.image}
              alt={product.name}
              className="max-w-2xs"
            />

          </div>

          {/* Right */}
          <div>

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="text-yellow-500 text-xl mt-4">
              ⭐ {product.rating}
            </p>

            <h2 className="text-5xl text-green-600 font-bold mt-5">
              ₹ {product.price}
            </h2>

            <p className="mt-8 text-gray-600 leading-8">
              {product.description}
            </p>

            <div className="mt-10 flex gap-4">

              <button
                onClick={handleAddToCart}
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold"
              >
                Add To Cart
              </button>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;