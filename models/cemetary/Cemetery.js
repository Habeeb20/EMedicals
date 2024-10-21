import mongoose from 'mongoose';

const cemeterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: { type: String, required: true },

  profilePicture: { type: String },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  isVerified: {type: Boolean,default: false},
  createdAt: { type: Date, default: Date.now },
  state: { type: String, required: true },
  LGA: { type: String, required: true },
  address: { type: String, required: true },
  uniqueNumber: { type: String, unique: true },
  cemeterySpacePrice: { type: Number, required: true },
  casketName: {type: String, required: true},
  casketPrice:  {type: String, required: true},
  casketImage:{type:String, required: true},
  chapelName:{type: String, required: true},
  chapelAddress:{type: String, required: true},
  serviceCategory: { type: String, required: true },
  flowerName:{type:String, required: true},
  flowerImage:{type:String, required: true},
  flowerPrice: {type:String, required: true},
  verseName:{type:String, required: true},
  verseImage:{type:String, required: true},
  versePrice:{type:String, required: true},


});

const Cemetery = mongoose.model('Cemetery', cemeterySchema);

export default Cemetery;
