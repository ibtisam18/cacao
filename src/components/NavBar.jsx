import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import {
  FaHome,
  FaListAlt,
  FaInfoCircle,
  FaComments,
  FaPlusSquare,
  FaSignOutAlt,
  FaUserCircle,
  FaShoppingCart
} from 'react-icons/fa';

const NavBar = () => {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user") || "null");

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("user");
    navigate("/signin");

  };

  const closeMenu = () => setMenuOpen(false);

  return (

    <nav
      className="navbar navbar-expand-md navbar-dark"
      style={{ backgroundColor: '#4B2E14' }}
    >

      {/* BRAND */}
      <Link
        to="/main"
        className="navbar-brand fw-bolder ms-3"
        style={{
          fontSize: '1.8rem',
          color: '#FFC107'
        }}
      >
        🍫 Cacao
      </Link>

      {/* TOGGLER */}
      <button
        className="navbar-toggler me-3"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-controls="navbarcollapse"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >

        <span className="navbar-toggler-icon"></span>

      </button>

      {/* NAV LINKS */}
      <div
        className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
        id="navbarcollapse"
      >

        {/* LEFT LINKS */}
        <div className="navbar-nav me-auto">

          <NavLink
            to="/main"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            <FaHome className="me-1" />
            Home
          </NavLink>

          <NavLink
            to="/getproduct"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            <FaListAlt className="me-1" />
            Products
          </NavLink>

          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            <FaInfoCircle className="me-1" />
            About Us
          </NavLink>

          <NavLink
            to="/chatbot"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            <FaComments className="me-1" />
            Chatbot
          </NavLink>

          {/* ADD PRODUCT */}
          {user && (

            <NavLink
              to="/addproduct"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={closeMenu}
            >
              <FaPlusSquare className="me-1" />
              Add Product
            </NavLink>

          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-nav ms-auto me-3 d-flex align-items-center gap-3">

          {/* CART ICON */}
          <Link
            to="/cart"
            className="position-relative text-decoration-none"
            onClick={closeMenu}
          >

            <FaShoppingCart
              size={28}
              color="#FFC107"
            />

            {/* CART COUNT */}
            {cart.length > 0 && (

              <span
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {cart.length}
              </span>

            )}

          </Link>

          {/* USER INFO */}
          {user ? (

            <>

              <span className="nav-link text-warning">

                <FaUserCircle className="me-1" />
                {user.username}

              </span>

              <button
                className="btn btn-sm"
                style={{
                  backgroundColor: '#C68E17',
                  color: '#fff'
                }}
                onClick={handleLogout}
              >

                <FaSignOutAlt className="me-1" />
                Logout

              </button>

            </>

          ) : (

            <Link
              to="/signin"
              className="btn btn-sm"
              style={{
                backgroundColor: '#C68E17',
                color: '#fff'
              }}
              onClick={closeMenu}
            >
              Sign In
            </Link>

          )}

        </div>

      </div>

    </nav>

  );
};

export default NavBar;
