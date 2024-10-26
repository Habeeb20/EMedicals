import React from 'react'

function useMarkMessagesAsRead(chatId) {
    const markAsRead = async() =>{
        await fetch(`${import.meta.env.VITE_API_DC}/messages/${chatId}/read`, {
            method:'PATCH'
        })
    }
  return markAsRead
}

export default useMarkMessagesAsRead
