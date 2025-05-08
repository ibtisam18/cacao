import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const products = [ 
    {
      src: "/images/vizo.jpeg.jfif",
      title: "Vizzio Cacao",
      desc: "A bold fusion of roasted cocoa and silky texture — an everyday luxury for true chocolate lovers.",
      price: "$10.00",
      product_cost: 1000,
      product_name: "Vizzio Cacao"
    },
    {
      src: "/images/choco27.jpeg.jfif",
      title: "Elbrus Chocolate",
      desc: "Decadent dark chocolate crafted with precision — rich, deep, and unforgettable.",
      price: "$15.00",
      product_cost: 1500,
      product_name: "Elbrus Chocolate"
    },
    {
      src: "/images/wow.jpeg.jfif",
      title: "Criollo",
      desc: "Creamy milk chocolate made from rare Criollo beans — smooth, mellow, and irresistibly sweet.",
      price: "$12.00",
      product_cost: 1200,
      product_name: "Criollo"
    },
    {
      src: "/images/choco18.jpeg.jfif",
      title: "Cluizel",
      desc: "Delicate chocolate truffles with a velvety core — a luxurious treat for refined palates.",
      price: "$20.00",
      product_cost: 2000,
      product_name: "Cluizel"
    }
  ];

  const handleBuyNow = (product) => {
    navigate("/MpesaPayment", { state: { product } });
  };

  return (
    <div>
      <NavBar />

      {/* Featured Chocolates Section */}
      <section className="featured-section text-center py-5" style={{ backgroundColor: '#f3e5ab' }} data-aos="fade-up"> <br />
        <h1 className="display-4 fw-bold" style={{ color: '#4E3629' }}>Our Featured Chocolates</h1>
        <p className="lead text-dark" style={{ fontSize: '1.1rem', color: '#4E3629', fontWeight: 'normal', lineHeight: '1.6', marginBottom: '20px' }}>
          Explore our luxurious range of artisanal chocolates crafted for indulgence and elegance.
        </p>
      </section>
      <br /><hr />

      {/* Card Grid */}
      <div className="container py-4" data-aos="fade-up">
        <div className="row g-4">
          {products.map((item, index) => (
            <div className="col-md-6" key={index}>
              <div className="card shadow-lg border-0 h-100" style={{ backgroundColor: '#8B5E3C', color: '#fff' }}>
                <img
                  src={item.src}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: '280px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">{item.title}</h5>
                  <p className="card-text">{item.desc}</p>
                  <p className="card-cost fw-bold">{item.price}</p>
                  <button
                    className="btn w-100"
                    style={{ backgroundColor: '#C68E17', color: '#fff' }}
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clickable Paragraph to Navigate to Get Products Page */}
      <div className="text-center pb-4" data-aos="fade-up">
        <Link
          to="/getproduct"
          style={{
            display: 'inline-block',
            color: '#C68E17',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'color 0.3s ease',
            padding: '10px 0',
            cursor: 'pointer'
          }}
        >
          View all products <span style={{ marginLeft: '5px' }}>→</span>
        </Link>
      </div>
      <hr /><br />

      {/* Chocolate Journey Section */}
      <section className="row" data-aos="fade-up">
        <div className="col-md-6" data-aos="fade-right">
          <img
            src="/images/ganache.jpeg.jfif"
            alt="Roasting Process"
            style={{
              width: '550px',
              height: '390px',
              borderRadius: '10px',
            }}
          />
        </div>

        <div className="col-md-6" data-aos="fade-left">
          <h3 className="left-aligned-heading" style={{ color: '#4E3629' }}>Our Chocolate Journey</h3>
          <p className="lead text-dark" style={{
            fontSize: '1.1rem', 
            color: '#4E3629', 
            fontWeight: 'normal', 
            lineHeight: '1.6', 
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            At Cacao, our journey begins with a passion for crafting the finest chocolate. From the moment we hand-pick the finest cacao beans, our process is infused with precision and dedication. Our expert chocolatiers carefully roast the beans to unlock their full flavor profile, ensuring that every batch is rich, aromatic, and full of character. We believe that true chocolate lovers deserve a product that embodies craftsmanship and quality at every step. Our beans are sourced from sustainable farms, ensuring ethical production and environmental responsibility. As the chocolate transforms from bean to bar, we maintain a careful balance of tradition and innovation, resulting in a product that’s both classic and forward-thinking.
          </p>
          <br />
          <Link to="/aboutus" style={{ textDecoration: 'none' }}>
            <button className="btn" style={{ backgroundColor: '#8B5E3C', color: '#fff', padding: '8px 16px' }}>
              Learn more about us <span style={{ marginLeft: '8px', fontSize: '1.2rem', color: '#fff' }}>→</span>
            </button>
          </Link>
        </div>
      </section>
      <hr /><br />

      {/* Customers' Feedback Section */}
      <h1 style={{ color: '#4E3629' }} data-aos="fade-up">
        What Our Customers Have To Say
      </h1>

      <div className="container py-4" data-aos="fade-up">
        <div className="row g-4">
          {[ 
            {
              name: "Sarah Harrison.",
              feedback: "Cacao chocolates are truly indulgent and have an unforgettable richness that you just can't get from any other chocolate. Each bite feels like a moment of pure bliss.",
              imgSrc: "/images/sarah.jpeg.jfif",
            },
            {
              name: "John Day.",
              feedback: "As a chocolate lover, I can say with confidence that Cacao's chocolates are on another level. The deep cocoa flavor and smooth texture make every bite a masterpiece.",
              imgSrc: "/images/john.jpeg.jfif",
            },
            {
              name: "Emily Riley.",
              feedback: "Cacao’s chocolates are simply divine. The craftsmanship behind each piece shines through, creating an indulgent experience that’s second to none.",
              imgSrc: "/images/emily.jpeg.jfif",
            }
          ].map((testimonial, index) => (
            <div className="col-md-4" key={index} data-aos="fade-up">
              <div className="card shadow-lg border-0 h-100" style={{ backgroundColor: '#8B5E3C', color: '#fff' }}>
                <div className="d-flex align-items-center p-3">
                  <img
                    src={testimonial.imgSrc}
                    alt={`Customer ${testimonial.name}`}
                    style={{
                      height: '80px',
                      width: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '20px',
                    }}
                  />
                  <div>
                    <h5 className="card-title">{testimonial.name}</h5>
                    <p className="card-text" style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                      "{testimonial.feedback}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr /><br />
      <Footer />
    </div>
  );
};

export default Home;
