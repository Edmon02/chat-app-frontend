import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from './login.css'
import { AuthContext } from '../../context/AuthContext';

function Login() {
     const [credentials, setCredentials] = useState({
          email:undefined,
          password:undefined,
          code:undefined
     });
     // const { loading, error, dispatch} = useContext(AuthContext);
     
     const navigate = useNavigate()

     function Check(e) {
          if(
               credentials.password.match(/[A-Z]/g) &&
               credentials.password.match(/[0-9]/g) &&
               credentials.password.length >= 8
          ){
               return true
          }else return false
     }

     const handleChange = (e) => {
          setCredentials((prev)=>({...prev, [e.target.id]:e.target.value}))
          var checkPass = document.getElementById("password")
          var checkPass1 = document.getElementById("password1")
          setTimeout(()=>{
               if(e.target.id === 'password' && Check(e)){
                    checkPass.style.borderColor = "green"
                    checkPass1.style.color = 'green';
               }else if(e.target.id === 'password'){
                    const checkPass = document.getElementById("password")
                    checkPass.style.borderColor = "#FF3333"
                    checkPass1.style.color = '#FF3333';
               }
          },1000)
     }

     const handlClick =  async(e) => {
          var checkCode = Math.ceil(Math.random(9) *10000000);
          credentials.code = checkCode
          e.preventDefault()
          if(Check()){
               try{
                    const res = await axios.post("/auth/login", credentials)
                    console.log(res)
                    if(res.data){
                         localStorage.setItem("user", JSON.stringify(
                              {    
                                   user_id:res.data.user._id,
                                   firstname:res.data.user.firstname,
                                   lastname:res.data.user.lastname,
                                   email:res.data.user.email,
                                   phonenumber:res.data.user.phonenumber
                              }
                         ));
                         await navigate("/")
                    }else {
                         await axios.post('/auth/check', credentials)
                         navigate("/check", { state:  credentials})
                    }
               }catch(err) {
                    console.log(err)
               }
          }
     }

     return (
          <div className="table">
               <div className='loginChat'>
                    <div className="lText">
                         <p className="title">Phone number</p>
                         <p className="info">Please confirm your country code and enter your phone number.</p>
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
                                   <label>Email</label>
                              </div>
                         </div>
                         <div className="dropdown">
                              <div className="input-group">
                                   <input 
                                        required
                                        className='formControl' 
                                        type="password" 
                                        id='password' 
                                        onChange={handleChange}
                                        autocomplete="off"
                                        />
                                   <label id='password1'>Password</label>
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

export default Login