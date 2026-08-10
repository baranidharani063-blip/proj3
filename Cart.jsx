import { useDispatch, useSelector } from "react-redux";

import {
  increaseQty,
  decreaseQty,
  removeItem,
} from "../redux/cartSlice";

function Cart() {

  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart.cart
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {

    return (
      <div className="flex justify-center items-center h-[70vh]">

        <div className="bg-white shadow-lg rounded-xl p-10 text-center">

          <h1 className="text-4xl font-bold text-gray-500">
            Your Cart is Empty
          </h1>

          <p className="mt-4 text-gray-400">
            Add some products to continue shopping.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-5 py-8">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="lg:col-span-2">

          {cart.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col md:flex-row gap-6"
            >

              {/* Image */}

              <div className="flex justify-center">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-contain"
                />

              </div>

              {/* Details */}

              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  {item.description}
                </p>

                <p className="text-green-600 text-3xl font-bold mt-4">
                  ₹ {item.price}
                </p>

                {/* Quantity */}

                <div className="flex items-center gap-4 mt-6">

                  <button
                    onClick={() =>
                      dispatch(decreaseQty(item.id))
                    }
                    className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-lg"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(increaseQty(item.id))
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-lg"
                  >
                    +
                  </button>

                </div>

                <h3 className="mt-6 text-xl">

                  Subtotal :

                  <span className="ml-2 text-blue-600 font-bold">
                    ₹ {item.price * item.quantity}
                  </span>

                </h3>

              </div>

              {/* Delete */}

              <div className="flex items-start">

                <button
                  onClick={() =>
                    dispatch(removeItem(item.id))
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* RIGHT */}

        <div>

          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              PRICE DETAILS
            </h2>

            <div className="flex justify-between mb-4">

              <span>Total Items</span>

              <span>
                {totalItems}
              </span>

            </div>

            <div className="flex justify-between mb-4">

              <span>Total Price</span>

              <span>
                ₹ {totalPrice}
              </span>

            </div>

            <div className="flex justify-between mb-4">

              <span>Delivery</span>

              <span className="text-green-600">
                FREE
              </span>

            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span>
                ₹ {totalPrice}
              </span>

            </div>

            <button
              className="w-full mt-8 bg-green-500 hover:bg-orange-600 text-white py-4 font-semibold text-lg"
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;