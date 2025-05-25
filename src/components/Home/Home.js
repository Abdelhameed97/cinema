import { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaPlay, FaSearch, FaStar } from 'react-icons/fa';

function Home() {
  const heroContentRef = useRef(null);

  useEffect(() => {
    if (heroContentRef.current) {
      heroContentRef.current.classList.add('animate-in');
    }
  }, []);

  return (
    <div className="bg-dark text-white">
      {/* Hero Section */}
      <section 
        ref={heroContentRef}
        className="hero-content py-5 min-vh-100 d-flex align-items-center bg-dark bg-opacity-75"
        style={{
          background: "linear-gradient(45deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))",
          backgroundSize: "cover"
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-3 fw-bold mb-4">
                Welcome to <span className="text-warning">CimaCode</span>
              </h1>
              <p className="lead mb-4 text-light">
                Your ultimate destination for movies, TV shows, and entertainment
              </p>
              <div className="d-flex gap-3">
                <Button 
                  variant="warning" 
                  size="lg" 
                  className="d-flex align-items-center fw-bold text-dark"
                >
                  <FaPlay className="me-2" /> Explore Now
                </Button>
                <Button 
                  variant="outline-warning" 
                  size="lg" 
                  className="d-flex align-items-center fw-bold"
                >
                  <FaSearch className="me-2" /> Browse Catalog
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-dark">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div className="p-4 rounded h-100 bg-dark bg-opacity-50 border border-warning">
                <div className="mb-3 text-warning">
                  <FaStar size={32} />
                </div>
                <h3 className="text-warning">Curated Collection</h3>
                <p className="text-light">
                  Hand-picked selection of the finest movies and TV shows across all genres.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 rounded h-100 bg-dark bg-opacity-50 border border-warning">
                <div className="mb-3 text-warning">
                  <FaPlay size={32} />
                </div>
                <h3 className="text-warning">Personalized Recommendations</h3>
                <p className="text-light">
                  Discover content tailored to your unique taste and viewing history.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 rounded h-100 bg-dark bg-opacity-50 border border-warning">
                <div className="mb-3 text-warning">
                  <FaSearch size={32} />
                </div>
                <h3 className="text-warning">Advanced Search</h3>
                <p className="text-light">
                  Find exactly what you're looking for with our powerful search tools.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-dark bg-opacity-90 border-top border-warning">
        <Container className="text-center">
          <h2 className="mb-4 text-warning">Ready to start your cinematic journey?</h2>
          <Button 
            variant="warning" 
            size="lg" 
            className="fw-bold text-dark"
          >
            Join CimaCode Today
          </Button>
        </Container>
      </section>

      {/* Animation styles */}
      <style>
        {`
        .hero-content {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .hero-content.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        `}
      </style>
    </div>
  );
}

export default Home;