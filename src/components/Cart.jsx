import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from './NavBar';
import Footer from './Footer';

const IMG_URL =
  "https://Ibtisam.pythonanywhere.com/static/images/";

const Cart = () => {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // LOAD CART
  useEffect(() => {

    const cart =
      JSON.parse(localStorage.getItem("cart"))
      || [];

    setCartItems(cart);

  }, []);

  // REMOVE ITEM
  const removeItem = (index) => {

    const updatedCart =
      [...cartItems];

    updatedCart.splice(index, 1);

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // TOTAL PRICE
  const total =
    cartItems.reduce(
      (sum, item) =>
        sum +
        (
          Number(item.product_cost) *
          (item.quantity || 1)
        ),
      0
    );

  // CHECKOUT
  const handleCheckout = () => {

    navigate('/mpesapayment', {
      state: {
        cartItems,
        total
      }
    });

  };

  return (

    <div
      style={{
        backgroundColor: "#F4E1D2",
        minHeight: "100vh"
      }}
    >

      <NavBar />

      <div className="container py-5">

        <h1
          className="text-center mb-5"
          style={{ color: "#4B2E14" }}
        >
          Your Cart
        </h1>

        {cartItems.length === 0 ? (

          <h4 className="text-center text-muted">
            Your cart is empty
          </h4>

        ) : (

          <>

            <div className="row g-4">

              {cartItems.map((item, index) => (

                <div
                  className="col-md-4"
                  key={index}
                >

                  <div
                    className="card shadow border-0 h-100"
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#D2B48C"
                    }}
                  >

                    {/* PRODUCT IMAGE */}
                    <img
                      src={
                        IMG_URL + item.product_photo
                      }
                      alt={item.product_name}
                      className="card-img-top"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                        borderRadius:
                          "15px 15px 0 0"
                      }}
                    />

                    {/* CARD BODY */}
                    <div className="card-body d-flex flex-column">

                      <h5>
                        {item.product_name}
                      </h5>

                      <p>
                        {item.product_description}
                      </p>

                      {/* SINGLE PRICE */}
                      <h6>
                        Price:
                        Ksh {item.product_cost}
                      </h6>

                      {/* QUANTITY */}
                      <p className="fw-bold mt-2">
                        Quantity:
                        {item.quantity || 1}
                      </p>

                      {/* ITEM TOTAL */}
                      <h5
                        style={{
                          color: "#4B2E14"
                        }}
                      >
                        Total:
                        Ksh {
                          Number(item.product_cost) *
                          (item.quantity || 1)
                        }
                      </h5>

                      {/* REMOVE BUTTON */}
                      <button
                        className="btn btn-danger mt-auto w-100"
                        onClick={() =>
                          removeItem(index)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* OVERALL TOTAL */}
            <div className="text-center mt-5">

              <h2
                style={{
                  color: "#4B2E14",
                  fontWeight: "bold"
                }}
              >
                Grand Total:
                Ksh {total}
              </h2>

              {/* CHECKOUT BUTTON */}
              <button
                className="btn btn-lg mt-4"
                style={{
                  backgroundColor: "#6F4F1F",
                  color: "white",
                  padding: "12px 35px",
                  borderRadius: "10px"
                }}
                onClick={handleCheckout}
              >
                Checkout with M-Pesa
              </button>

            </div>

          </>

        )}

      </div>

      <Footer />

    </div>

  );
};

export default Cart;
