import { useContext, useState } from 'react';
import axios from "axios";
import React from './create.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextProvider} from "../../context/AuthContext";

function Create() {
  const { state } = useLocation();

  const [credentials, setCredentials] = useState({
    firstname:undefined,
    lastname:undefined,
    phonenumber:undefined
  });
  
  const navigate = useNavigate()

  const { loading, error, dispatch} = useContext(AuthContext); 
  
  const handleChange = (e) => {
    setCredentials((prev)=>({...prev, [e.target.id]:e.target.value}))
  }
  
  const handlClick =  async(e) => {
    credentials.email = state.email;
    credentials.password = state.password
    e.preventDefault()
    // dispatch({type: "REGISTER_START"})
    try{
      const res = await axios.post('/auth/register', credentials)
      // dispatch({type:"REGISTER_SUCCESS", payload: res.data.details});
      localStorage.setItem("user", JSON.stringify(
        {user_id:res.data.user._id,
          firstname:res.data.user.firstname,
          lastname:res.data.user.lastname,
          email:res.data.user.email,
          phonenumber:res.data.user.phonenumber}
      ));
      navigate(`/${res.data.user._id}`)
    }catch(err) {
      console.log(err)
    }
  } 

  return (
    <div className="table">
      <div className='loginChat'>
        <div className="lText">
          <p className="title">Information about yourself</p>
            <p className="info">Enter your name and add a profile picture.</p>
        </div>
        <form action='action'>
          <div className="dropdown">
            <div className="input-group">
              <input 
                required
                className='formControl' 
                type="text" 
                id='firstname' 
                autocomplete="off"
                onChange={handleChange}
              />
                <label>First name (required)</label>
              </div>
            </div>
          <div className="dropdown">
            <div className="input-group">
              <input 
                required
                className='formControl' 
                type="text" 
                id='lastname' 
                autocomplete="off"
                onChange={handleChange}
              />
                <label>Lastt name (required)</label>
              </div>
            </div>
          <div className="dropdown">
            <div className="input-group">
              <input 
                required
                className='formControl' 
                type="tel" 
                id='phonenumber' 
                autocomplete="off"
                onChange={handleChange}
              />
                <label>Phone number (required)</label>
              </div>
            </div>
            <button 
              type='button' 
              className='Button'
              onClick={handlClick}
            >
            Next
            </button>
        </form>
      </div>
    </div>
  )
}

export default Create