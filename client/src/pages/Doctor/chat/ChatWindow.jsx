// import React from 'react'
// import Sidebar from '../../../components/Doctor/Sidebar/Sidebar'
// import MessageContainer from '../../../components/Doctor/messages/MessageContainer'
// import Navbar from '../../../components/Navbar'

// const ChatWindow = () => {
//   return (
//     <div>
//     <Navbar />
//      <div className="flex flex-col md:flex-row h-screen md:h-auto rounded-lg overflow-hidden bg-gray-100 shadow-lg mt-16">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <MessageContainer />
//       </div>
//     </div>
      
//     </div>
//   )
// }

// export default ChatWindow




import React from 'react';
import Sidebar from '../../../components/Doctor/Sidebar/Sidebar';
import MessageContainer from '../../../components/Doctor/messages/MessageContainer';
import Navbar from '../../../components/Navbar';

const ChatWindow = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>
      
      {/* Main Content: Sidebar and MessageContainer */}
      <div className="flex flex-1 mt-16 md:mt-0 md:pt-16 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/5 h-full overflow-y-auto bg-white shadow-lg">
          <Sidebar />
        </div>

        {/* Message Container */}
        <div className="flex-1 h-full overflow-y-auto bg-gray-100">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
