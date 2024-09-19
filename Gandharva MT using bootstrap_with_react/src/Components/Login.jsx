import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    try {
      var y = await authService.login({ email, password });
      console.log(y);

      if (Name === 'Sonali' && email === 'sonaliargal9@gmail.com') {
        navigate('/Dashboard');
      } else {
        navigate('/User_Dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="d-flex  align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
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

                <Button variant="dark" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

// import React, { useState } from 'react';
// import authService from '../appwrite/auth';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
// import Dashboard from './Dashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [Name, setName] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login();
//   };

//   const login = async () => {
//     try {
//       var y = await authService.login({ email, password });
//       console.log(y);

//       if (Name === 'Sonali' && email === 'sonaliargal9@gmail.com') {
//         navigate('/Dashboard');
//       } else {
//         navigate('/User_Dashboard');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <Row>
//         <Col>
//           <Card style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
//             <Card.Body>
//               <h2 className="text-center mb-4">Login</h2>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="formName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter your name"
//                     value={Name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Button variant="dark" type="submit" className="w-100">
//                   Login
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;



// import React , {useState} from 'react'
// import authService from '../appwrite/auth';
// import { useNavigate } from 'react-router-dom';
// import Dashboard from './Dashboard';

// const Login = () => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [Name , setName] = useState('')
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       login();
//   };

//   const login = async()=>{
//     try {
//       var y = await authService.login({email,password});
//       console.log(y);
      
//      if(Name=== "Sonali" && email=== "sonaliargal9@gmail.com") {
//       navigate('/Dashboard')
//      }else{
//       navigate('/User_Dashboard')
//      }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//   <>
//     <div className="login-container">
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <h2>Login</h2>
//                 <div className="form-group">
//                     <label htmlFor="email">Name:</label>
//                     <input
//                         type="text"
//                         placeholder='Enter your name'      
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         placeholder='Enter your Email' 
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         placeholder='Enter Password' 
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="submit-button">Login</button>
//             </form>
//         </div>
//   </>
//   )
// }

// export default Login