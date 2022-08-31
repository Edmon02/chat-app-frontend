import { useContext } from 'react'
import AllChats from '../../components/allChats/AllChats'
import Chat from '../../components/chat/Chat'
import PanelAdmin from '../../components/panelAdmin/PanelAdmin'
import { AuthContext } from '../../context/AuthContext'
import React from './home.css'

function Home() {
  const {user} = useContext(AuthContext)


  return (
    <div className="box">
          <PanelAdmin active={"chat"} />
          {/* <AllChats /> */}
          <Chat />
    </div>
  )
}

export default Home