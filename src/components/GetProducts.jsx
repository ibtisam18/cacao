import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  const getproducts = async () => {
    setLoading("Please wait...");
    try {
      const response = await axios.get("https://Ibtisam.pythonanywhere.com/api/get_product_details");
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  useEffect(() => {
    if (!products) return;
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery, products]);

  const img_url = "https://Ibtisam.pythonanywhere.com/static/images/";

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#F4E1D2" }}>
      <NavBar />
      <br /><br />
      {loading && <div className="alert alert-primary mt-3" style={{ backgroundColor: "#D2B48C" }}>{loading}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <h1 className="text-center" style={{ color: "#6F4F1F", fontFamily: "'Georgia', serif" }}>Our Chocolate Collection</h1>
      <p className="text-center" style={{ color: "#4B2E06", fontSize: "1.2rem" }}>
        Explore our handcrafted selection of premium chocolates made with the finest ingredients
      </p>
      <hr />

      <div className='text-center my-4'>
        <h5 className="mb-3" style={{ color: "#6F4F1F" }}>Explore Pictures</h5>
        <input
          type="search"
          placeholder="Search for a product..."
          className="form-control w-75 mx-auto shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            borderRadius: "30px",
            borderColor: "#6F4F1F",
            padding: "12px",
            fontSize: "1.1rem",
          }}
          onFocus={(e) => e.target.style.borderColor = "#FFC107"}
        />
      </div>

      <div className="row gx-3 gy-4 px-3">
        {paginatedProducts.map((product, index) => (
          <div
            className="col-sm-6 col-md-4 d-flex justify-content-center"
            key={index}
          >
            <div
              className="card"
              style={{
                width: "95%",
                borderRadius: "15px",
                backgroundColor: "#D2B48C",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className="card-img-top"
                style={{
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "15px 15px 0 0",
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="text-dark" style={{ fontSize: "1rem", fontWeight: "bold" }}>{product.product_name}</h5>
                <p className="text-muted small">{product.product_description}</p>
                <p className="text-success fw-bold mb-3">Ksh. {product.product_cost}</p>
                <button
                  className="btn btn-warning mt-auto w-100"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#6F4F1F",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.9rem"
                  }}
                  onClick={() => navigate('/mpesapayment', { state: { product } })}
                >
                  Buy Now!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center my-4">
          <nav>
            <ul className="pagination pagination-lg">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  style={{ backgroundColor: "#fff", color: "#6F4F1F", borderColor: "#6F4F1F" }}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                    style={{
                      backgroundColor: currentPage === i + 1 ? "#C68E17" : "#fff",
                      color: currentPage === i + 1 ? "#fff" : "#6F4F1F",
                      borderColor: "#6F4F1F"
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  style={{ backgroundColor: "#fff", color: "#6F4F1F", borderColor: "#6F4F1F" }}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GetProduct;
