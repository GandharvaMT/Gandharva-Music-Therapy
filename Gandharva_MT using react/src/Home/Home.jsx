import React from 'react'
import Login from '../Login/Login'
import Signup from '../signup/Signup'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

  const login = ()=>{
    navigate("/Login");
  }

  const signup = ()=>{
    navigate("/Signup")
  }

  return (
   <>
   <button onClick={login}>Login</button>
   <br />
   <br />
   <button onClick={signup}>Signup</button>
   </>
  )
}

export default Home