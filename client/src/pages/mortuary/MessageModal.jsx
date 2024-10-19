import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MessageModal = ({ isOpen, onClose, mortuaryId }) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const userEmail = localStorage.getItem("email");

        if (!message || !userEmail) return;

        try {
            await axios.post(`${import.meta.env.VITE_API_m}/sendmessage`, {
                receiverId: mortuaryId,
                content: message,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true, 
            });
            toast.success("Message sent successfully!");
            setMessage("");
            onClose();
        } catch (error) {
            console.error("Error sending message", error);
            toast.error("Failed to send message.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4 text-center">Send Message</h2>
                <form onSubmit={handleSendMessage}>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="4"
                        className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-green-500"
                        placeholder="Type your message here..."
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-200">Send</button>
                        <button type="button" className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200" onClick={onClose}>Cancel</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default MessageModal;
