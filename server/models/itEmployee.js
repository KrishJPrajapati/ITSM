import mongoose from "mongoose";

const itEmployeeSchema =  mongoose.Schema({
    
  firstName: { 
    type: String, 
    required: true, 
    trim: true 
  },

  lastName: { 
    type: String, 
    required: true, 
    trim: true 
  },

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
    minlength: 6 
  },

  designation: { 
    type: String, 
    default: "IT Support" 
  },

  role:{
    type: String,
    default:"employee"
  }
,
  date_joined:{
    type: Date,
    required: true
  },

  DOB:{
    type: Date,
    require:true
  },
  assigned_at:{
    type:String,
    default:"Bharat IT"
  },
  phoneNumber: { type: String },

}, { timestamps: true });

export default mongoose.model('ItEmployee', itEmployeeSchema)