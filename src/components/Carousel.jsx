import React from 'react'

const Carousel = () => {
  return (
    <div>
    <section className="row">
        <div className="col-md-12">
            {/* Carousel */}
            <div className="carousel slide" data-bs-ride="carousel" id="mycarousel">
            {/* Carousel inner */}
            <div className="carousel-inner">
                {/* Image 1 */}
                <div className="carousel-item active">
                <img src="/images/chocolate26.jfif" alt="Slide 1" className="d-block w-100 carousel" />
                </div>
            </div>
            {/* Controls */}
            <a
                href="#mycarousel"
                className="carousel-control-prev"
                data-bs-slide="prev"
            >
            </a>
            <a
                href="#mycarousel"
                className="carousel-control-next"
                data-bs-slide="next"
            >
    
            </a>
            </div>
        </div>
        </section>
    </div>
  )
}

export default Carousel