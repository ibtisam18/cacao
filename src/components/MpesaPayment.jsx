import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

import {
  FaMoneyBillWave,
  FaPhoneAlt,
  FaCheckCircle,
  FaSpinner,
  FaExclamationCircle
} from "react-icons/fa";

import { GiChocolateBar } from "react-icons/gi";

const IMG_URL =
  "https://ibtisam.pythonanywhere.com/static/images/";

const MpesaPayment = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // SINGLE PRODUCT
  const product =
    location.state?.product;

  // CART ITEMS
  const cartItems =
    location.state?.cartItems;

  // TOTAL
  const total =
    location.state?.total;

  const [phone, setPhone] = useState("");

  const [message, setMessage] =
    useState("");

  const [isError, setIsError] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // ====================================================
  // FINAL AMOUNT
  // ====================================================

  const finalAmount =
    total ||
    (product
      ? Number(product.product_cost)
      : 0);

  // ====================================================
  // PAYMENT
  // ====================================================

  const submit = async (e) => {

    e.preventDefault();

    if (!finalAmount) {

      setIsError(true);

      setMessage(
        "Invalid checkout amount."
      );

      return;
    }

    setLoading(true);

    setIsError(false);

    setMessage(
      "Please wait... Sending STK Push"
    );

    try {

      const response = await axios.post(
        "https://ibtisam.pythonanywhere.com/api/mpesa_payment",
        {
          phone: phone,
          amount: finalAmount
        },
        {
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

      console.log(
        "FULL MPESA RESPONSE:",
        response.data
      );

      // SUCCESS
      if (
        response.data.ResponseCode === "0"
      ) {

        setIsError(false);

        setMessage(
          "STK Push sent successfully. Check your phone."
        );

      } else {

        setIsError(true);

        setMessage(
          response.data.ResponseDescription ||
          response.data.errorMessage ||
          response.data.error ||
          "STK request failed"
        );

      }

    } catch (err) {

      console.log(
        "FULL ERROR:",
        err.response?.data ||
        err.message
      );

      setIsError(true);

      setMessage(
        err.response?.data
          ?.ResponseDescription ||
        err.response?.data
          ?.errorMessage ||
        err.response?.data?.error ||
        "Payment request failed"
      );

    } finally {

      setLoading(false);

    }
  };

  // ====================================================
  // NO PRODUCT / CART
  // ====================================================

  if (!product && !cartItems) {

    return (

      <div className="container text-center mt-5">

        <h2 className="text-danger">
          No product selected
        </h2>

        <p>
          Please go back and select a product.
        </p>

        <button
          className="btn btn-dark mt-3"
          onClick={() =>
            navigate('/getproduct')
          }
        >
          Back to Products
        </button>

      </div>

    );
  }

  // ====================================================
  // UI
  // ====================================================

  return (

    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9f5f0',
        paddingTop: '40px',
        paddingBottom: '40px'
      }}
    >

      <div
        className="card shadow-lg p-5"
        style={{
          backgroundColor: '#4B2E14',
          color: '#FFC107',
          borderRadius: '25px',
          maxWidth: '900px',
          width: '100%'
        }}
      >

        <h2 className="text-center mb-4">

          <FaMoneyBillWave className="me-2" />

          MPESA PAYMENT

        </h2>

        {/* ALERT */}

        {message && (

          <div
            className="alert text-center"
            style={{
              backgroundColor:
                isError
                  ? '#842029'
                  : '#C68E17',

              color: '#fff',
              fontWeight: 'bold'
            }}
          >

            {isError
              ? (
                <FaExclamationCircle className="me-2" />
              )
              : (
                <FaCheckCircle className="me-2" />
              )
            }

            {message}

          </div>

        )}

        {/* SINGLE PRODUCT */}

        {product && (

          <div
            className="d-flex align-items-center mb-4"
          >

            <img
              src={
                IMG_URL +
                product.product_photo
              }
              alt={product.product_name}
              style={{
                width: '150px',
                borderRadius: '15px',
                marginRight: '20px'
              }}
              onError={(e) => {

                e.target.src =
                  "https://via.placeholder.com/150?text=No+Image";

              }}
            />

            <div>

              <h4>

                <GiChocolateBar className="me-2" />

                {product.product_name}

              </h4>

              <p>
                {product.product_description}
              </p>

              <p>

                <strong>
                  Cost:
                </strong>

                {" "}

                Ksh {product.product_cost}

              </p>

            </div>

          </div>

        )}

        {/* CART ITEMS */}

        {cartItems && (

          <div className="row g-4 mb-4">

            {cartItems.map(
              (item, index) => (

                <div
                  className="col-md-4"
                  key={index}
                >

                  <div
                    className="card h-100 border-0 shadow"
                  >

                    <img
                      src={
                        IMG_URL +
                        item.product_photo
                      }
                      alt={
                        item.product_name
                      }
                      className="card-img-top"
                      style={{
                        height: '220px',
                        objectFit: 'cover'
                      }}
                    />

                    <div className="card-body text-dark">

                      <h5>
                        {item.product_name}
                      </h5>

                      <p>
                        Quantity:
                        {" "}
                        {item.quantity || 1}
                      </p>

                      <p>

                        Ksh {
                          Number(
                            item.product_cost
                          ) *
                          (
                            item.quantity || 1
                          )
                        }

                      </p>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

        {/* TOTAL */}

        <h3 className="text-center mb-4">

          Total Amount:
          {" "}
          Ksh {finalAmount}

        </h3>

        {/* FORM */}

        <form onSubmit={submit}>

          <label className="form-label text-white mb-1">

            <FaPhoneAlt className="me-2" />

            M-Pesa Phone Number

          </label>

          <input
            type="tel"
            className="form-control mb-3"
            placeholder="254708374149"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            required
          />

          {/* PAY BUTTON */}

          <button
            type="submit"
            className="btn w-100 mb-2"
            style={{
              backgroundColor: '#C68E17',
              color: '#fff',
              fontWeight: 'bold'
            }}
            disabled={loading}
          >

            {loading ? (

              <>

                <FaSpinner className="spin me-2" />

                Processing...

              </>

            ) : (

              <>

                <FaMoneyBillWave className="me-2" />

                Pay Ksh {finalAmount}

              </>

            )}

          </button>

        </form>

        {/* CONTINUE SHOPPING */}

        <button
          onClick={() =>
            navigate('/getproduct')
          }
          className="btn w-100 mt-2"
          style={{
            backgroundColor: '#6F4F1F',
            color: '#fff',
            fontWeight: 'bold'
          }}
        >

          Continue Shopping

        </button>

        {/* SPINNER CSS */}

        <style>{`

          .spin {
            animation: spin 1s linear infinite;
            display: inline-block;
          }

          @keyframes spin {

            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }

          }

        `}</style>

      </div>

    </div>

  );
};

export default MpesaPayment;