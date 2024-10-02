import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import '../App.css'; // Include the CSS for custom styling

const TherapyStructure = () => {
  return (
    <section className="therapy-structure" id="about-structure">
      <Container>
        <h2 className="text-center pb-3">Therapy Structure</h2>
        <ListGroup variant="flush" className="border p-3 rounded">
          <ListGroup.Item>You will go through 3 sessions with the therapist</ListGroup.Item>
          <ListGroup.Item>First session will be of 10-15 minutes. It will be introductory.</ListGroup.Item>
          <ListGroup.Item>
            Second session will be around 60 minutes. (It may vary from 30-90 minutes). It will be a question-answer session.
            The therapist will get to know the client in more detail.
          </ListGroup.Item>
          <ListGroup.Item>
            All the sessions can be done on a phone call/video call/in person, as per the convenience and comfort of the client.
            If possible, an in-person session is recommended.
          </ListGroup.Item>
          <ListGroup.Item>For more details, contact us.</ListGroup.Item>
        </ListGroup>
      </Container>
    </section>
  );
};

export default TherapyStructure;
