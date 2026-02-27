import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  phoneNumber: { type: String }, 

  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  officeName: String,
  city: String,
  state: String,
  designation: String,

  c_id: { type: String, unique: true }
}, { timestamps: true });

export default mongoose.model('Client', clientSchema);
