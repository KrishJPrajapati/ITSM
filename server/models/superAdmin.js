import mongoose from "mongoose";

const superAdminSchema = mongoose.Schema({
    e_id: { 
    type: String, 
    required: true, 
    unique: true 
  },

  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },

  password: { 
    type: String, 
    required: true, 
    minlength: 8   
  }

}, { timestamps: true });

export default mongoose.model('SuperAdmin', superAdminSchema);