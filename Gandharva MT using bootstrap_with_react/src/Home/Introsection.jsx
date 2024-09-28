import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import bgImage from '../imgs/bg-image-01.jpg';
import landingPageImage from '../imgs/landing_page_image.png';
import './Introsection.css'

const IntroSection = () => {
  return (
    <section>
      <div className="intro" style={{ width: '100%', height: '100%' }}>
        <div className="img-fluid rounded-start" style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1, // Ensure the background is behind the content
            }}
          />
          <div className="text-center bg-body-tertiary">
            <Container style={{ paddingBottom: '40px' }}>
              {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <NavLink to="/login">
                  <Button
                    variant="dark"
                    className="mx-2 custom-button"
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button
                    variant="dark"
                    className="mx-2 custom-button"
                  >
                    Signup
                  </Button>
                </NavLink>
              </div> */}
              <Image
                src={landingPageImage}
                className="img-fluid rounded-start mt-4"
                alt="Error Loading image"
              />
              <Row className="justify-content-center">
                <Col lg={8}>
                  <h1 className="text-body-emphasis">Welcome to Gandharva Music Therapy!</h1>
                  <h2>"Where music meets wellness"</h2>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
