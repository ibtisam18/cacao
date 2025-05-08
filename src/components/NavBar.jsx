import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaListAlt, FaInfoCircle, FaComments } from 'react-icons/fa'; // FontAwesome icons for navbar items

// NavBar component
export const NavBar = () => {
  return (
    <div>
      <section className="row">
        <div className="col-md-12">
          {/* Bootstrap navbar with dark brown background */}
          <nav className="navbar navbar-expand-md navbar-dark bg-brown">
            
            {/* Brand logo/text that links to home */}
            <Link to="/signin" className="navbar-brand fw-bolder display-1">Cacao</Link>
            
            {/* Toggle button for collapsed menu on small screens */}
            <button 
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarcollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsible navbar content */}
            <div className="collapse navbar-collapse" id="navbarcollapse">
              {/* Left-aligned navigation links */}
              <div className="navbar-nav">
                
                {/* Home link with icon */}
                <NavLink 
                  to="/main" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  <FaHome className="me-2" /> Home
                </NavLink>

                {/* Products link with icon */}
                <NavLink 
                  to="/getproduct" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  <FaListAlt className="me-2" /> Products
                </NavLink>

                {/* About Us link with icon */}
                <NavLink 
                  to="/aboutus" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  <FaInfoCircle className="me-2" /> About Us
                </NavLink>

                {/* Chatbot link with icon */}
                <NavLink 
                  to="/chatbot" 
                  className="nav-link"
                >
                  <FaComments className="me-2" /> Chatbot
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default NavBar;
