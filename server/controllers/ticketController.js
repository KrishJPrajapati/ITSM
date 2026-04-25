import Ticket from "../models/ticket.js";
import ItEmployee from "../models/itEmployee.js";
import { sendTicketOTPEmail } from "../services/emailService.js";

/* ================= HELPERS ================= */

const generateTicketId = () => "TCK" + Date.now();
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/* ================= CREATE TICKET (AUTO ASSIGN) ================= */

export const createTicket = async (req, res) => {
  try {
    const {
      ticket_title,
      description,
      priority,

      created_by_name,
      client_email,
      contact_phone,
      department,

      asset_type,
      asset_id,
      location,

      category,
      sub_category,
      impact,
      business_impact,

      plant,
    } = req.body;

    // ✅ Validation
    if (
      !ticket_title ||
      !description ||
      !priority ||
      !created_by_name ||
      !client_email
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const ticket_id = generateTicketId();

    // ✅ Find engineers
    const engineers = await ItEmployee.find();

    if (!engineers.length) {
      return res.status(400).json({
        message: "No engineers available for this plant",
      });
    }

    // ✅ Round Robin
    const total = await Ticket.countDocuments({ plant });
    const selected = engineers[total % engineers.length];
    const slaMap = {
    low: 72,
    medium: 48,
    high: 24,
    critical: 4
  };

const hours = slaMap[priority] || 48;

const sla_due_date = new Date(Date.now() + hours * 60 * 60 * 1000);
    const newTicket = new Ticket({
      ticket_id,
      ticket_title,
      description,
      priority,

      created_by_name,
      client_email,
      contact_phone,
      department,

      asset_type,
      asset_id,
      location,

      category,
      sub_category,
      impact,
      business_impact,

      plant,

      status: "ASSIGNED",
      tag: "ASSIGNED",

      assigned_engineer_id: selected.e_id,
      assigned_engineer_name: `${selected.firstName} ${selected.lastName}`,
      assignment_type: "AUTO",

      initiate_date: new Date(),
      assigned_at: new Date(),
      sla_due_date:sla_due_date
    });

    await newTicket.save();

    res.status(201).json({
      message: "Ticket created and assigned",
      assigned_to: selected.e_id,
      ticket: newTicket,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: "Error creating ticket" });
  }
};

/* ================= GET USER TICKETS ================= */

export const getUserTickets = async (req, res) => {
  try {
    const { email } = req.params;

    const tickets = await Ticket.find({ client_email: email }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user tickets" });
  }
};

/* ================= GET ASSIGNED TICKETS ================= */

export const getAssignedTickets = async (req, res) => {
  try {
    const { e_id } = req.params;

    const tickets = await Ticket.find({
      assigned_engineer_id: e_id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching assigned tickets" });
  }
};

/* ================= GET ALL TICKETS (MANAGER / HOD) ================= */

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

/* ================= TRACK SINGLE ================= */

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

/* ================= UPDATE STATUS ================= */

export const updateTicketStatus = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findOne({ ticket_id });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    if (new Date() > ticket.sla_due_date && ticket.status !== "CLOSED") {
    ticket.is_sla_breached = true;
  }
    ticket.status = status;

    if (status === "IN_PROGRESS") ticket.tag = "WORKING";
    if (status === "RESOLVED") ticket.tag = "RESOLVED";

    await ticket.save();

    res.status(200).json({
      message: "Status updated",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};

/* ================= REASSIGN ================= */

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
      message: "Engineer reassigned",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: "Error reassigning engineer" });
  }
};

/* ================= OTP ================= */

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

    await sendTicketOTPEmail(ticket.client_email, otp, ticket.ticket_id);

    res.status(200).json({
      message: "OTP sent",
    });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP" });
  }
};

/* ================= CLOSE ================= */

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
      message: "Ticket closed",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: "Error closing ticket" });
  }
};