import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import authService from '../appwrite/auth';
import service from '../appwrite/config';

const User_dashboard = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [feedback, setFeedback] = useState(""); // State for feedback
    const [submittedFeedback, setSubmittedFeedback] = useState(""); // State for displaying submitted feedback
    const [xerror, setxError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(""); // State for success message

    const handleLogout = () => {
        authService.logout();
        navigate('/Login');
    };

    const isLogin = async () => {
        try {
            const z = await authService.getCurrentUser();
            setEmail(z.email);
            setName(z.name);
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
                setSubmittedFeedback(feedback); // Set the submitted feedback for display
                setFeedback(""); // Clear the feedback input
            }
        } catch (error) {
            setxError("Failed to submit feedback. Please try again.");
            console.log("Error submitting feedback:", error); // Debugging: Log the error
        }
    };

    useEffect(() => {
        isLogin();
    }, []);

    return (
        <>
            <h1>Welcome, {name}</h1>
            <p>Email: {email}</p>
            <button onClick={handleLogout}>
                Logout
            </button>
            <br />
            {/* Feedback Form */}
            <form onSubmit={handleSubmitFeedback}>
                <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Write your feedback here"
                    rows="4"
                    cols="50"
                    required
                />
                <br />
                <button type="submit">
                    Submit Feedback
                </button>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {xerror && <p style={{ color: 'red' }}>{xerror}</p>}
            {submittedFeedback && <p>Your submitted feedback: {submittedFeedback}</p>} {/* Display submitted feedback */}
        </>
    );
};

export default User_dashboard;




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