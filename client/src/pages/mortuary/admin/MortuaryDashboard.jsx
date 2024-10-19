const MortuaryDashboard = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_m}/mortuary/${mortuaryId}/messages`);
            setMessages(response.data);
        };
        fetchMessages();
    }, [mortuaryId]);

    return (
        <div>
            <h2>Your Messages</h2>
            {messages.map((message) => (
                <div key={message._id}>
                    <p><strong>From:</strong> {message.senderEmail}</p>
                    <p><strong>Message:</strong> {message.content}</p>
                    <p><strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};
