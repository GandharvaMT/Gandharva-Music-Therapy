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

  const { name } = useParams();

  useEffect(() => {
    if (name) { 
      service.get_appointments()
        .then((res) => {
          setdoc(res);
          setAppointments(res.Schedule_appointments || []); 
        })
        .catch((err) => console.log(err));
    } else {
      navigate("");
    }
  }, [name, navigate]);

  const handlelogout = () => {
    authService.logout();
    navigate('/Login')
  };

  const islogin = async () => {
    try {
      const z = await authService.getCurrentUser();
      setemail(z.email);
      set_username(z.name);
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
        const currentDoc = await service.get_appointments();
        const updatedAppointments = [...(currentDoc.Schedule_appointments || []), newAppointment];
        
        await service.updateAppointment({ UserId: name }, { Schedule_appointments: updatedAppointments });
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
    </>
  )
}





// import React, { useEffect, useState } from 'react'


// import { useNavigate } from 'react-router-dom';
// import '../App.css';
// import authService from '../appwrite/auth';
// import service from '../appwrite/config';
// import { useParams } from 'react-router-dom'

// export default function Admin_Page() {

//   const navigate = useNavigate()
//   const [email, setemail] = useState("")
//   const [user_name, set_username] = useState("")
//   const [doc, setdoc] = useState(null);
//   const [Appointments , setAppointments] = useState([])
//   const [showForm, setShowForm] = useState(false);


//   const {name} = useParams();

//   useEffect(() => {
//     if (name) { 
//           service.getdoc(name)
//           .then((res)=> setdoc(res))
          
        

//         // .then((res) => {
//         //    console.log(`getdoc value is : ${res}`);          
//         //     if (res) setdoc(res);
//         //     else navigate("");
//         // });
//     } else navigate("");
// }, [name]);

//   const handlelogout = () => {
//     authService.logout();
//     navigate('/Login')
//   };

//   const appoint = async() =>{
//     setAppointments()
//     service.updateAppointment( {UserId : name} , {Schedule_appointments : Appointments})
//   }

//   const islogin = async () => {
//     try {
//       var z = await authService.getCurrentUser();
//       setemail(z.email);
//       set_username(z.name);
//     } catch (error) {
//       console.log(error);
//     }
//   }



//   useEffect(() => {
//     islogin();
//   }, [])

//   const add = () => {
//     setShowForm(true);
//     console.log(Appointments);
    
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (Appointments) {
//       setAppointments(prev => [...prev, Appointments]);  // Add the new appointment to the array
//       setShowForm(false); // Hide the form after submission
//       // setAppointments(""); // Reset the input field
//     }
//   };
  

//   return (
//     <>
//       <h1>Welcome, {user_name}</h1>
//       <p>Email: {email}</p>
//       <button onClick={handlelogout}>Logout</button>
//       <br />
//       <p>{name}</p>
//       <div className='bg-gray-400 p-4 rounded-2xl'>
//         Appointments
//         <br />
//         <button 
//           className='text-red-600' 
//           onClick={add}
//         >
//           Add Appointment
//         </button>
//         {showForm && (
//           <div className='bg-slate-600 text-white mt-4 p-4 rounded'>
//             <form onSubmit={handleFormSubmit}>
//               <input 
//                 type="datetime-local" 
//                 value={Appointments}
//                 onChange={(e) => setAppointments(e.target.value)}
//                 placeholder='Enter Appointment Date-Time'
//                 className='mr-2 p-1 rounded'
//                 required
//               />
//               <button 
//                 type="submit" 
//                 className='bg-blue-500 text-white p-1 rounded'
//               >
//                 Add Appointment
//               </button>
//             </form>
//           </div>
//         )}
//         <div className='mt-4'>
//           {Appointments.length > 0 ? (
//             <ul>
//               {Appointments.map((appointment, index) => (
//                 <li key={index} className='bg-white p-2 rounded mt-2 shadow'>
//                   {appointment}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No appointments scheduled yet.</p>
//           )}
//         </div>
//       </div>
//     </>
//   )
  
// }

 