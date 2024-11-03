import Appointment from '../../models/hospitals/appointmentSchema.js';

export const bookAppointment = async (req, res) => {
    try {
        const { doctorId, date } = req.body;
        const newAppointment = new Appointment({
            patientId: req.user._id,
            doctorId,
            date,
            status: 'pending',
            notifications: [{
                type: 'appointment',
                message: 'Appointment booking request submitted.',
            }],
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to book appointment' });
    }
};

export const getNotifications = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user._id });

        const notifications = appointments.flatMap(app => app.notifications);
        res.json({ notifications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
};
