function About() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10">

      <div className="bg-white rounded-xl shadow-lg p-10">

        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          About Mobile Store
        </h1>

        <p className="text-gray-600 leading-8 text-lg">
          Welcome to Mobile Store.
          We provide the latest smartphones at the best prices with
          fast delivery and secure payment options.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold">1000+</h2>
            <p className="mt-2 text-gray-600">Happy Customers</p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold">500+</h2>
            <p className="mt-2 text-gray-600">Products</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold">24/7</h2>
            <p className="mt-2 text-gray-600">Customer Support</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;