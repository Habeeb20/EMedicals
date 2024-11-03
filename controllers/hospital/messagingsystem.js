// server/routes/messaging.js

const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

// Post a message in an appointment's thread
router.post('/appointments/:id/messages', auth(['doctor', 'patient']), async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const appointment = await Appointment.findById(id);
        appointment.messageThread.push({
            sender: req.user._id,
            message,
        });
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;
