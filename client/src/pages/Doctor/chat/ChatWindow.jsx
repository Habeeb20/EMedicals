import Logout from "../../../components/Doctor/homeChat/Logout";
import Right from "../../../components/Doctor/homeChat/Rightpart/Right";
import Left from "../../../components/Doctor/homeChat/Left/Left";

import React from 'react'
import Navbar from "../../../components/Navbar";

const ChatWindow = () => {
  return (
    <div>
    <Navbar/>
    <div className="flex h-screen">
    <Logout />
    <Left />
    <Right />

    </div>
      
    </div>
  )
}

export default ChatWindow
