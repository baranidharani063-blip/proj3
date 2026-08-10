import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-8">

      {/* Banner */}
{/* 
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-10">

        <h1 className="text-5xl font-bold">
          Big Mobile Sale
        </h1>

        <p className="mt-4 text-xl">
          Up to 50% OFF on Premium Smartphones
        </p>

        <button className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Shop Now
        </button>

      </div> */}

      {/* Heading */}

      <div className="flex justify-between items-center mt-12 mb-8">

        <h2 className="text-3xl font-bold">
          Latest Mobiles
        </h2>

        <span className="text-gray-500">
          {products.length} Products
        </span>

      </div>

      {/* Products */}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </div>
  );
}

export default Home;