import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsCheckCircleFill, BsShieldLockFill, BsEyeFill, BsDiagram3, BsGraphDown, BsCheck2Circle, BsCapsule } from 'react-icons/bs';
import '../App.css'; // Include the CSS for custom styling

const TherapyBenefits = () => {
  return (
    <section className="therapy-benefits py-5" id="benefits">
      <h2 className="text-center mb-5">Key Features of Music Therapy</h2>
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <div className="feature-box m-3 rounded shadow">
              <BsCheckCircleFill className="text-dark display-4" />
              <h4 className="text-center mt-3">No Side Effects</h4>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="feature-box m-3 rounded shadow">
              <BsShieldLockFill className="text-dark display-4" />
              <h4 className="text-center mt-3">Perfectly Safe</h4>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="feature-box m-3 rounded shadow">
              <BsEyeFill className="text-dark display-4" />
              <h4 className="text-center mt-3">Improves Your Attention</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-3">
            <div className="feature-box m-3 rounded shadow">
              <BsDiagram3 className="text-dark display-4" />
              <h4 className="text-center mt-3">Works on All Levels</h4>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="feature-box m-3 rounded shadow">
              <BsGraphDown className="text-dark display-4" />
              <h4 className="text-center mt-3">Reduces Stress</h4>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="feature-box m-3 rounded shadow">
              <BsCheck2Circle className="text-dark display-4" />
              <h4 className="text-center mt-3">No Pre-requisite</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={8} className="mx-auto">
            <div className="feature-box m-3 rounded shadow">
              <BsCapsule className="text-dark display-4" />
              <h4 className="text-center mt-3">Compatible with Medication</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TherapyBenefits;
