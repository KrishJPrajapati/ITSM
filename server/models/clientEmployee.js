import mongoose from 'mongoose';

const clientEmployeeSchema = new mongoose.Schema({
  
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
  
  companyName: String,

  officeName: String,
  
  city: String,
  
  state: String,
  
  designation: String,

  role:{
    type:String,
    default:"clientEmployee"
  },

  department:{
    type:String,
    required: true,
  },

  headName: String,
  
  DOB: {
    type:Date,
    required: true
  },

  client_id: { type: String, unique: true }

}, { timestamps: true });

export default mongoose.model('ClientEmployee', clientEmployeeSchema);