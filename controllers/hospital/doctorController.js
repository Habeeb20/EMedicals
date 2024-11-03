import Appointment from '../../models/hospitals/appointmentSchema.js';


// Accept an appointment
export const acceptAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await Appointment.findById(appointmentId);
        
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

        appointment.status = 'accepted';
        appointment.notifications.push({
            type: 'appointment',
            message: 'Your appointment has been accepted by the doctor.',
        });

        await appointment.save();
        res.json({ message: 'Appointment accepted', appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to accept appointment' });
    }
};

// Reject an appointment
export const rejectAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

        appointment.status = 'rejected';
        appointment.notifications.push({
            type: 'appointment',
            message: 'Your appointment has been rejected by the doctor.',
        });

        await appointment.save();
        res.json({ message: 'Appointment rejected', appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to reject appointment' });
    }
};

// Reschedule an appointment
export const rescheduleAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { newDate } = req.body;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

        appointment.date = newDate;
        appointment.status = 'rescheduled';
        appointment.notifications.push({
            type: 'appointment',
            message: `Your appointment has been rescheduled to ${new Date(newDate).toLocaleString()}.`,
        });

        await appointment.save();
        res.json({ message: 'Appointment rescheduled', appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to reschedule appointment' });
    }
};

// Send medical result to a patient
export const sendMedicalResult = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { medicalReport } = req.body;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

        appointment.medicalReport = medicalReport;
        appointment.notifications.push({
            type: 'report',
            message: 'Your medical report has been uploaded by the doctor.',
        });

        await appointment.save();
        res.json({ message: 'Medical report sent', appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send medical report' });
    }
};
