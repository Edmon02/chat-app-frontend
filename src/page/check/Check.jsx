import { useLocation, useNavigate } from 'react-router-dom';
import React from './check.css'
import axios from "axios";

function Check() {
  const { state } = useLocation();
  const navigate = useNavigate()

  const handleChange = e => {
    if(state.code === Number(e.target.value)){
      delete state.code
      navigate("/create", {state: state})
    }
  }

  return (
    <div className="table">
      <div className='loginChat'>
        <div className="lText">
          <p className="title">Enter code</p>
            <p className="info">We've sent an Code with an activation code to your email  {state.email}.</p>
        </div>
        <form action='action'>
          <div className="dropdown">
            <div className="input-group">
              <input 
                required
                className='formControl' 
                type="email" 
                id='email' 
                autocomplete="off"
                onChange={handleChange}
              />
                <label>Code</label>
              </div>
            </div>
            <button 
              type='button' 
              className='Button'
              // onClick={handlClick}
            >
            Next
            </button>
        </form>
      </div>
    </div>
  )
}

export default Check