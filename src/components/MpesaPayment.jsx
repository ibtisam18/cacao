import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from "axios";
import {
  FaMoneyBillWave,
  FaPhoneAlt,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";
import { GiChocolateBar } from "react-icons/gi";  // Import chocolate icon

const MpesaPayment = () => {
  const { product } = useLocation().state || {};
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const submit = async (e) => {
    e.preventDefault();
    setMessage("Please wait...");
    setLoading(true);

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("amount", product.product_cost);

    try {
      await axios.post("https://Ibtisam.pythonanywhere.com/api/mpesa_payment", formData);
      setMessage("✅ Please input your pin on your phone. Thank you.");
    } catch (error) {
      setMessage("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/getproduct'); // Navigate to getproduct route
  };

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">No product selected.</h2>
        <p>Please return to the products page and select a product first.</p>
      </div>
    );
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9f5f0'
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          backgroundColor: '#4B2E14',
          color: '#FFC107',
          borderRadius: '25px',
          maxWidth: '750px',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#FFC107' }}>
          <FaMoneyBillWave className="me-2" />
          MPESA Payment
        </h2>

        {message && (
          <div
            className="alert text-center"
            style={{
              backgroundColor: '#C68E17',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '10px'
            }}
          >
            <FaCheckCircle className="me-2" />
            {message}
          </div>
        )}

        {/* Product Display */}
        <div className="d-flex flex-column flex-md-row align-items-center mb-4">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.product_name}
              className="img-fluid mb-3 mb-md-0"
              style={{
                maxWidth: '160px',
                borderRadius: '15px',
                marginRight: '25px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            />
          )}
          <div>
            <h4 className="mb-2">
              {/* Chocolate bar icon */}
              <GiChocolateBar className="me-2 text-warning" style={{ fontSize: '1.5rem' }} />
              {product.product_name}
            </h4>
            <p style={{ fontSize: '1.2rem' }}>
              <strong>Cost:</strong> <span style={{ color: '#fcd34d' }}>Ksh. {product.product_cost}</span>
            </p>
          </div>
        </div>

        <hr style={{ borderColor: '#C68E17' }} />

        {/* Phone Input */}
        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="phone" className="form-label text-white">
              <FaPhoneAlt className="me-2" />
              Enter Phone Number (254*********)
            </label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              placeholder="e.g. 254712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="2547\d{8}"
              title="Enter a valid Safaricom number like 254712345678"
              required
              style={{
                borderRadius: '12px',
                padding: '14px',
                fontSize: '1rem',
                border: '2px solid #C68E17'
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn w-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: '#C68E17',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              padding: '14px',
              borderRadius: '12px',
              transition: '0.3s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
            disabled={loading}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#a56f14')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#C68E17')}
          >
            {loading ? (
              <>
                <FaSpinner className="me-2 spin" style={{ animation: 'spin 1s linear infinite' }} />
                Processing...
              </>
            ) : (
              <>
                <FaMoneyBillWave className="me-2" />
                Make Payment
              </>
            )}
          </button>
        </form>

        {/* Continue Shopping Button below the card */}
        <div className="mt-4">
          <button
            className="btn w-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: '#C68E17',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              padding: '14px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>

      {/* Spinner animation */}
      <style>{`
        .spin {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MpesaPayment;
