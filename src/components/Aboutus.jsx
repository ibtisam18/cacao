import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const AboutUs = () => {
  return (
    <div className="about-container">
      <NavBar />
      <header className="about-header" data-aos="fade-down" data-aos-duration="1000"><br />
        <h1 className="about-us-title">About Us</h1>
        <hr />
      </header>
      <h2 className="left-aligned-heading" data-aos="fade-up" data-aos-duration="1000">Our Story</h2>
      <div className="about-story">
        <section className="row">
          {/* Text on the left */}
          <div className="col-md-6" data-aos="fade-right" data-aos-duration="1500">
            <div className="">
              <div className="">
                <p className="about-text">
                  Cacao began in 2005 when our founder, Maria Rodriguez, returned from a life-changing trip to Ecuador where she discovered the incredible world of fine chocolate. Inspired by the rich flavors and traditional methods she encountered, Maria set out to create a chocolate company that would honor the craft while bringing exceptional flavors to chocolate lovers everywhere.
                  <br /><br />
                  What started as a small operation in Maria's kitchen has grown into a beloved chocolate brand known for its commitment to quality, sustainability, and innovation. Today, we continue to source the finest cacao beans from around the world and transform them into exceptional chocolate creations in our workshop.
                  <br /><br />
                  Our passion for chocolate drives everything we do. We believe that chocolate is more than just a treat—it's an experience that brings joy, comfort, and wonder to life's special moments.
                </p>
              </div>
            </div>
          </div>

          {/* Image on the right */}
          <div className="col-md-6" data-aos="fade-left" data-aos-duration="1500">
            <div className="">
              <div className="">
              <img
                src="/images/choco.jpeg.jfif"
                alt="Chocolate Display"
                className="hover-image"
                style={{
                  width: '90%',
                  height: '350px',
                  borderRadius: '10px',
                  transition: 'transform 0.3s ease',
                }}
      
              />
              </div>
            </div>
          </div>
        </section>
      </div>
      <br /><br /><hr /><br />

{/* Grid section with darker beige background */}
<section className="container-fluid py-5" style={{ backgroundColor: '#E4D8B4' }}>
  <h2 
    className="text-center mb-4 text-white" 
    style={{ 
      position: 'relative',  // To position the pseudo-element below the text
      display: 'inline-block', 
    }}
    data-aos="fade-down" data-aos-duration="1000"  // Added fade-down animation
  >
    Our Values
    <span 
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        backgroundColor: 'white',
        transition: 'width 0.5s ease', // Animation for width change
      }}
      className="underline-animation"
    ></span>
  </h2>
  <p data-aos="fade-up" data-aos-duration="1000">The principles that guide everything we do at Cacao</p>

  <div className="container">
    <div className="row">
      {/* Card 1 - Artisan (🎂 Cake emoji) */}
      <div className="col-md-6 mb-4" data-aos="zoom-in" data-aos-duration="1500">
        <div className="card shadow-sm h-100 text-center">
          <div className="card-body">
            <div style={{ fontSize: '2rem' }}>🎂</div>
            <h5 className="card-title mt-3">Artisan Craft</h5>
            <p className="card-text">Handcrafted chocolates made with traditional techniques and passion.</p>
          </div>
        </div>
      </div>

      {/* Card 2 - Sustainability (🍃 Leaf emoji) */}
      <div className="col-md-6 mb-4" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200">
        <div className="card shadow-sm h-100 text-center">
          <div className="card-body">
            <div style={{ fontSize: '2rem' }}>🍃</div>
            <h5 className="card-title mt-3">Sustainability</h5>
            <p className="card-text">We source cacao from farms using eco-friendly, ethical practices.</p>
          </div>
        </div>
      </div>

      {/* Card 3 - Passion (❤️ Heart emoji) */}
      <div className="col-md-6 mb-4" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="400">
        <div className="card shadow-sm h-100 text-center">
          <div className="card-body">
            <div style={{ fontSize: '2rem' }}>❤️</div>
            <h5 className="card-title mt-3">Passion</h5>
            <p className="card-text">Driven by love for chocolate and the art of creation.</p>
          </div>
        </div>
      </div>

      {/* Card 4 - Community (👥 People emoji) */}
      <div className="col-md-6 mb-4" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="600">
        <div className="card shadow-sm h-100 text-center">
          <div className="card-body">
            <div style={{ fontSize: '2rem' }}>👥</div>
            <h5 className="card-title mt-3">Community Support</h5>
            <p className="card-text">We grow strong relationships with farmers, customers, and partners.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<br /><br />
