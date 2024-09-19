import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import aditImage from '../imgs/Adit_sir.jpg'; // Ensure this path is correct

const AboutTherapist = () => {
  return (
    <section style={{ backgroundColor: '#ede6e0c2' }} id="about-Therapist">
      <Container className="container-about">
        <div  style={{ backgroundColor: '#ffffff' }}></div>
        <Row className="featurette d-flex justify-content-center align-items-center my-5 mx-5">
          <Col md={7} className="order-md-2">
            <h2 className="featurette-heading">
              About the Therapist, <span className="text-muted">Adit Patankar.</span>
            </h2>
            <p className="lead">
              Adit Patankar is a government-certified music therapist with diverse expertise in solar engineering, IT
              engineering, and Japanese language. Seven years ago, Adit realised that true well-being stems from internal
              transformation. Being committed to this, he began his personal journey toward self-improvement. He explored
              various practices, including martial arts and Zen meditation, before discovering that the roots of profound
              inner peace lie in Bharat. This revelation guided him to the enriching path of yoga, where he continues to
              deepen his understanding and practice. On this journey, Adit discovered that music profoundly impacts human
              health and well-being. He enrolled in a music therapy class, where he experienced music as more than just
              entertainment. Experimenting with music therapy on his family and friends, he observed gradual improvements
              in their peace and happiness, affirming the effectiveness of this technique. Now, Adit aims to support those
              seeking physical and mental well-being through music therapy.
            </p>
          </Col>
          <Col md={4}>
            <Image
              className="img-fluid bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto rounded-start"
              width={400}
              height={400}
              src={aditImage}
              alt="Adit Patankar"
              rounded
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutTherapist;
