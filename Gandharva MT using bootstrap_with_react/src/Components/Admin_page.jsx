import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form, ListGroup, Alert } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons'; // Import the back icon
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Admin_Page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [user_name, setUserName] = useState("");
  const [doc, setDoc] = useState(null);
  const [Appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState("");
  const [AppointmentId, setAppointmentID] = useState("");
  const [user_feedback, setUserFeedback] = useState("");
  const [userId, setUserId] = useState("");
  const [ImgId, setImgId] = useState("");

  const { name } = useParams();

  const fun = async () => {
    try {
      console.log(userId);
      const res = await service.get_appoint_data({ UserId : userId });
      const f = await service.get_feedback_data({UserId : userId});
      setAppointmentID(res);
      setUserFeedback(String(f));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fun();
    }
  }, [userId , name]);

  useEffect(() => {
    if (AppointmentId) {
      service.get_appointments(AppointmentId)
        .then((res) => {
          setDoc(res);
          setAppointments(res.Schedule_appointments || []);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("");
    }
  }, [AppointmentId]);

  const handleLogout = () => {
    authService.logout();
    navigate('/Login');
  };

  const isLogin = async () => {
    try {
      const z = await authService.getCurrentUser();
      console.log(z);
      
      setEmail(z.email);
      setUserName(z.name);
      // setUserId(z.$id);

      const t = await service.getdoc(z.$id);
      setImgId(t.ImgId);

      const y = await service.get_patient_doc({name : name})
      setUserId(y)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLogin();
  }, []);

  const add = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newAppointment) {
      try {
        const currentDoc = await service.get_appointments(AppointmentId);
        const updatedAppointments = [...(currentDoc.Schedule_appointments || []), newAppointment];
        
        await service.updateAppointment({ Schedule_appointments: updatedAppointments, AppointmentID: AppointmentId });
        setAppointments(updatedAppointments);
        setShowForm(false);
        setNewAppointment("");
      } catch (error) {
        console.error("Failed to save the appointment:", error);
      }
    }
  };

  // Function to format appointment date
  const formatDate = (appointment) => {
    const date = new Date(appointment);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) + ' '+ ' ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Back Button */}
                <Button variant="outline-dark" onClick={() => navigate('/Dashboard')}>
                  <ArrowLeft size={20} className="me-2" />
                  Back to Dashboard
                </Button>
                <Button variant="danger" onClick={handleLogout}>
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
                <h2>Welcome, {user_name}</h2>
                {/* Email */}
                <p className="lead">{email}</p>
              </div>
              <Card.Title>Manage {name}'s Appointments</Card.Title>
              <div className="mt-4">
                <Button variant="dark" onClick={add} className="mb-3">
                  Add Appointment
                </Button>
                {showForm && (
                  <Card className="bg-light p-3 mb-4">
                    <Card.Body>
                      <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formAppointment">
                          <Form.Label>Enter Appointment Date-Time</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            value={newAppointment}
                            onChange={(e) => setNewAppointment(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Button variant="success" type="submit" className="mt-3">
                          Add Appointment
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                )}
                <div className="mt-4">
                  Added Appointments:
                  {Appointments.length > 0 ? (
                    <ListGroup>
                      {Appointments.map((appointment, index) => (
                        <ListGroup.Item key={index} className="bg-white p-2 rounded mt-2 shadow-sm">
                          {formatDate(appointment)}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <Alert variant="info">No appointments scheduled yet.</Alert>
                  )}
                </div>
              </div>
              <Card.Title className="mt-4">{name}'s Feedback</Card.Title>
              <Card.Text className="bg-light p-3 rounded">
                {user_feedback !== "undefined" ? user_feedback : "No feedback given."}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}





