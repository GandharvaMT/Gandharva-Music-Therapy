import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import Dashboard from './Components/Dashboard.jsx'
import User_dashboard from './Components/User_dashboard.jsx'
import Admin_Page from './Components/Admin_page.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path=""  >
           <Route path="" element={<App/>} />
           <Route path="/signup" element={<Signup/>} />
           <Route path="/login" element={<Login/>} />
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
