import React from 'react';
import { FaWhatsapp, FaTiktok, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="text-white text-center text-lg-start mt-5 border-top shadow-lg"
      style={{ background: 'linear-gradient(135deg, #6F4F1F, #3E2A1D)' }}
    >
      <div className="container p-4">
        <div className="row">

          {/* About Section */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5
              className="text-uppercase fw-bold"
              style={{ color: 'white', textShadow: '2px 2px 5px rgba(255, 193, 7, 0.7)' }}
            >
              Cacao
            </h5>
            <p
              className="text-white"
              style={{ fontSize: '1.1rem', textShadow: '1px 1px 3px rgba(255, 193, 7, 0.5)' }}
            >
              Cacao is your trusted platform to sell chocolate online with ease and security.
              We offer an easy-to-use platform for selling and buying the finest chocolates online.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5
              className="text-uppercase fw-bold"
              style={{ color: 'white', textShadow: '2px 2px 5px rgba(255, 193, 7, 0.7)' }}
            >
              Quick Links
            </h5>
            <ul className="list-unstyled mb-0">
              <li><a href="/main" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/getproduct" className="text-white text-decoration-none">Products</a></li>
              <li><a href="/aboutus" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/chatbot" className="text-white text-decoration-none">Chatbot</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5
              className="text-uppercase fw-bold"
              style={{ color: 'white', textShadow: '2px 2px 5px rgba(255, 193, 7, 0.7)' }}
            >
              Contact
            </h5>
            <p className="text-white mb-1" style={{ fontSize: '1.1rem' }}>Phone: +254 700 123 456</p>
            <p className="text-white mb-1" style={{ fontSize: '1.1rem' }}>Email: info@cacao.com</p>
            <p className="text-white" style={{ fontSize: '1.1rem' }}>Nairobi, Kenya</p>
          </div>

        </div>
      </div>

      {/* Social Media Icons */}
      {/* Social Media Icons */}
<div
  className="text-center p-3"
  style={{
    backgroundColor: '#4E2C0B',
    borderRadius: '5px'
  }}
>

  {/* WhatsApp */}
  <a
    href="https://wa.me/254700123456"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white mx-3"
  >
    <FaWhatsapp size={40} />
  </a>

  {/* TikTok */}
  <a
    href="https://www.tiktok.com/@yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white mx-3"
  >
    <FaTiktok size={40} />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white mx-3"
  >
    <FaInstagram size={40} />
  </a>

</div>

      {/* Copyright Section */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: '#6F4F1F', borderRadius: '5px' }}
      >
        <p
          className="text-white mb-0"
          style={{ fontSize: '1rem', textShadow: '2px 2px 5px rgba(255, 193, 7, 0.7)' }}
        >
          © {new Date().getFullYear()} Cacao | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
