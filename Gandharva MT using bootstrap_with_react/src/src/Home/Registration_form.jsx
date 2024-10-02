import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [hearAboutUs, setHearAboutUs] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)
    console.log('Form data:', {
      fullName,
      dateOfBirth,
      gender,
      phoneNo,
      email,
      reason,
      hearAboutUs,
    });
  };

  return (
    <section className="mt-5">
      <Container>
        <Card className="shadow-sm p-4">
          <h2 className="text-center text-lg font-weight-bold mb-4">Registration Form</h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="text-muted">Full Name</Form.Label>
              </Col>
              <Col md={8}>
                <FormControl type="text" placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="text-muted">Date of Birth</Form.Label>
              </Col>
              <Col md={8}>
                <FormControl type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="text-muted">Gender</Form.Label>
              </Col>
              <Col md={8}>
                <div className="d-flex">
                  <FormCheck
                    inline
                    type="radio"
                    label="Male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    required
                  />
                  <FormCheck
                    inline
                    type="radio"
                    label="Female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    required
                  />
                  <FormCheck
                    inline
                    type="radio"
                    label="Other"
                    name="gender"
                    value="other"
                    checked={gender === 'other'}
                    onChange={() => setGender('other')}
                    required
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="text-muted">Phone No.</Form.Label>
              </Col>
              <Col md={8}>
                <FormControl type="tel" placeholder="Enter Phone Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="text-muted">Email Address</Form.Label>
              </Col>
              <Col md={8}>
                <FormControl type="email" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="text-muted">Primary Reason for Registration</Form.Label>
              </Col>
              <Col md={8}>
                <FormControl as="textarea" rows={3} placeholder="Explain your reason for registering" value={reason} onChange={(e) => setReason(e.target.value)} required />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="text-muted">How Did You Hear About Us?</Form.Label>
              </Col>
              <Col md={8}>
                <FormControl as="textarea" rows={3} placeholder="Please tell Us from where you hear about Us" value={hearAboutUs} onChange={(e) => setHearAboutUs(e.target.value)} required />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={4}>
                <Button type="submit" className="btn btn-dark btn-lg" style={{ width: 'auto' }}>Register</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </section>
  );
};

export default RegistrationForm;