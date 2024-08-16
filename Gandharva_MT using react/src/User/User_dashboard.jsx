import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { NavLink} from 'react-router-dom'

const User_dashboard = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    // const [documents, setDocuments] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [xerror, setxError] = useState(null);
  
    const handlelogout = () => {
      authService.logout();
      navigate('/Login')
    };
  
    const islogin = async () => {
      try {
        var z = await authService.getCurrentUser();
        setemail(z.email);
        setname(z.name);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      islogin();
    }, [])
  
  
    return (
      <>
        <h1>Welcome, {name}</h1>
        <p> Email : {email}</p>
        <button
          onClick={handlelogout}
        >
          Logout
        </button>
        <br />
        {/* <img src={service.getFilePreview()} alt="Preview Image"  />  */}
         
      </>
    )
}

export default User_dashboard