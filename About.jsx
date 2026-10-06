MOBILE STORE — COMPLETE MERN STACK PROJECT

Your existing project:

React
Tailwind
React Router
Redux Toolkit

We are adding:

Node.js
Express.js
MongoDB
Mongoose
REST API

Final:

React
   ↓
Fetch API
   ↓
Express / Node
   ↓
Mongoose
   ↓
MongoDB
STEP 1 — CREATE BACKEND
1.1 Final project root

Create/keep your project like this:

mobile-store/
│
├── frontend/
│
└── backend/

Your existing React project goes inside frontend.

1.2 Create backend

Open terminal inside mobile-store:

mkdir backend
cd backend

Then:

npm init -y

Install:

npm install express mongoose cors dotenv

Install nodemon:

npm install --save-dev nodemon
1.3 Backend structure

Create:

backend/
│
├── node_modules/
├── .env
├── server.js
├── package.json
└── package-lock.json
1.4 .env

Create:

backend/.env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mobileStore
1.5 server.js

Create:

backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed");
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Backend Server is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
1.6 package.json

Change scripts:

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

Run:

npm run dev

Expected:

MongoDB Connected Successfully
Server running on http://localhost:5000

Test:

http://localhost:5000

Expected:

Backend Server is Running
STEP 2 — PRODUCT MODEL

Now create:

backend/
│
├── models/
│   └── Product.js
│
├── .env
├── server.js
└── package.json

Create folder:

models

Create:

Product.js
Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
This stores:
name
price
image
rating
description

Example MongoDB document:

{
  "name": "OPPO Reno",
  "price": 25000,
  "image": "/images/oppo.png",
  "rating": 4.5,
  "description": "Excellent camera and battery."
}
STEP 3 — PRODUCT CONTROLLER

Create:

backend/
│
├── controllers/
│   └── productController.js
│
├── models/
│   └── Product.js
│
├── .env
├── server.js
└── package.json
productController.js
const Product = require("../models/Product");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get products",
    });
  }
};

// GET SINGLE PRODUCT
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get product",
    });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create product",
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update product",
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete product",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
STEP 4 — PRODUCT ROUTES

Create:

backend/
│
├── routes/
│   └── productRoutes.js
│
├── controllers/
│   └── productController.js
│
├── models/
│   └── Product.js
│
├── .env
├── server.js
└── package.json
productRoutes.js
const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
STEP 5 — CONNECT PRODUCT ROUTES

Open:

backend/server.js

Full code:

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed");
    console.log(error);
  });

// Test
app.get("/", (req, res) => {
  res.send("Backend Server is Running");
});

// Product Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

Now your APIs are:

GET     /api/products
GET     /api/products/:id

POST    /api/products

PUT     /api/products/:id

DELETE  /api/products/:id
STEP 6 — TEST PRODUCT API

You can use Postman.

Start backend:

npm run dev
GET products

Open:

http://localhost:5000/api/products

Initially:

[]

That's correct because database has no products.

POST product

Postman:

POST
http://localhost:5000/api/products

Body → raw → JSON:

{
  "name": "OPPO Reno",
  "price": 25000,
  "image": "/images/oppo.png",
  "rating": 4.5,
  "description": "Excellent camera and battery."
}

Click Send.

You should get the product with MongoDB _id.

Add Samsung
{
  "name": "Samsung Galaxy",
  "price": 65000,
  "image": "/images/samsung.png",
  "rating": 4.8,
  "description": "Flagship AMOLED display."
}
Add Vivo
{
  "name": "Vivo V50",
  "price": 30000,
  "image": "/images/vivo.png",
  "rating": 4.4,
  "description": "Professional portrait camera."
}

Now:

GET /api/products

should return all 3.

STEP 7 — MOVE PRODUCT IMAGES

Your existing images are currently probably:

src/assets/images/

For the simple MERN version, put them in:

frontend/
│
├── public/
│   └── images/
│       ├── oppo.png
│       ├── samsung.png
│       └── vivo.png

So:

frontend/public/images/oppo.png
frontend/public/images/samsung.png
frontend/public/images/vivo.png

MongoDB stores:

/images/oppo.png
/images/samsung.png
/images/vivo.png
STEP 8 — CONNECT REACT TO BACKEND

Now we start changing your existing frontend.

Your current Home has:

import products from "../data/products";

We don't need this anymore.

Eventually you can remove:

src/data/products.js
Home.jsx

Replace your Home code with:

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">

      <div className="flex justify-between items-center mt-12 mb-8">

        <h2 className="text-3xl font-bold">
          Latest Mobiles
        </h2>

        <span className="text-gray-500">
          {products.length} Products
        </span>

      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}

