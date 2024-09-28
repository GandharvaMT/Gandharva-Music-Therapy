import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Login';

function Header() {

  return (
    <>
      <Navbar
        bg="dark" expand="lg" sticky="top">
          <Navbar.Brand href="#" className="text-white px-4">Gandharva Music Therapy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='text-white'>
            <Nav className="ms-auto text-white">
              {/* ms-auto aligns items to the right */}
              <Nav.Link href="#" className="text-white px-4">Home</Nav.Link>
              <NavDropdown title="About" className="text-white px-4" id="basic-nav-dropdown">
                <NavDropdown.Item href="#about-Therapist">About Therapist</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#about-Therapy">About Therapy</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#about-structure">Therapy Structure</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#benefits" className="text-white px-4">Benefits</Nav.Link>
              <Nav.Link href="#register" className="text-white px-4">Register</Nav.Link>
              <Nav.Link href="#foot" className="text-white px-4">Contact Us</Nav.Link>
              <Nav.Link href="/login" className="text-white px-4">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header