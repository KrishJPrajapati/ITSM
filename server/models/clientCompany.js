import mongoose from "mongoose";

const clientCompanySchema = new mongoose.Schema({

    company_id:{
    type:String,
    required:true,
    unique:true
    },
    
  companyName: {
    type: String,
    required: true,
    trim: true
  },

  city: {
    type: String,
    required: true,
    trim: true
  },

  tel: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },

  head: {
    type: String,
    required: true,
    trim: true
  },

  contractStart: {
    type: Date,
    required: true
  },

  contractEnd: {
    type: Date,
    required: true
  },

    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
    },

  address: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true
  }

}, { timestamps: true });

export default mongoose.model("ClientCompany", clientCompanySchema);