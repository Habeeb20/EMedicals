import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true)

        const res = await fetch(`${import.meta.env.VITE_API_DC}/users`, {
          method: 'GET',
          credentials: 'include',
        })

        const data = await res.json()

        if (data.error) {
          console.log(data.error)
          throw new Error(data.error)
        }

        setConversations(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    getConversations()
  }, [])

  return { loading, conversations }
}

export default useGetConversations
