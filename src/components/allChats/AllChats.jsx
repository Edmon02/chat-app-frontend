import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import React from './allChats.css'
import Account from '../account/Account'
import { useContext, useEffect, useState } from 'react';
// import AllContacts from '../allContacts/AllContacts';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';

function AllChats() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user.user_id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.user_id]);
    
     
  return (
    <div >
    <div className='allChats'>
      <div className="aChatTitle">
        <div className="ChatSort">
          Chats
          <select name="Recent Chat" id="reChats" className="reChat">
            <option value="Contacts">Contacts</option>
            <option value="Recent Chat">Recent Chat</option>
          </select>
        </div>
        <button className="tButton">
          <FontAwesomeIcon className='tbAdd' icon={faPlus} />
          Crate New Chat
        </button>
      </div>
      <div className="aSearch">
        <div className="aItemSearch">
          <ion-icon class='aSeIcon' name="search-outline"></ion-icon>
          <input type="text" className="aSIput" placeholder='Search' />
        </div>
        <select name="categoryChat" id="catChat" className='aSFilter'>
          <option value="message" className="message">Messages</option>
        </select>
      </div>
    </div>

    <div className="aContactAcc">
      {conversations.length !== 0 ? conversations.map((c) => (
        <Account key={c} conversation={c} currentUser={user} />
      )) : null}

    </div>
  </div>
  )
}

export default AllChats