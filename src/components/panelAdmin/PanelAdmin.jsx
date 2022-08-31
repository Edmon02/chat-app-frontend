import React from './panelAdmin.css'
import { Link, useLocation } from "react-router-dom";
import { faBell, faCalendarAlt, faCommentDots, faGear, faHome, faPlus, faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';


function PanelAdmin(props) {
  const active = props.active
  // const { loading, error, dispatch } = useFetch("/user")
  var {user} = useContext(AuthContext)
  // const  data = useFetch(`/users?id=${props.url}`)

  return (
    <div className='admin'>
      <div className='adUser'>
        <img 
          className='adimg'
          src="https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?cs=srgb&dl=pexels-hasibullah-zhowandai-819530.jpg&fm=jpg"
          alt=""
        />
        <select name="account" id="account" className='asAccount'>
          <option value="userName">{user.firstname} {user.lastname}</option>
          <option value="faPlus" ><div className="addAcc">+</div> Add New Account</option>
        </select>
      </div>
      <div className="all-chat-items">
        <Link to="/home" style={{ color: "inherit", textDecoration: "none" }}>
          <div 
            className={active === "home" ? "adListIteam active disabled" : "adListIteam"}  
          >
            <span className='asRect'></span>
            <ion-icon 
              class='adLsIcon'
              name="grid-outline"
              data-value="0"
            ></ion-icon>
            Home
          </div>
        </Link>
        <Link to={"/"+user.user_id} style={{ color: "inherit", textDecoration: "none" }}>
          <div 
            className={active === "chat" ? "adListIteam active disabled" : "adListIteam"} 
            >
            <span className='asRect'></span>
            <ion-icon 
              class='adLsIcon' 
              data-value="1"
              name="chatbubble-ellipses-outline"
              ></ion-icon>
            Chat
          </div>
        </Link>
        <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>
          <div 
            className={active === "contact" ? "adListIteam active disabled" : "adListIteam"} 
          >
            <span className='asRect'></span>
            <ion-icon 
              class='adLsIcon'
              data-value="2"
              name="person-outline"
            ></ion-icon>
            Contact
          </div>
        </Link>
        <div 
          className={active === "notifications" ? "adListIteam active disabled" : "adListIteam"}
        >
          <span className='asRect'></span>
          <ion-icon 
            class='adLsIcon'
            data-value="3"
            name="notifications-outline"
          ></ion-icon>
          Notifications
        </div>
        <div 
          className={active == "calendar" ? "adListIteam active disabled" : "adListIteam"} 
        >
          <span className='asRect'></span>
          <ion-icon 
            class='adLsIcon' 
            data-value="4"
            name="calendar-outline"
          >
          </ion-icon>
          Calendar
        </div>
        <div 
          className={active === "setting" ? "adListIteam active disabled" : "adListIteam"}
        >
          <span className='asRect'></span>
          <ion-icon 
            class='adLsIcon' 
            data-value="5"
            name="settings-outline"
          ></ion-icon>
          Settings
        </div>
      </div>
        <div className="adListLOut">
          <ion-icon 
            class='adLsIcon'
            name="power-outline"
          ></ion-icon>
          Log out
        </div>
    </div>
  )
}

export default PanelAdmin