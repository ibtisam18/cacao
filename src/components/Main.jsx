import React, { useEffect } from 'react';
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

  // ================= PRODUCTS =================
  const products = [
    {
      product_photo: "choco11.jfif",
      product_name: "Chocolat",
      product_description:
        "A bold fusion of roasted cocoa and silky texture — an everyday luxury for true chocolate lovers.",
      product_cost: 1000,
      price_display: "Ksh 1,000"
    },

    {
      product_photo: "choco27.jfif",
      product_name: "Elbrus Chocolate",
      product_description:
        "Decadent dark chocolate crafted with precision — rich, deep, and unforgettable.",
      product_cost: 1500,
      price_display: "Ksh 1,500"
    },

    {
      product_photo: "choco14.jfif",
      product_name: "La Naya",
      product_description:
        "Creamy milk chocolate made from rare beans — smooth, mellow, and irresistibly sweet.",
      product_cost: 1200,
      price_display: "Ksh 1,200"
    },

    {
      product_photo: "choco18.jfif",
      product_name: "Cluizel",
      product_description:
        "Delicate chocolate truffles with a velvety core — a luxurious treat for refined palates.",
      product_cost: 2000,
      price_display: "Ksh 2,000"
    }
  ];

  // ================= BUY NOW =================
  const handleBuyNow = (product) => {
    navigate("/mpesapayment", { state: { product } });
  };

  // ================= IMAGE URL =================
    const IMG_URL = "https://Ibtisam.pythonanywhere.com/static/images/";

  return (
    <div>

      <NavBar />

      {/* ================= FEATURED SECTION ================= */}

      <section
        className="featured-section text-center py-5"
        style={{ backgroundColor: '#f3e5ab' }}
        data-aos="fade-up"
      >

        <br />

        <h1
          className="display-4 fw-bold"
          style={{ color: '#4E3629' }}
        >
          Our Featured Chocolates
        </h1>

        <p
          className="lead text-dark"
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}
        >
          Explore our luxurious range of artisanal chocolates
          crafted for indulgence and elegance.
        </p>

      </section>

      <br />
      <hr />

      {/* ================= PRODUCT CARDS ================= */}

      <div className="container py-4" data-aos="fade-up">

        <div className="row g-4">

          {products.map((item, index) => (

            <div className="col-md-6" key={index}>

              <div
                className="card shadow-lg border-0 h-100"
                style={{
                  backgroundColor: '#8B5E3C',
                  color: '#fff'
                }}
              >

                <img
                  src={`${IMG_URL}${item.product_photo}`}
                  alt={item.product_name}
                  className="card-img-top"
                  style={{
                    height: '280px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/280x280?text=No+Image";
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <h5 className="card-title fw-semibold">
                    {item.product_name}
                  </h5>

                  <p className="card-text">
                    {item.product_description}
                  </p>

                  <p className="fw-bold">
                    {item.price_display}
                  </p>

                  <button
                    className="btn w-100 mt-auto"
                    style={{
                      backgroundColor: '#C68E17',
                      color: '#fff'
                    }}
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

      {/* ================= VIEW ALL ================= */}

      <div
        className="text-center pb-4"
        data-aos="fade-up"
      >

        <Link
          to="/getproduct"
          style={{
            display: 'inline-block',
            color: '#C68E17',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1.1rem',
            padding: '10px 0'
          }}
        >
          View all products
          <span style={{ marginLeft: '5px' }}>
            →
          </span>
        </Link>

      </div>

      <hr />
      <br />

      {/* ================= CHOCOLATE JOURNEY ================= */}

     <section
  className="row px-4 align-items-center"
  data-aos="fade-up"
>

  {/* LEFT SIDE - TEXT */}
  <div
    className="col-md-6"
    data-aos="fade-right"
  >

    <h3
      style={{
        color: '#4E3629',
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}
    >
      Our Chocolate Journey
    </h3>

    <p
      className="lead text-dark"
      style={{
        fontSize: '1.2rem',
        lineHeight: '1.8',
        marginBottom: '25px',
        textAlign: 'left'
      }}
    >
      At Cacao, our journey begins with a passion
      for crafting the finest chocolate. From the
      moment we hand-pick the finest cacao beans,
      our process is infused with precision and
      dedication.
    </p>

    <Link
      to="/aboutus"
      style={{ textDecoration: 'none' }}
    >

      <button
        className="btn"
        style={{
          backgroundColor: '#8B5E3C',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1rem'
        }}
      >
        Learn more about us
        <span
          style={{
            marginLeft: '8px',
            fontSize: '1.2rem'
          }}
        >
          →
        </span>
      </button>

    </Link>

  </div>

  {/* RIGHT SIDE - IMAGE */}
  <div
    className="col-md-6 mb-4 text-center"
    data-aos="fade-left"
  >

    <img
      src={`${IMG_URL}choco30.jpeg.jfif`}
      alt="Chocolate Journey"
      style={{
        width: '100%',
        maxWidth: '550px',
        height: '500px',
        borderRadius: '15px',
        objectFit: 'cover',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
      onError={(e) => {
        e.target.src =
          "https://via.placeholder.com/550x500?text=Chocolate+Journey";
      }}
    />

  </div>

</section>

      <hr />
      <br />

      {/* ================= TESTIMONIALS ================= */}

      <h1
        className="text-center"
        style={{ color: '#4E3629' }}
        data-aos="fade-up"
      >
        What Our Customers Have To Say
      </h1>

      <div className="container py-4">

        <div className="row g-4">

          {[
            {
              name: "Sarah Harrison.",
              feedback:
                "Cacao chocolates are truly indulgent and unforgettable.",
              imgSrc: "girl1.jpg"
            },

            {
              name: "John Day.",
              feedback:
                "Cacao's chocolates are on another level.",
              imgSrc: "boy.jpg"
            },

            {
              name: "Emily Riley.",
              feedback:
                "The craftsmanship creates an indulgent experience.",
              imgSrc: "girl2.jpg"
            }

          ].map((testimonial, index) => (

            <div className="col-md-4" key={index}>

              <div
                className="card shadow-lg border-0 h-100"
                style={{
                  backgroundColor: '#8B5E3C',
                  color: '#fff'
                }}
              >

                <div className="d-flex align-items-center p-3">

                  <img
                    src={`${IMG_URL}${testimonial.imgSrc}`}
                    alt={testimonial.name}
                    style={{
                      height: '80px',
                      width: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '20px'
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80?text=User";
                    }}
                  />

                  <div>

                    <h5 className="card-title mb-1">
                      {testimonial.name}
                    </h5>

                    <p
                      className="card-text"
                      style={{
                        fontStyle: 'italic',
                        fontSize: '1rem'
                      }}
                    >
                      "{testimonial.feedback}"
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <hr />
      <br />

      <Footer />

    </div>
  );
};

export default Home;
