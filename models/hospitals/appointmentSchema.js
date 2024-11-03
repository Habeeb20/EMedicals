import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'HUser' },
    message: String,
    timestamp: { type: Date, default: Date.now },
});

const AppointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'HUser' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'HUser' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'rescheduled'], default: 'pending' },
    date: Date,
    medicalReport: String, 
    messageThread: [MessageSchema],
    notifications: [{
        type: { type: String, enum: ['appointment', 'report'] },
        message: String,
        isRead: { type: Boolean, default: false },
        timestamp: { type: Date, default: Date.now },
    }],
});

export default mongoose.model('HAppointment', AppointmentSchema);
