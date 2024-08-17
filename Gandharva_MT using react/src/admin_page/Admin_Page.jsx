import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { useParams } from 'react-router-dom'

export default function Admin_Page() {

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [user_name, set_username] = useState("");
  const [doc, setdoc] = useState(null);
  const [Appointments, setAppointments] = useState([]); 
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState(""); 
  const [AppointmentId , setAppointmentID] = useState("")
  const [user_feedback , set_userfeedback] = useState("")

  const { name } = useParams();

  const fun = async()=>{
    try {
      const res = await service.get_appoint_data({ name : name})
      const f = await service.get_feedback_data({name : name })
      setAppointmentID(res)
      set_userfeedback(String(f))
    } catch (error) {
      console.log();     
    }
  }

  useEffect(() => {
    if (name) { 
      console.log(name);
      
      fun();
    }
  }, [name]);

  useEffect(() => {
    if (AppointmentId) { 
      service.get_appointments(AppointmentId)
        .then((res) => {
          setdoc(res);
          setAppointments(res.Schedule_appointments || []); 
        })
        .catch((err) => console.log(err));
    } else {
      navigate("");
    }
  }, [AppointmentId ]);

  const handlelogout = () => {
    authService.logout();
    navigate('/Login')
  };

  const islogin = async () => {
    try {
      await authService.getCurrentUser()
      .then((z)=>{setemail(z.email)
        set_username(z.name)})
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    islogin();
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
        
        await service.updateAppointment( { Schedule_appointments: updatedAppointments , AppointmentID : AppointmentId });
        setAppointments(updatedAppointments);  
        setShowForm(false); 
        setNewAppointment(""); 
      } catch (error) {
        console.error("Failed to save the appointment:", error);
      }
    }
  };

  return (
    <>
      <h1>Welcome, {user_name}</h1>
      <p>Email: {email}</p>
      <button onClick={handlelogout}>Logout</button>
      <br />
      <p>{name}</p>
      <div className='bg-gray-400 p-4 rounded-2xl'>
        Appointments
        <br />
        <button 
          className='text-red-600' 
          onClick={add}
        >
          Add Appointment
        </button>
        {showForm && (
          <div className='bg-slate-600 mt-4 p-4 rounded'>
            <form onSubmit={handleFormSubmit}>
              <input 
                type="datetime-local" 
                value={newAppointment} 
                onChange={(e) => setNewAppointment(e.target.value)} 
                placeholder='Enter Appointment Date-Time'
                className='mr-2 p-1 rounded'
                required
              />
              <button 
                type="submit" 
                className='bg-blue-500 text-white p-1 rounded'
              >
                Add Appointment
              </button>
            </form>
          </div>
        )}
        <div className='mt-4'>
          {Appointments.length > 0 ? (
            <ul>
              {Appointments.map((appointment, index) => (
                <li key={index} className='bg-white p-2 rounded mt-2 shadow'>
                  {appointment}
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments scheduled yet.</p>
          )}
        </div>
      </div>
      <p>Feedback of {name} : {user_feedback}</p>
    </>
  )
}


 