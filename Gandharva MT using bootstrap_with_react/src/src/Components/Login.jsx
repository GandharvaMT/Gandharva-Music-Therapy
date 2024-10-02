import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowLeft } from 'react-bootstrap-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [loading, setLoading] = useState(false); // To manage spinner state
  const [errorMessage, setErrorMessage] = useState(''); // To manage error message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start spinner when login starts
    setErrorMessage(''); // Reset any previous error messages
    login();
  };

  const login = async () => {
    try {
      const y = await authService.login({ email, password });
      console.log(y);

      if (Name === 'Sonali' && email === 'sonaliargal9@gmail.com') {
        navigate('/Dashboard');
      } else {
        navigate('/User_Dashboard');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Login failed. Please check your credentials.'); 
    } finally {
      setLoading(false); // Stop spinner when login attempt is done
    }
  };

  return (
    <>
      {/* Back Button */}
      <Button
        variant="outline-dark"
        onClick={() => navigate("/")}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10 
        }}
      >
        <ArrowLeft size={20} className="me-2" />
        Back to Home
      </Button>

      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          backgroundImage : `url('https://img.freepik.com/free-vector/smooth-yellow-gradient-wallpaper-with-abstract-blur-effect-vector_1017-49159.jpg?t=st=1727872547~exp=1727876147~hmac=185629214237bd97495fee8474040e0da23a2b6fe706da441d59a42e1417e800&w=996')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0',
          padding: '0',
          overflow: 'hidden', 
        }}
      >
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{
            minHeight: '100vh',
            maxWidth: '100%',
            padding: '0',
          }}
        >
          <Row style={{ margin: '0' }}>
            <Col>
              <Card
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white',
                }}
              >
                <Card.Body>
                  <h2 className="text-center mb-4">Login</h2>
                  
                  {/* Show error message if login fails */}
                  {errorMessage && (
                    <Alert variant="danger" className="text-center">
                      {errorMessage}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        required
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
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{' '}
                          Login, please wait...
                        </>
                      ) : (
                        'Login'
                      )}
                    </Button>

                    <br />
                    <br />
                    <p>
                      Don't have an account?{' '}
                      <span
                        style={{
                          color: 'blue',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                        onClick={() => navigate('/signup')}
                      >
                        Signup
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
};

export default Login;





