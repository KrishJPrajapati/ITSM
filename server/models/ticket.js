import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    /* ================= BASIC ================= */

    ticket_id: {
      type: String,
      required: true,
      unique: true,
    },

    ticket_title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    /* ================= CLIENT INFO ================= */

    created_by_name: {
      type: String,
      required: true,
    },

    client_email: {
      type: String,
      required: true,
    },

    contact_phone: {
      type: String,
    },

    department: {
      type: String,
    },

    /* ================= ASSET INFO ================= */

    asset_type: {
      type: String,
    },

    asset_id: {
      type: String,
    },

    location: {
      type: String,
    },

    plant: {
      type: String,
    },

    /* ================= CLASSIFICATION ================= */

    category: {
      type: String,
    },

    sub_category: {
      type: String,
    },

    impact: {
      type: String,
    },

    business_impact: {
      type: String,
    },

    /* ================= STATUS FLOW ================= */

    status: {
      type: String,
      enum: ["OPEN", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      default: "OPEN",
    },

    tag: {
      type: String,
      default: "NEW",
    },

    /* ================= ASSIGNMENT ================= */

    assigned_engineer_id: {
      type: String,
    },

    assigned_engineer_name: {
      type: String,
    },

    assignment_type: {
      type: String,
      enum: ["AUTO", "MANUAL"],
    },

    /* ================= TIMELINE ================= */

    initiate_date: {
      type: Date,
      default: Date.now,
    },

    assigned_at: {
      type: Date,
    },

    closed_at: {
      type: Date,
    },

    /* ================= OTP ================= */

    otp: String,

    otp_expiry: Date,
    sla_due_date: Date,
    first_response_at: Date,
    resolved_at: Date,
    is_sla_breached: {
    type: Boolean,
    default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);