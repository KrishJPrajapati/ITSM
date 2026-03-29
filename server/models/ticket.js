import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    
    ticket_id : {
        type:String,
        require:true,
    },

    ticket_title : {
        type : String,
        require: true
    },

    initiate_date: {
        type : Date,
        require: true
    },

    service_level: {
        type: String,
    },

    service_name: {
        type:String,
        default:"IT"
    },

    category_name: {
        type: String,
        default:"IT Infra"
    },

    sub_category_name: {
        type: String,
        default:"IT infra - Others"
    },

    description:{
        type: String,
        require:true
    },

    head_name:{
        type: String
    },

    engineer_name:{
        type: String
    },

    created_by_name:{
        type:String
    },

    initiator_number:{
        type: String
    },

    tag:{
        type:String,
        default:"NEW"
    },

    priority:{
        type:String,
        require:true,
        default:"medium"
    },

    status:{
        type:String
    },
    otp: String,
    otp_expiry: Date,
    closed_at: Date,
    client_email: String,
    plant: String

    }, {timestamps:true});

    export default mongoose.model('Ticket', ticketSchema);