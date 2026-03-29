import Ticket from "../models/ticket.js";
import ItEmployee from "../models/itEmployee.js";
import { sendTicketOTPEmail } from "../services/emailService.js";

/* ================= HELPER FUNCTIONS ================= */

const generateTicketId = () => "TCK" + Date.now();
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/* ================= CREATE TICKET (AUTO ASSIGN) ================= */

export const createTicket = async (req, res) => {
  try {
    const {
      ticket_title,
      description,
      priority,
      plant,
      created_by_name,
      client_email
    } = req.body;

    const ticket_id = generateTicketId();

    // Find engineers in same plant
    const engineers = await ItEmployee.find({ assigned_at: plant }).sort({ createdAt: 1 });

    if (engineers.length === 0) {
      return res.status(400).json({
        message: "No engineers available for this plant"
      });
    }

    // Round Robin
    const totalAssignedTickets = await Ticket.countDocuments({
      plant,
      assigned_engineer_id: { $ne: null }
    });

    const engineerIndex = totalAssignedTickets % engineers.length;
    const selectedEngineer = engineers[engineerIndex];

    // Create ticket
    const newTicket = new Ticket({
      ticket_id,
      ticket_title,
      description,
      priority,
      plant,
      created_by_name,
      client_email,
      initiate_date: new Date(),
      status: "ASSIGNED",
      tag: "ASSIGNED",
      assigned_engineer_id: selectedEngineer.e_id,
      assigned_engineer_name:
        selectedEngineer.firstName + " " + selectedEngineer.lastName,
      assignment_type: "AUTO",
      assigned_at: new Date()
    });

    await newTicket.save();

    res.status(201).json({
      message: "Ticket created and auto assigned",
      assigned_to: selectedEngineer.e_id,
      ticket: newTicket
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating ticket" });
  }
};


/* ================= MANUAL REASSIGN ================= */

export const reassignEngineer = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { engineer_id } = req.body;

    const ticket = await Ticket.findOne({ ticket_id });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const engineer = await ItEmployee.findOne({ e_id: engineer_id });
    if (!engineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    ticket.assigned_engineer_id = engineer.e_id;
    ticket.assigned_engineer_name =
      engineer.firstName + " " + engineer.lastName;
    ticket.assignment_type = "MANUAL";
    ticket.assigned_at = new Date();

    await ticket.save();

    res.status(200).json({
      message: "Engineer reassigned successfully",
      ticket
    });

  } catch (error) {
    res.status(500).json({ message: "Error reassigning engineer" });
  }
};


/* ================= TRACK SINGLE TICKET ================= */

export const trackTicket = async (req, res) => {
  try {
    const { ticket_id } = req.params;

    const ticket = await Ticket.findOne({ ticket_id });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);

  } catch (error) {
    res.status(500).json({ message: "Error tracking ticket" });
  }
};


/* ================= GET ALL TICKETS ================= */

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: tickets.length,
      tickets
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};


/* ================= SEND OTP FOR CLOSING ================= */

export const sendCloseOtp = async (req, res) => {
  try {
    const { ticket_id } = req.params;

    const ticket = await Ticket.findOne({ ticket_id });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const otp = generateOTP();

    ticket.otp = otp;
    ticket.otp_expiry = new Date(Date.now() + 5 * 60 * 1000);

    await ticket.save();

    // Send Email
    await sendTicketOTPEmail(ticket.client_email, otp, ticket.ticket_id);

    res.status(200).json({
      message: "OTP sent to client email"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};


/* ================= CLOSE TICKET ================= */

export const closeTicket = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { otp } = req.body;

    const ticket = await Ticket.findOne({ ticket_id });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (ticket.otp_expiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    ticket.status = "CLOSED";
    ticket.tag = "CLOSED";
    ticket.closed_at = new Date();

    await ticket.save();

    res.status(200).json({
      message: "Ticket closed successfully",
      ticket
    });

  } catch (error) {
    res.status(500).json({ message: "Error closing ticket" });
  }
};