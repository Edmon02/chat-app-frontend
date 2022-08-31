import React from './chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckDouble, faEllipsis, faEllipsisVertical, faFaceSmile, faFile, faPaperclip, faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useRef, useState } from 'react'
import { createElement } from 'react'
import Messages from '../messages/Messages'
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import { useLocation, useParams } from 'react-router-dom';
import { set } from 'mongoose'
import { io } from "socket.io-client";

function Chat(props) {
  const { state }  = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userItems, setUserItems] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(state ? state : JSON.parse(localStorage.getItem("chat_items")));
  const { user } = useContext(AuthContext);
  const socket = useRef();
  // const upload = {         //Upload file
  //   selectedFile: null
  // }; 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const addFiles = event => {
    event.target.classList.toggle('active')
  }

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage && 
    currentChat?.members.includes(arrivalMessage.sender) && 
    setMessages((prev)=>[...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user.user_id)
    socket.current.on("getUsers", users=>{
      setOnlineUsers(users)
    })
  }, [user]);


  useEffect(() => {
    const getUser = async () => {
      
        try {
          const res = await axios("/users?userId=" + currentChat.members[1] );
          setUserItems(res.data);
        } catch (err) {
          console.log(err);
        }
    };
    getUser();
  },  currentChat);
  
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id)
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.user_id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(member => member !== user.user_id)

    socket.current.emit("sendMessage", {
      senderId: user.user_id,
      receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  
  window.addEventListener("beforeunload", () => localStorage.removeItem('chat_items'));

  
  //Upload file
  // const onFileChange = (e) => {
  //   upload.selectedFile = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append( 
  //     "myFile", 
  //     upload.selectedFile, 
  //     upload.selectedFile.name 
  //   ); 
  //   setNewMessage(formData) 
  // }

  console.log(onlineUsers)
  
  return (
    <>
    {userItems ? <div className='Chat'>
      <div className="messagesLayout">

        <div className="cPanel">
          <div className="cPUser">
            <img src={userItems.userphoto ? userItems.userphoto : PF+"noAvatar.png"}
              alt="" 
              className="cPImg" 
            />
            {onlineUsers.find((elem) => {
              return elem.userId === currentChat.members[1]
            }) ? 
              <p className="cPActive"></p> : 
              "" 
            }
          </div>
          <div className="cPUName">
            <div className="cPName">{userItems.firstname} {userItems.lastname}</div>
            <div className="cPAtvCount">last online 5 hours ago</div>
          </div>
          <div className="cPItem">
            <div className="cPAdd">
              <FontAwesomeIcon icon={faPaperclip} />
              {/* <Link /> */}
            </div>
            <div className="cPAdd">
              <FontAwesomeIcon icon={faEllipsisVertical} />
              {/* <Link /> */}
            </div>
          </div>
        </div>

        <div className="cBox">
          <div className="cBMessag">
            <div className="cBMessagesL">
              <div className="messagesContainer">
                <div className="cMessOther"> 
                  <div className="cMessagDataGroup">
                    {messages.map((m) => (
                      <Messages friend={userItems} message={m} own={m.sender === user.user_id}/>
                    ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="MessagesBlock">
              <div className="mBInput">
                <div className="navigation">
                  <div 
                    className="mAddFiles"
                    onClick={addFiles}
                    >
                  </div>
                  <div className="menu">
                    <ul>
                      <label htmlFor="file-upload">
                        <li style={{ '--i':"0.1s"}}>
                          <ion-icon name="document-outline"></ion-icon>
                          <input 
                            type="file"
                            id="file-upload"
                            name="file-upload"
                            className='file'
                            // onChange={onFileChange}
                          />
                        </li>
                      </label>
                      <label htmlFor="video-upload">
                        <li style={{ '--i':"0.2s" }}>
                          <ion-icon name="film-outline"></ion-icon>
                          <input 
                            type="file"
                            id="video-upload"
                            name="video-upload"
                            className='file'
                            accept="video/*"
                          />
                        </li>
                      </label>
                      <label htmlFor="image-upload">
                        <li style={{ '--i':"0.3s" }}>
                          <ion-icon name="image-outline"></ion-icon>
                          <input 
                            type="file"
                            id="image-upload"
                            name="image-upload"
                            className='file'
                            accept="image/*"
                          />
                        </li>
                      </label>
                    </ul>
                  </div>
                </div>
                <input 
                  type="text" 
                  className="mMessag"  
                  placeholder='Type a message here'
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <div className="mAddSmiles">
                  <FontAwesomeIcon className='Smiles' icon={faFaceSmile} />
                </div>
                <button 
                  className="mSumbitMess"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> : ""}</>
  )
}

export default Chat