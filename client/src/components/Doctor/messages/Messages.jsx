import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import useListenMessages from "../hooks/useListenMessages";
import { useAuthContext } from "../context/AuthContext";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const { authUser } = useAuthContext(); // Access the logged-in user info from context
  useListenMessages();

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Welcome message with the username */}
      {authUser && authUser.username && (
        <p className="text-center text-lg font-semibold text-blue-600">
          Welcome, {authUser.username}!
        </p>
      )}

      {/* Message to start a conversation */}
      {!loading && messages.length === 0 && (
        <p className="text-center">Start conversation by sending a message</p>
      )}

      {/* Display each message */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
