import React, { useState } from 'react';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pic, setPic] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    if (isValidLength && hasUpperCase && hasNumber && hasSpecialChar) {
      setPasswordError('');
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
      setPasswordError(
        'Password must be 8 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character.'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Proceed only if the password is valid
    if (!passwordValid) {
      setPasswordError('Please enter a valid password');
      return;
    }

    setIsLoading(true); // Start loading

    try {
      let imgId = null;
      let userId = null;

      // Upload the picture if it's available
      if (pic) {
        const response = await service.uploadFile(pic);
        imgId = response.$id;  // Store image ID after file upload
      }

      // Proceed with registration
      const res = await authService.createAccount({ email, password, name });
      userId = res.$id;  // Store user ID after registration
      
      // If both userId and imgId are available
      if (userId && imgId) {
        await service.createdoc({ UserId: userId, name, email, ImgId: imgId });
        await service.create_appointments({ UserId: userId });
        await service.create_feedback({ UserId: userId, Feedback: null });
        await service.create_music({ UserId: userId, Link: null });
      } else {
        console.error('User ID or Image ID is null');
      }

      // Navigate to login page on successful registration
      navigate("/Login");
    } catch (error) {
      console.log('Error during registration:', error);
      setErrorMessage('Signup failed. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      {/* Back Icon */}
      <Button
        variant="outline-dark"
        onClick={() => navigate("/")}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10, // Make sure it's above other elements
        }}
      >
        <ArrowLeft size={20} className="me-2" />
        Back to Home
      </Button>

      <div
        style={{
          minHeight: '100vh',
          width: '100vw', // Ensures full width without overflow
          backgroundImage: `url('https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-2458.jpg?t=st=1727503513~exp=1727507113~hmac=269930a5a55ed98d6bf2e99eea9d6d91405296174b5488cf62413a0fb056df88&w=996')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0',
          padding: '0',
          overflow: 'hidden', // Prevents horizontal scrollbar
        }}
      >
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{
            minHeight: '100vh',
            maxWidth: '100%', // Ensures container does not exceed viewport width
            padding: '0', // Removes extra padding
          }}
        >
          <Row className="justify-content-center w-100">
            <Col xs={12} md={6} lg={4}>
              <Card
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Card.Body className="d-flex flex-column">
                  <h2 className="text-center mb-4">Sign Up</h2>
                  {errorMessage && (
                    <Alert variant="danger" className="text-center">
                      {errorMessage}
                    </Alert>
                  )}
                  {isLoading && (
                    <div className="text-center mb-4">
                      <Spinner animation="border" variant="primary" />
                      <p>Registering, please wait...</p>
                    </div>
                  )}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading} // Disable input while loading
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading} // Disable input while loading
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          validatePassword(e.target.value); // Check password
                        }}
                        required
                        isInvalid={passwordError !== '' && passwordValid === false}
                        isValid={passwordValid}
                        disabled={isLoading} // Disable input while loading
                      />
                      {passwordError && (
                        <Form.Text className="text-danger">{passwordError}</Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Profile Picture</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setPic(e.target.files[0])}
                        required
                        disabled={isLoading} // Disable input while loading
                      />
                    </Form.Group>

                    <Button
                      variant="dark"
                      type="submit"
                      className="w-100"
                      disabled={isLoading} // Disable button while loading
                    >
                      {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                    <br />
                    <br />
                    <p className="text-center mb-4" style={{ textAlign: 'center' }}>
                      Already registered?{' '}
                      <span
                        style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => navigate('/login')}
                      >
                        Login
                      </span>
                    </p>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Signup;







