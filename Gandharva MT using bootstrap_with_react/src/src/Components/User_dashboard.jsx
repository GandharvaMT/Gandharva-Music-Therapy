import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Form, ListGroup, Alert } from 'react-bootstrap';

const User_dashboard = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [userId, setuserId] = useState("");
    const [ImgId, setImgId] = useState("");
    const [AppointmentId, setAppointmentID] = useState("");
    const [Appointments, setAppointments] = useState([]); 
    const [feedback, setFeedback] = useState(""); 
    const [submittedFeedback, setSubmittedFeedback] = useState(""); 
    const [xerror, setxError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(""); 

    const handleLogout = () => {
        authService.logout();
        navigate('/Login');
    };

    const isLogin = async () => {
        try {
            const z = await authService.getCurrentUser();
            setEmail(z.email);
            setName(z.name);
            setuserId(z.$id);

            const t = await service.getdoc(z.$id);
            setImgId(t.ImgId);

            const s = await service.get_appoint_data(z.$id);
            setAppointmentID(s);

        } catch (error) {
            console.log(error);
        }
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        try {
            const response = await service.create_feedback({
                UserId: name,
                Feedback: feedback
            });

            if (response) {
                setSuccessMessage("Feedback submitted successfully!");
                setSubmittedFeedback(feedback);
                setFeedback("");
            }
        } catch (error) {
            setxError("Failed to submit feedback. Please try again.");
            console.log("Error submitting feedback:", error);
        }
    };

    useEffect(() => {
        isLogin();
    }, []);

    useEffect(() => {
        if (AppointmentId) {
            service.get_appointments(AppointmentId)
                .then((res) => {
                    setAppointments(res.Schedule_appointments || []); 
                })
                .catch((err) => console.log(err));
        } else {
            navigate("");
        }
    }, [AppointmentId]);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm p-4">
                        {/* Profile Picture first, then Welcome Name, then Email */}
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

                        {/* Logout Button in the top-right corner */}
                        <div className="d-flex justify-content-end">
                            <Button variant="danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>

                        <hr />

                        {/* Appointments Section */}
                        <h5>Appointments:</h5>
                        <div className="mt-3">
                            {Appointments.length > 0 ? (
                                <ListGroup>
                                    {Appointments.map((appointment, index) => (
                                        <ListGroup.Item key={index} className="bg-white p-2 rounded mt-2 shadow-sm">
                                            {appointment}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <Alert variant="info">No appointments scheduled yet.</Alert>
                            )}
                        </div>
                        <br />

                        {/* Feedback Form */}
                        <Form onSubmit={handleSubmitFeedback}>
                            <Form.Group controlId="feedbackTextarea">
                                <Form.Label>Feedback</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={feedback}
                                    onChange={handleFeedbackChange}
                                    placeholder="Write your feedback here"
                                    rows="4"
                                    required
                                />
                            </Form.Group>
                            <br />
                            <div className="text-center">
                                <Button type="submit" variant="primary">
                                    Submit Feedback
                                </Button>
                            </div>
                        </Form>
                        {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
                        {xerror && <Alert variant="danger" className="mt-3">{xerror}</Alert>}
                        {submittedFeedback && <p className="mt-3">Your submitted feedback: {submittedFeedback}</p>}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default User_dashboard;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';
// import authService from '../appwrite/auth';
// import service from '../appwrite/config';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Button, Card, Form, ListGroup, Alert } from 'react-bootstrap';

// const User_dashboard = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [name, setName] = useState("");
//     const [userId , setuserId] = useState("")
//     const [ImgId , setImgId ] = useState("")
//     const [AppointmentId, setAppointmentID] = useState("");
//     const [Appointments, setAppointments] = useState([]); 
//     const [feedback, setFeedback] = useState(""); // State for feedback
//     const [submittedFeedback, setSubmittedFeedback] = useState(""); // State for displaying submitted feedback
//     const [xerror, setxError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(""); // State for success message

//     const handleLogout = () => {
//         authService.logout();
//         navigate('/Login');
//     };

//     const isLogin = async () => {
//         try {
//             const z = await authService.getCurrentUser();
//             // console.log(z);
            
//             setEmail(z.email);
//             setName(z.name);
//             setuserId(z.$id)

//             const t = await service.getdoc(z.$id)
//             console.log(t);
//             setImgId(t.ImgId)

//             const s = await service.get_appoint_data(z.$id)
//             setAppointmentID(s)

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleFeedbackChange = (e) => {
//         setFeedback(e.target.value);
//     };

//     const handleSubmitFeedback = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await service.create_feedback({
//                 UserId: name,
//                 Feedback: feedback
//             });

//             if (response) {
//                 setSuccessMessage("Feedback submitted successfully!");
//                 setSubmittedFeedback(feedback); // Set the submitted feedback for display
//                 setFeedback(""); // Clear the feedback input
//             }
//         } catch (error) {
//             setxError("Failed to submit feedback. Please try again.");
//             console.log("Error submitting feedback:", error); // Debugging: Log the error
//         }
//     };


//     useEffect(() => {
//         isLogin();
//     }, []);

//     useEffect(() => {
//         if (AppointmentId) { 
//             console.log(AppointmentId);
            
//           service.get_appointments(AppointmentId)
//             .then((res) => {
//               setAppointments(res.Schedule_appointments || []); 
//             })
//             .catch((err) => console.log(err));
//         } else {
//           navigate("");
//         }
//       }, [AppointmentId]);

//     return (
//         <>
//             <h1>Welcome, {name}</h1>
//             <p>Email: {email}</p>
//             <button onClick={handleLogout}>
//                 Logout
//             </button>
//             <br />
//             <br />
//             <img 
//             height={300}
//             width={300}
//             src={ service.getFilePreview(ImgId) } 
//             alt="Loading Image..." />
//             <br />
//             <br />

//             <div className="mt-4"> Appointments:
//                   {Appointments.length > 0 ? (
//                     <ListGroup>
//                       {Appointments.map((appointment, index) => (
//                         <ListGroup.Item key={index} className="bg-white p-2 rounded mt-2 shadow-sm">
//                           {appointment}
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   ) : (
//                     <Alert variant="info">No appointments scheduled yet.</Alert>
//                   )}
//                 </div>

//             <br />   

//             {/* Feedback Form */}
//             <form onSubmit={handleSubmitFeedback}>
//                 <textarea
//                     value={feedback}
//                     onChange={handleFeedbackChange}
//                     placeholder="Write your feedback here"
//                     rows="4"
//                     cols="50"
//                     required
//                 />
//                 <br />
//                 <button type="submit">
//                     Submit Feedback
//                 </button>
//             </form>
//             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//             {xerror && <p style={{ color: 'red' }}>{xerror}</p>}
//             {submittedFeedback && <p>Your submitted feedback: {submittedFeedback}</p>} {/* Display submitted feedback */}
//         </>
//     );
// };

// export default User_dashboard;




// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import '../App.css';
// import authService from '../appwrite/auth';
// import service from '../appwrite/config';
// import { NavLink} from 'react-router-dom'

// const User_dashboard = () => {
//     const navigate = useNavigate()
//     const [email, setemail] = useState("")
//     const [name, setname] = useState("")
//     // const [documents, setDocuments] = useState([]);
//     // const [isLoading, setIsLoading] = useState(false);
//     const [xerror, setxError] = useState(null);
  
//     const handlelogout = () => {
//       authService.logout();
//       navigate('/Login')
//     };
  
//     const islogin = async () => {
//       try {
//         var z = await authService.getCurrentUser();
//         setemail(z.email);
//         setname(z.name);
//       } catch (error) {
//         console.log(error);
//       }
//     }
  
//     useEffect(() => {
//       islogin();
//     }, [])
  
  
//     return (
//       <>
//         <h1>Welcome, {name}</h1>
//         <p> Email : {email}</p>
//         <button
//           onClick={handlelogout}
//         >
//           Logout
//         </button>
//         <br />
//         {/* <img src={service.getFilePreview()} alt="Preview Image"  />  */}
         
//       </>
//     )
// }

// export default User_dashboard