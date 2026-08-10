import { Link } from "react-router-dom";

function NotFound() {
  return (

    <div className="flex justify-center items-center min-h-[80vh]">

      <div className="text-center">

        <h1 className="text-7xl font-bold text-red-500">
          404
        </h1>

        <p className="text-2xl mt-4">
          Page Not Found
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          Back Home
        </Link>

      </div>

    </div>

  );
}

export default NotFound;