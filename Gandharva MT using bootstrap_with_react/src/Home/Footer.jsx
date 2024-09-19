import React from 'react';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  return (
    <section id="foot" className="bg-dark text-white py-3 my-4">
      <Container className="text-center">
        <p className="mb-0">Adit Patankar | 9321539748 | shotbynoob09@gmail.com</p>
        <hr className="my-2" style={{ border: '1px solid #ccc' }} />
        <p>&copy; 2024 Gandharva Music Therapy. All rights reserved.</p>
      </Container>
    </section>
  );
};

export default Footer;