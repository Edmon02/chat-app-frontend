import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './account.css';
import { io } from "socket.io-client";


function Account({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const socket = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, [])

  useEffect(() => {
    socket.current.emit("addUser", currentUser.user_id)
    socket.current.on("getUsers", users=>{
      setOnlineUsers(users)
    })
  }, [user]);
  
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.user_id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  const handlClick = () => {
    localStorage.setItem("chat_items", JSON.stringify(conversation))
    navigate(`/${currentUser.user_id}`, { state:  conversation})
  }

  return (
    <>
    {user ? 
      <button
        className='button'
        onClick={handlClick}
      >
      <div className="aAccounts ">
      <div className="aAccount">
        <div className="aImgA">
          <img src={ PF+"noAvatar.png"}
            alt="" 
            className="aIUser" />
            {onlineUsers.find((elem) => {
              return elem.userId === conversation.members[1]
            }) ? 
              <p className="aActive"></p> : 
              "" 
            }
        </div>
        <div className="aNaTA">
          <p className="aName">{user ? [user.firstname, user.lastname]: ""}</p>
          {/* <p className="aType">... write</p> */}
        </div>
        <p className="aAcTime">1 minute ago</p>
      </div>
      <div className="aTexts">
        {/* <p className="aText">Most of its text is made up from sections 1.10.32–3 of Cicero's De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes). 
        </p> */}
        {/* <div className="aTCount">2</div> */}
      </div>
      </div>
      </button> : ""}
    </>
  )
}

export default Account