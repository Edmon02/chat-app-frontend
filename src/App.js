import { useContext, useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Check from './page/check/Check'
import Contact from './page/contact/Contact'
import Create from './page/create/Create'
import Home from './page/home/Home'
import Login from './page/login/Login'
import {Navigate} from "react-router-dom";

function App() {

  var user = JSON.parse(localStorage.getItem("user")) || null

  const ProtectedRoute = ({children}) => {
    if(!user) {
      return  <Navigate to="/login"/>
    }
    return children;
  }
  const LoginRoute = ({children}) => {
    if(user) {
      return <Navigate to="/"/>
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/' element={
          <Navigate to={user ?"/"+user.user_id : "login"}/>
        }/>
        <Route path='/'>
          <Route path={user ?user.user_id : ":id"} element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="contact" element={
            <ProtectedRoute>
              <Contact/>
            </ProtectedRoute>
          }/>
          <Route path='login' element={
            <LoginRoute>
              <Login/>
            </LoginRoute>
          }/>
          <Route path='check' element={
            <LoginRoute>
              <Check/>
            </LoginRoute>
          }/>
          <Route path='create' element={
            <LoginRoute>
              <Create/>
            </LoginRoute>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App