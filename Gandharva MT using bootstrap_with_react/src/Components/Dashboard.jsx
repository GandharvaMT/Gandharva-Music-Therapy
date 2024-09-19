import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { Container, Row, Col, Button, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons'; // Import the icon
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [xerror, setxError] = useState(null);
  const [userId, setuserId] = useState("");
  const [ImgId, setImgId] = useState("");

  const handlelogout = () => {
    authService.logout();
    navigate('/Login');
  };

  const islogin = async () => {
    try {
      var z = await authService.getCurrentUser();
      setemail(z.email);
      setname(z.name);
      setuserId(z.$id);

      const t = await service.getdoc(z.$id);
      setImgId(t.ImgId);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    islogin();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setxError(null);

      try {
        const response = await service.getalldocs();
        setDocuments(response.documents);
      } catch (error) {
        console.error(error);
        setxError('An error occurred while fetching documents.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow">
            <Card.Body>
              <div className="d-flex justify-content-between">
                {/* Back Icon */}
                <Button variant="outline-dark" onClick={() => navigate("/")}>
                  <ArrowLeft size={20} className="me-2" />
                  Back to Home
                </Button>
                {/* Logout Button */}
                <Button variant="danger" onClick={handlelogout}>
                  Logout
                </Button>
              </div>

              <div className="text-center">
                {/* Profile Picture */}
                <img
                  src={service.getFilePreview(ImgId)}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                {/* Welcome Name */}
                <h2>Welcome, {name}</h2>
                {/* Email */}
                <p className="lead">{email}</p>
              </div>

              <div className="document-list">
                {isLoading ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading documents...</p>
                  </div>
                ) : xerror ? (
                  <Alert variant="danger" className="text-center">
                    {xerror}
                  </Alert>
                ) : (
                  <ListGroup as="ul">
                    {documents.map((document) => (
                      <ListGroup.Item 
                        as="li" 
                        key={document.$id} 
                        className="list-item"
                      >
                        <NavLink
                          to={`/admin_page/${document.name}`}
                          className="text-decoration-none list-link"
                        >
                          {document.name} ({document.email})
                        </NavLink>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;




// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import '../App.css';
// import authService from '../appwrite/auth';
// import service from '../appwrite/config';
// import { NavLink} from 'react-router-dom'

// function Dashboard() {

//   const navigate = useNavigate()
//   const [email, setemail] = useState("")
//   const [name, setname] = useState("")
//   const [documents, setDocuments] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [xerror, setxError] = useState(null);

//   const handlelogout = () => {
//     authService.logout();
//     navigate('/Login')
//   };

//   const islogin = async () => {
//     try {
//       var z = await authService.getCurrentUser();
//       setemail(z.email);
//       setname(z.name);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     islogin();
//   }, [])

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       setIsLoading(true);
//       setxError(null);

//       try {
//         const response = await service.getalldocs();
//         console.log(response.documents);

//         setDocuments(response.documents);
//       } catch (error) {
//         console.error(error);
//         setxError('An error occurred while fetching documents.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDocuments();
//   }, []);


//   return (
//     <>
//       <h1>Welcome, {name}</h1>
//       <p> Email : {email}</p>
//       <button
//         onClick={handlelogout}
//       >
//         Logout
//       </button>
//       <br />
//       {/* <img src={service.getFilePreview()} alt="Preview Image"  />  */}
//       <div className="border-black bg-red-300 container mx-auto p-4">
//         {isLoading ? (
//           <div className="text-center">
//             <p>Loading documents...</p>
//           </div>
//         ) : xerror ? (
//           <div className="text-center text-red-500">
//             <p>{xerror}</p>
//           </div>
//         ) : ( 
//           <ul className='list-disc space-y-2 ml-2'>
//             {documents.map((document) => (
//               <li key={document.$id}>
                
//                 <NavLink
//                  to={`/admin_page/${document.name}`}
                 
//                  className={({isActive}) =>
//                   `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                  }
//                  >
//                 {document.name} ({document.email})
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//           // Navlink lgana hai yhape
//         )
        
//         }
//       </div>
//     </>
//   )
// }

// export default Dashboard