import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

import Footer from './Footer';
import NavBar from './NavBar';

const IMG_URL = "https://Ibtisam.pythonanywhere.com/static/images/";

const GetProduct = () => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const navigate = useNavigate();

  // ---------------- FETCH PRODUCTS ----------------
  const getProducts = async () => {

    setLoading(true);
    setError("");

    try {

      const response = await axios.get(
        "https://Ibtisam.pythonanywhere.com/api/get_product_details"
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setProducts(data);
      setFilteredProducts(data);

    } catch (err) {

      console.log("Fetch error:", err);
      setError("Failed to load products. Please refresh.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ---------------- SEARCH ----------------
  useEffect(() => {

    if (!searchQuery.trim()) {

      setFilteredProducts(products);
      setCurrentPage(1);
      return;

    }

    const q = searchQuery.toLowerCase();

    const filtered = products.filter(
      (p) =>
        p.product_name?.toLowerCase().includes(q) ||
        p.product_description?.toLowerCase().includes(q)
    );

    setFilteredProducts(filtered);
    setCurrentPage(1);

  }, [searchQuery, products]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedItems =
    filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  // ---------------- BUY NOW ----------------
  const handleBuyNow = (product) => {

    navigate('/mpesapayment', {
      state: { product }
    });

  };

  // ---------------- ADD TO CART ----------------
  const handleAddToCart = (product) => {

    let cart =
      JSON.parse(localStorage.getItem("cart"))
      || [];

    const existingProductIndex =
      cart.findIndex(
        (item) =>
          item.product_id === product.product_id
      );

    if (existingProductIndex !== -1) {

      // INCREASE QUANTITY
      cart[existingProductIndex].quantity =
        (cart[existingProductIndex].quantity || 1) + 1;

    } else {

      // ADD NEW PRODUCT
      cart.push({
        ...product,
        quantity: 1
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    // REFRESH UI
    setProducts([...products]);

  };

  // ---------------- GET PRODUCT QUANTITY ----------------
  const getProductQuantity = (productId) => {

    let cart =
      JSON.parse(localStorage.getItem("cart"))
      || [];

    const item = cart.find(
      (item) => item.product_id === productId
    );

    return item ? item.quantity : 0;

  };

  // ---------------- UI ----------------
  return (

    <div
      className="container-fluid p-0"
      style={{ backgroundColor: "#F4E1D2" }}
    >

      <NavBar />

      <br />
      <br />

      {/* LOADING */}
      {loading && (

        <div className="alert alert-primary text-center">
          Loading products...
        </div>

      )}

      {/* ERROR */}
      {error && (

        <div className="alert alert-danger text-center">
          {error}
        </div>

      )}

      {/* TITLE */}
      <h1
        className="text-center"
        style={{ color: "#6F4F1F" }}
      >
        Our Chocolate Collection
      </h1>

      <p
        className="text-center"
        style={{ color: "#4B2E06" }}
      >
        Explore our premium chocolates
      </p>

      <hr />

      {/* SEARCH */}
      <div className="text-center my-4">

        <input
          type="search"
          placeholder="Search product..."
          className="form-control w-75 mx-auto shadow-sm"
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
        />

      </div>

      {/* PRODUCTS GRID */}
      <div className="row gx-3 gy-4 px-3">

        {!loading && paginatedItems.length === 0 ? (

          <h4 className="text-center text-muted">
            No products found
          </h4>

        ) : (

          paginatedItems.map((product, index) => (

            <div
              className="col-sm-6 col-md-4 d-flex justify-content-center"
              key={product.id || index}
            >

              <div
                className="card shadow-lg border-0 position-relative"
                style={{
                  width: "95%",
                  borderRadius: "15px",
                  backgroundColor: "#D2B48C"
                }}
              >

                {/* QUANTITY BADGE */}
                {getProductQuantity(product.product_id) > 0 && (

                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#4E3629",
                      color: "white",
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      zIndex: 10
                    }}
                  >

                    {getProductQuantity(product.product_id)}

                  </div>

                )}

                {/* PRODUCT IMAGE */}
                <img
                  src={
                    IMG_URL + product.product_photo
                  }
                  alt={product.product_name}
                  className="card-img-top"
                  style={{
                    height: "260px",
                    objectFit: "cover",
                    borderRadius:
                      "15px 15px 0 0"
                  }}
                  onError={(e) => {

                    e.target.src =
                      "https://via.placeholder.com/260x260?text=No+Image";

                  }}
                />

                {/* CARD BODY */}
                <div className="card-body d-flex flex-column">

                  <h5 className="card-title">
                    {product.product_name}
                  </h5>

                  <p className="card-text">
                    {product.product_description}
                  </p>

                  <p className="fw-bold">
                    Ksh {product.product_cost}
                  </p>

                  {/* BUTTONS */}
                  <div className="d-flex gap-2 mt-auto">

                    {/* ADD TO CART */}
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#4E3629",
                        color: "white",
                        width: "55px"
                      }}
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >

                      <FaShoppingCart />

                    </button>

                    {/* BUY NOW */}
                    <button
                      className="btn flex-grow-1"
                      style={{
                        backgroundColor: "#6F4F1F",
                        color: "white"
                      }}
                      onClick={() =>
                        handleBuyNow(product)
                      }
                    >

                      Buy Now

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (

        <div className="d-flex justify-content-center align-items-center my-4 gap-3">

          <button
            className="btn btn-outline-dark"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((p) => p - 1)
            }
          >

            Previous

          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-dark"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage((p) => p + 1)
            }
          >

            Next

          </button>

        </div>

      )}

      <Footer />

    </div>

  );
};

export default GetProduct;
