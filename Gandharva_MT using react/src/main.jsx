import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Signup from './signup/Signup.jsx'
import Login from './Login/Login.jsx'
import Home from './Home/Home.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Admin_Page from './admin_page/Admin_Page.jsx'
import User_dashboard from './User/User_dashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path=""  >
           <Route path="" element={<Home/>} />
           {/* <Route path="/Register" element={<Register/>} /> */}
           <Route path="/Signup" element={<Signup/>} />
           <Route path="/Login" element={<Login/>} />
           <Route path="/Dashboard" element={<Dashboard/>} />
           <Route path="/User_Dashboard" element={<User_dashboard/>} />
           <Route path="/admin_page/:name" element={<Admin_Page/>} />        
      </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
