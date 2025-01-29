
import mongoose from 'mongoose';

const deceasedSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  causeOfDeath: { type: String, required: true },
  dateOfDeath: { type: Date, required: true },
  gender: {type:String, required: true},
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'HUser', required: true }
});

const Deceased = mongoose.model('Deceased', deceasedSchema);

export default Deceased;
