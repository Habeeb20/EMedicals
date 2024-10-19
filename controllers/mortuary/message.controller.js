import Message from "../../models/mortuary/messageSchema.js";


export const sendMessage = async (req, res) => {
    console.log(req.user); 
    const { receiverId, content } = req.body;
    const senderEmail = req.user?.email; 

    if (!senderEmail) {
        return res.status(401).json({ message: 'User not authenticated' });
    }


    try {
        const newMessage = new Message({
            senderEmail,
            receiverId,
            content,
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
};


export const getUserMessages = async (req, res) => {
    const senderEmail = req.user.email; 

    try {
        const messages = await Message.find({ senderEmail }).populate('receiverId');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};


export const getMortuaryMessages = async (req, res) => {
    const { id } = req.params;

    try {
        const messages = await Message.find({ receiverId: id }).populate('senderEmail');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};