export default Home;

Now:

MongoDB
   ↓
Express
   ↓
GET /api/products
   ↓
React Home
   ↓
ProductCard
STEP 9 — UPDATE PRODUCT CARD

Your old:

to={`/product/${product.id}`}

change to:

to={`/product/${product._id}`}

Full:

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
          to={`/product/${product._id}`}
          className="block mt-6 bg-blue-600 hover:bg-blue-700 text-center text-white py-3 rounded-lg font-semibold"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;
STEP 10 — PRODUCT DETAILS

Create:

frontend/src/pages/ProductDetails.jsx

Code:

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-contain"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-yellow-500 text-xl mt-4">
            ⭐ {product.rating}
          </p>

          <h2 className="text-3xl text-green-600 font-bold mt-5">
            ₹ {product.price}
          </h2>

          <p className="text-gray-600 mt-5">
            {product.description}
          </p>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
STEP 11 — ROUTING

Open:

frontend/src/App.jsx

Example:

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

If your existing App.jsx already has routes, just add:

<Route
  path="/product/:id"
  element={<ProductDetails />}
/>
STEP 12 — YOUR REDUX CART

Your existing:

frontend/src/redux/cartSlice.js

can remain.

Your existing code:

addToCart
increaseQty
decreaseQty
removeItem
clearCart

is good.

One small difference:

Previously:

product.id

MongoDB product has:

product._id

So later we'll adjust Redux to use _id.

For now, the product object itself can still be stored.

STEP 13 — CART PAGE

Create:

frontend/src/pages/Cart.jsx
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart.cart
  );

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id || item.id}
              className="flex items-center justify-between border-b py-5"
            >

              <div>
                <h2 className="font-bold">
                  {item.name}
                </h2>

                <p>
                  ₹ {item.price}
                </p>
              </div>

              <div className="flex gap-3 items-center">

                <button
                  onClick={() =>
                    dispatch(
                      decreaseQty(item._id || item.id)
                    )
                  }
                  className="bg-gray-200 px-3 py-1"
                >
                  -
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch(
                      increaseQty(item._id || item.id)
                    )
                  }
                  className="bg-gray-200 px-3 py-1"
                >
                  +
                </button>

                <button
                  onClick={() =>
                    dispatch(
                      removeItem(item._id || item.id)
                    )
                  }
                  className="text-red-600"
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          <h2 className="text-2xl font-bold mt-8">
            Total: ₹ {total}
          </h2>

          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-600 text-white px-5 py-3 rounded-lg mt-5"
          >
            Clear Cart
          </button>

        </>
      )}

    </div>
  );
}

export default Cart;
STEP 14 — ADMIN / ADD PRODUCT

Now create:

frontend/src/pages/AddProduct.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    rating: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Product Added Successfully");

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Add Product
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <input
          name="image"
          placeholder="/images/oppo.png"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <input
          name="rating"
          placeholder="Rating"
          type="number"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;
STEP 15 — ADD ROUTE

In App.jsx:

import AddProduct from "./pages/AddProduct";

Add:

<Route
  path="/add-product"
  element={<AddProduct />}
/>

Now:

http://localhost:5173/add-product

opens Add Product page.

STEP 16 — UPDATE PRODUCT

Create:

frontend/src/pages/EditProduct.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    rating: "",
    description: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `http://localhost:5000/api/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    alert("Product Updated");

    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <input
          name="rating"
          type="number"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg"
        >
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;

Add route:

<Route
  path="/edit-product/:id"
  element={<EditProduct />}
/>
STEP 17 — DELETE PRODUCT

For now, easiest is to create a delete button in your product/admin page.

Function:

const deleteProduct = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure?"
  );

  if (!confirmDelete) return;

  await fetch(
    `http://localhost:5000/api/products/${id}`,
    {
      method: "DELETE",
    }
  );

  alert("Product Deleted");

  window.location.reload();
};

Button:

<button
  onClick={() => deleteProduct(product._id)}
  className="bg-red-600 text-white px-4 py-2"
>
  Delete
</button>
STEP 18 — REGISTER BACKEND

Now authentication.

Install:

npm install bcryptjs jsonwebtoken

Backend structure:

backend/
│
├── controllers/
│   ├── productController.js
│   └── authController.js
│
├── models/
│   ├── Product.js
│   └── User.js
│
├── routes/
│   ├── productRoutes.js
│   └── authRoutes.js
│
├── .env
├── server.js
└── package.json
STEP 19 — USER MODEL

Create:

backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
STEP 20 — AUTH CONTROLLER

Create:

backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};

module.exports = {
  register,
  login,
};
STEP 21 — JWT SECRET

Update .env:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mobileStore
JWT_SECRET=mysecretkey123

For a real production project, use a much stronger secret.

STEP 22 — AUTH ROUTES

Create:

backend/routes/authRoutes.js
const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

module.exports = router;
STEP 23 — CONNECT AUTH ROUTES

Open:

backend/server.js

Add:

const authRoutes = require("./routes/authRoutes");

Then:

app.use("/api/auth", authRoutes);

Your server will now have:

POST /api/auth/register
POST /api/auth/login
STEP 24 — REGISTER FRONTEND

Create:

frontend/src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful");

        navigate("/login");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">

      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Register
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-5"
          />

          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-5"
          />

          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-6"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;
STEP 25 — LOGIN FRONTEND

Your existing Login page can be changed to:

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login Successful!");

        navigate("/");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">

      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3 mb-5"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg p-3 mb-6"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;
STEP 26 — REGISTER ROUTE

In App.jsx:

import Register from "./pages/Register";

Add:

<Route
  path="/register"
  element={<Register />}
/>
STEP 27 — FINAL APP ROUTES

Your App.jsx should eventually contain something like:

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
STEP 28 — NAVBAR

Your existing Navbar is already good.

Keep:

<Link to="/">
  Home
</Link>

<Link to="/about">
  About
</Link>

<Link to="/login">
  Login
</Link>

<Link to="/cart">
  🛒 Cart ({totalItems})
</Link>

Later we can add:

Register
Logout
Add Product
STEP 29 — FINAL BACKEND STRUCTURE

After authentication:

backend/
│
├── controllers/
│   │
│   ├── productController.js
│   └── authController.js
│
├── models/
│   │
│   ├── Product.js
│   └── User.js
│
├── routes/
│   │
│   ├── productRoutes.js
│   └── authRoutes.js
│
├── node_modules/
│
├── .env
├── package.json
├── package-lock.json
└── server.js
STEP 30 — FINAL FRONTEND STRUCTURE
frontend/
│
├── public/
│   └── images/
│       ├── oppo.png
│       ├── samsung.png
│       └── vivo.png
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── AddProduct.jsx
│   │   └── EditProduct.jsx
│   │
│   ├── redux/
│   │   ├── store.js
│   │   └── cartSlice.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── package-lock.json
🎯 FINAL COMPLETE PROJECT
mobile-store/
│
├── frontend/
│   │
│   ├── public/
│   │   └── images/
│   │       ├── oppo.png
│   │       ├── samsung.png
│   │       └── vivo.png
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── About.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── EditProduct.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── cartSlice.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
│
└── backend/
    │
    ├── controllers/
    │   ├── productController.js
    │   └── authController.js
    │
    ├── models/
    │   ├── Product.js
    │   └── User.js
    │
    ├── routes/
    │   ├── productRoutes.js
    │   └── authRoutes.js
    │
    ├── node_modules/
    │
    ├── .env
    ├── server.js
    ├── package.json
    └── package-lock.json
🔄 HOW THE COMPLETE PROJECT WORKS
Home page
Home.jsx
   ↓
fetch()
   ↓
GET /api/products
   ↓
Express
   ↓
Product Controller
   ↓
Product Model
   ↓
MongoDB
   ↓
Products
   ↓
Home.jsx
   ↓
ProductCard
Add Product
AddProduct.jsx
      ↓
POST /api/products
      ↓
Express
      ↓
Controller
      ↓
MongoDB
      ↓
Product saved
Edit Product
EditProduct.jsx
      ↓
PUT /api/products/:id
      ↓
Express
      ↓
MongoDB
      ↓
Updated
Delete Product
Delete Button
      ↓
DELETE /api/products/:id
      ↓
Express
      ↓
MongoDB
      ↓
Deleted
Register
Register.jsx
      ↓
POST /api/auth/register
      ↓
bcrypt password
      ↓
MongoDB
      ↓
User created
Login
Login.jsx
      ↓
POST /api/auth/login
      ↓
MongoDB
      ↓
Password check
      ↓
JWT token
      ↓
localStorage
Cart
MongoDB Product
      ↓
React
      ↓
Redux
      ↓
Cart
      ↓
Increase / Decrease / Remove
🧪 HOW TO RUN THE PROJECT

You need 2 terminals.

Terminal 1 — Backend
cd backend
npm run dev

Keep it running.

You should see:

MongoDB Connected Successfully
Server running on http://localhost:5000
Terminal 2 — Frontend
cd frontend
npm run dev

Usually:

http://localhost:5173
