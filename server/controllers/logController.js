import Ticket from "../models/ticket.js";

export const getClosedTickets = async (req, res) => {
  try {
    const logs = await Ticket.find({
      closed_at: { $ne: null } // 🔥 THIS IS YOUR SOURCE OF TRUTH
    }).sort({ closed_at: -1 });

    res.status(200).json({
      message: "Closed tickets fetched successfully",
      count: logs.length,
      logs
    });

  } catch (error) {
    console.error("Get Logs Error:", error);
    res.status(500).json({
      message: "Server error while fetching logs"
    });
  }
};