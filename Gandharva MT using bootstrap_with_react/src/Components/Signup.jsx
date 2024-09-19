import React, { useState } from 'react';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pic, setPic] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imgId = null;
      let userId = null;

      // Upload the picture first if it's available
      if (pic) {
        const response = await service.uploadFile(pic);
        imgId = response.$id;  // Store image ID after file upload
      }

      // Now proceed with registration
      const res = await authService.createAccount({ email, password, name });
      userId = res.$id;  // Store user ID after registration
      // console.log(userId);
      


      // Ensure that both userId and imgId are passed explicitly
      if (userId!== null && imgId) {
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
    }
  };

  return (
    <Container className="d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
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
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
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

                <Form.Group className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setPic(e.target.files[0])}
                    required
                  />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;






// import React, { useState } from 'react';
// import authService from '../appwrite/auth';
// import service from '../appwrite/config';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Signup() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [pic, setPic] = useState(null);
//   const [imgId, setImgId] = useState(null);
//   const [userid, setuserid] = useState();

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     register();
//   };

//   const register = async () => {
//     try {
//       const res = authService.createAccount({ email: email, password: password, name: name });
//       setuserid(res.$id);
//       await service.createdoc({ UserId: name, name: name, email: email, ImgId: imgId });
//       await service.create_appointments({ UserId: name });
//       await service.create_feedback({ UserId: name , Feedback : null});
//       await service.create_music({ UserId: name , Link : null});
//       navigate("/Login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const Uploadpic = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await service.uploadFile(pic);
//       setImgId(response.$id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container className="d-flex    align-items-center" style={{ minHeight: '100vh' }}>
//       <Row className="w-100   ">
//         <Col xs={12} md={6} lg={4}>
//           <Card
//             style={{
//               padding: '20px',
//               borderRadius: '10px',
//               boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <Card.Body className="d-flex flex-column   ">
//               <h2 className="text-center mb-4">Sign Up</h2>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="formName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter your name"
//                     value={name}
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

//                 <Form.Group className="mb-3">
//                   <Form.Label>Profile Picture</Form.Label>
//                   <Form.Control
//                     type="file"
//                     onChange={(e) => setPic(e.target.files[0])}
//                     required
//                   />
//                   {/* <Button onClick={Uploadpic} variant="dark" className="mt-2">
//                     Upload
//                   </Button> */}
//                 </Form.Group>

//                 <Button variant="dark" type="submit"  onClick={Uploadpic} className="w-100">
//                   Register
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Signup;



// import React, {useState} from 'react'
// import authService from '../appwrite/auth';
// import service from '../appwrite/config';
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [pic, setPic] = useState(null)
//     const [imgId, setImgId] = useState(null)
//     const [userid , setuserid] = useState()

//     const navigate = useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         register();
//     };

//     const register = async()=>{
//       try {
//         console.log("I am inside register");
        
//         const res =  authService.createAccount({email : email , password : password , name : name})
//         setuserid(res.$id)
//         console.log(`user id is : ${res.$id}`);
        
//         await service.createdoc( { UserId :  name , name : name , email : email ,  ImgId : imgId}) 
//         await service.create_appointments({ UserId : name })
//         navigate("/Login")
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     const Uploadpic = async(e)=>{
//         e.preventDefault()
//         try {
//             const response = await service.uploadFile(pic)
//             setImgId(response.$id);
//         } catch (error) {
//             console.log(error);           
//         }
//     }

//     return (
//         <div className="registration-container">
//             <form className="registration-form" onSubmit={handleSubmit} >
//                 <h2>SignUp</h2>
//                 <div className="form-group">
//                     <label htmlFor="name">Name:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
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
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <input 
//                     type='file' 
//                     name='file' 
//                     required 
//                     onChange={(e) => { 
//                         setPic(e.target.files[0]);
//                         // console.log(e.target.files[0]); 
//                     }} 
//                 />
//                 <button onClick={Uploadpic}>Upload</button>
//                 <br />
//                 <button type="submit" className="submit-button" >Register</button>
//             </form>
//         </div>
//     );
// }

// export default Signup