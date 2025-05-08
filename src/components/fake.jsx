import React from 'react';
import { Link } from 'react-router-dom';


export const Fake = () => {
  return (
    <div>
      <section className="row">
        <div className="col-md-12">
          <nav className="navbar navbar-expand-md navbar-dark bg-brown">
            {/* 'Cacao' brand name */}
            <Link to="/" className="navbar-brand1 fw-bolder display-1">Cacao</Link>
            <button 
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarcollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
          </nav>
        </div>
      </section>
    </div>
  );
};

export default Fake;