<section data-aos="fade-up" data-aos-duration="1000">
  <hr /><br />
  <div>
    <h2 data-aos="fade-down" data-aos-duration="1000">Our Chocolate Making Process</h2>
    <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">From bean to bar, discover how we craft our exceptional chocolates</p>
  </div>
</section>

<button className="caramel-button" data-aos="zoom-in" data-aos-duration="1000">Step 1</button> <br />

<section className="row" data-aos="fade-up" data-aos-duration="1000">
  {/* Text on the left */}
  <div className="col-md-6" data-aos="fade-right" data-aos-duration="1000">
    <h3 className="left-aligned-heading">Bean Selection</h3><br />
    <p className="about-text">
      At the heart of every chocolate bar lies the carefully selected cacao bean. Our team works directly with farmers from renowned cacao-growing regions such as Ecuador, Madagascar, Peru, and Venezuela. <br /> 
      Each region brings a distinct flavor profile, from the rich and robust notes of Ecuadorian beans to the delicate floral undertones found in Madagascan varieties. <br /> 
      By sourcing only the finest beans and maintaining strong, sustainable relationships with our farmers, we ensure that each batch of our chocolate is of the highest quality. From bean to bar, our commitment to excellence is reflected in every bite.
    </p>
  </div>

  {/* Image on the right */}
  <div className="col-md-6" data-aos="fade-left" data-aos-duration="1000">
    <div className="">
      <div className="">
        <img
          src="/images/choosing.jpeg.jfif"
          alt="Choosing Process"
          style={{
            width: '550px',
            height: '380px',
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  </div>
</section>

        <br /><br /><br /><br />
        <section className="row" data-aos="fade-up" data-aos-duration="1000">
  {/* Image on the left */}
  <div className="col-md-6" data-aos="fade-right" data-aos-duration="1000">
    <div className="">
      <div className=""> {/* Align image to the left */}
        <img
          src="/images/roasting.jpeg.jfif"
          alt="Roasting Process"
          style={{
            width: '550px',
            height: '390px',
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  </div>

  {/* Text and Button on the right */}
  <div className="col-md-6" data-aos="fade-left" data-aos-duration="1000">
    <button className="caramel-button" data-aos="zoom-in" data-aos-duration="1000">Step 2</button> <br />
    <h3 className="left-aligned-heading">Roasting & Cracking</h3>
    <p className="about-text">
      Roasting is the crucial step that brings out the rich and complex flavors of cacao beans. After being carefully harvested, the cacao beans are roasted at precise temperatures, usually between 120°C and 150°C, for a specific amount of time. This process enhances the bean's natural flavor while removing any unwanted bitterness. The roasting temperature and duration are carefully controlled to preserve the delicate aromas and to ensure the perfect balance of flavors. Once roasted, the beans undergo a process called cracking, where the outer shell is broken into smaller pieces, revealing the inner nibs. These nibs are the heart of the cacao bean and contain the essential cocoa solids and cocoa butter used in making chocolate.
    </p>
  </div>
</section>

<br /><br />


<button className="caramel-button" data-aos="zoom-in" data-aos-duration="1000">Step 3</button> <br />
<section className="row" data-aos="fade-up" data-aos-duration="1000">
  {/* Text on the left */}
  <div className="col-md-6" data-aos="fade-right" data-aos-duration="1000">
    <h3 className="left-aligned-heading">Grinding & Conching </h3><br />
    <p className="about-text">
      Once the cacao beans have been harvested, fermented, and dried, they undergo a crucial transformation during the grinding and conching process. First, the beans are ground into a thick paste called chocolate liquor, which contains both cocoa solids and cocoa butter. <br /> This paste is then refined further through conching, a process that involves continuously mixing and aerating the chocolate to smooth out its texture. <br />Conching not only helps to reduce the bitterness of the cocoa but also enhances the flavor, making it more complex and mellow. <br /> This critical stage allows the chocolate to achieve the perfect balance of smoothness and flavor depth, preparing it for molding into the delicious bars we all love..
    </p>
  </div>

  {/* Image on the right */}
  <div className="col-md-6" data-aos="fade-left" data-aos-duration="1000">
    <div className="">
      <div className="">
        <img
          src="/images/grinding.jpeg.jfif"
          alt="Grinding Process"
          style={{
            width: '550px',
            height: '390px',
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  </div>
</section>

        <br /><br /><br />

        <section className="row" data-aos="fade-up" data-aos-duration="1000">
  {/* Image on the left */}
  <div className="col-md-6" data-aos="fade-right" data-aos-duration="1000">
    <div className="">
      <div className=""> {/* Align image to the left */}
        <img
          src="/images/tempering.jpeg.jfif"
          alt="Tempering Process"
          style={{
            width: '550px',
            height: '390px',
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  </div>

  {/* Text and Button on the right */}
  <div className="col-md-6" data-aos="fade-left" data-aos-duration="1000">
    <button className="caramel-button" data-aos="zoom-in" data-aos-duration="1000">Step 4</button> <br />
    <h3 className="left-aligned-heading">Tempering & Molding</h3>
    <p className="about-text">
      After the grinding, conching, and refining processes, the chocolate reaches the critical tempering stage. Tempering involves carefully heating and cooling the chocolate to specific temperatures, typically between 30°C to 32°C, to stabilize the cocoa butter crystals. This process ensures that the chocolate will have a glossy finish, a smooth, silky texture, and the perfect snap when broken. Proper tempering also prevents the chocolate from developing unsightly streaks or a grainy texture, which can happen if the cocoa butter crystals are not properly aligned. Once tempered, the chocolate is poured into molds, where it takes on its final shape. The molding process is essential for ensuring that the chocolate hardens evenly and can be easily removed from the molds.
    </p>
  </div> <br /><br /><br /><br />
</section><hr /><br />
<div className="sustainability-grid" data-aos="fade-up" data-aos-duration="1000">
  {/* Text on the left */}
  <div className="sustainability-text" data-aos="fade-right" data-aos-duration="1000">
    <h2 className="left-aligned-heading">Our Commitment to Sustainability</h2>
    <p className="about-text">
      At Cacao, sustainability isn't just a buzzword—it's central to our mission. We believe that exceptional chocolate should be good for both people and the planet.
      <br />
      We work directly with cacao farmers to ensure fair wages and sustainable farming practices. By paying premium prices for our beans, we help farming communities thrive while encouraging environmentally responsible cultivation methods.
      <br />
      Our packaging is made from recycled and biodegradable materials, and we continuously work to reduce our carbon footprint across our entire operation.
      <br />
      Through our Cacao Foundation, we reinvest a portion of our profits into education and infrastructure projects in the communities where our cacao is grown.
    </p>
  </div>

  {/* Image on the right */}
  <div className="sustainability-image" data-aos="fade-up">
  <img
    src="/images/cacao.jpeg.jfif"
    alt="Chocolate Display"
    className="hover-image"
    style={{
      width: '90%',
      height: '450px',
      borderRadius: '10px',
      transition: 'transform 0.3s ease',
    }}
  />
</div>

</div>
<br /><hr />


<section className="container py-5" data-aos="fade-up" data-aos-duration="1000">
  <h2 className="text-center mb-4">Meet Our Team</h2>
  <p className="text-center mb-5">The passionate individuals behind our chocolate creations</p>
  <div className="row">
    {/* Card 1 */}
    <div className="col-md-4 mb-4" data-aos="fade-right" data-aos-duration="1000">
      <div className="card shadow-sm h-100 text-center">
        <div className="card-body">
          <img
            src="/images/maria.jpeg.jfif"
            alt="Tempering Process"
            style={{
              width: '320px',
              height: '420px',
              borderRadius: '10px',
            }}
          />
          <h4 className="card-title">Maria Rodriguez</h4>
          <p>Founder & Master Chocolatier</p><br />
          <p className="card-text">Founder & Master Chocolatier. Maria started Cacao after discovering her love for artisanal chocolate in Ecuador.</p>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-duration="1000">
      <div className="card shadow-sm h-100 text-center">
        <div className="card-body">
          <img
            src="/images/alex.jpeg.jfif"
            alt="Tempering Process"
            style={{
              width: '320px',
              height: '420px',
              borderRadius: '10px',
            }}
          />
          <h4 className="card-title">Alexander Smith</h4>
          <p>Head of Production</p>
          <p className="card-text">Head of Production. Alexander ensures every batch of chocolate meets our rigorous quality and flavor standards.</p>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-md-4 mb-4" data-aos="fade-left" data-aos-duration="1000">
      <div className="card shadow-sm h-100 text-center">
        <div className="card-body">
          <img
            src="/images/zuheila.jpeg.jfif"
            alt="Tempering Process"
            style={{
              width: '320px',
              height: '420px',
              borderRadius: '10px',
            }}
          />
          <h4 className="card-title">Zuheila Aden</h4>
          <p>Head of Sourcing</p><br />
          <p className="card-text">Sustainability Lead. Zuheila works with cacao farmers and partners to keep our supply chain ethical and eco-friendly.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<hr />
<section className="container-fluid py-5" style={{ backgroundColor: '#E4D8B4' }} data-aos="fade-up" data-aos-duration="1000">
  <div className="container">
    <h2 className="text-center mb-4">Why Choose Cacao?</h2>
    <p className="text-center mb-5">What sets us apart from the rest</p>
    <div className="row">
      {/* Card 1 - Quality */}
      <div className="col-md-4 mb-4" data-aos="fade-right" data-aos-duration="1000">
        <div className="card shadow-lg h-100 text-center border-0" style={{ borderRadius: '15px', backgroundColor: '#f9f9f9', transition: 'transform 0.3s ease' }}>
          <div className="card-body" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem', color: '#FFC107' }}>⭐</div>
            <h5 className="card-title mt-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Premium Quality</h5>
            <p className="card-text" style={{ fontSize: '1rem', color: '#555' }}>We use only the highest quality ingredients and traditional techniques.</p>
          </div>
        </div>
      </div>

      {/* Card 2 - Innovation */}
      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-duration="1000">
        <div className="card shadow-lg h-100 text-center border-0" style={{ borderRadius: '15px', backgroundColor: '#f9f9f9', transition: 'transform 0.3s ease' }}>
          <div className="card-body" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem', color: '#FFC107' }}>💡</div>
            <h5 className="card-title mt-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Innovative Flavors</h5>
            <p className="card-text" style={{ fontSize: '1rem', color: '#555' }}>We constantly experiment to bring new and exciting chocolate experiences.</p>
          </div>
        </div>
      </div>

      {/* Card 3 - Customer Care */}
      <div className="col-md-4 mb-4" data-aos="fade-left" data-aos-duration="1000">
        <div className="card shadow-lg h-100 text-center border-0" style={{ borderRadius: '15px', backgroundColor: '#f9f9f9', transition: 'transform 0.3s ease' }}>
          <div className="card-body" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem', color: '#FFC107' }}>🤝</div>
            <h5 className="card-title mt-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Exceptional Service</h5>
            <p className="card-text" style={{ fontSize: '1rem', color: '#555' }}>We prioritize customer satisfaction and personalized care in every order.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<hr />
<Footer />
    </div>
  );
};

export default AboutUs;
