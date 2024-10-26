import React from "react";
import userAvatar from "../../../assets/user.png"
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";

import { formatTime } from "../utils/formatTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const messageFromMe = message.senderId === authUser._id;
  const chatClassName = messageFromMe ? "justify-end" : "justify-start";

  const profilePicture = messageFromMe
    ? authUser.profilePicture
    : selectedConversation?.profilePicture || userAvatar;

  const msgBgColor = messageFromMe ? "bg-green-500 text-white" : "bg-white text-indigo-900";
  const formattedTime = formatTime(message.createdAt);

  return (
    <div className={`flex items-start ${chatClassName} py-3`}>
      {/* Profile picture */}
      {!messageFromMe && (
        <div className="mr-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-indigo-400 shadow-sm">
            <img
              src={profilePicture}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`relative max-w-xs lg:max-w-md p-4 mt-2 rounded-lg transition-all duration-300 ${msgBgColor} shadow-md`}
      >
        <p className={`text-sm leading-relaxed ${messageFromMe ? 'text-white' : 'text-indigo-900'}`}>
          {message.message}
        </p>
        <div className={`text-xs mt-1 ${messageFromMe ? 'text-gray-200' : 'text-gray-500'} text-right`}>
          {formattedTime}
        </div>
      </div>

      {/* Spacer for sent messages */}
      {messageFromMe && (
        <div className="ml-3">
          <div className="w-10 h-10 mt-2 rounded-full overflow-hidden border border-indigo-400 shadow-sm">
            <img
              src={authUser.profilePicture || userAvatar}
              alt="userprofile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;










// import React from "react";
// import userAvatar from "../../../assets/user.png";
// import { useAuthContext } from "../context/AuthContext";
// import useConversation from "../zustand/useConversation";
// import { formatTime } from "../utils/formatTime";

// const Message = ({ message }) => {
//   const { authUser } = useAuthContext();
//   const { selectedConversation } = useConversation();

//   const messageFromMe = message.senderId === authUser._id;
//   const chatClassName = messageFromMe ? "justify-end" : "justify-start";

//   const profilePicture = messageFromMe
//     ? authUser.profilePicture
//     : selectedConversation?.profilePicture || userAvatar;

//   const msgBgColor = messageFromMe ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800";
//   const formattedTime = formatTime(message.createdAt);

//   return (
//     <div className={`flex items-start ${chatClassName} py-3 px-4`}>
//       {/* Profile picture for incoming messages */}
//       {!messageFromMe && (
//         <div className="mr-3">
//           <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-sm">
//             <img
//               src={profilePicture}
//               alt="User Avatar"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       )}

//       {/* Message bubble */}
//       <div
//         className={`relative max-w-[75%] md:max-w-[60%] lg:max-w-[50%] p-4 rounded-3xl ${msgBgColor} shadow-md`}
//       >
//         <p className="text-sm leading-relaxed break-words">{message.message}</p>
//         <div className="text-xs mt-2 text-right text-gray-500">
//           {formattedTime}
//         </div>
//       </div>

//       {/* Profile picture for sent messages */}
//       {messageFromMe && (
//         <div className="ml-3">
//           <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-sm">
//             <img
//               src={authUser.profilePicture || userAvatar}
//               alt="userprofile"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Message;
