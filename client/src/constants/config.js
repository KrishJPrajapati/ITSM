export const SERVICE_URLS = {
  /* ================= AUTH ================= */

  loginITEmployee: { url: "/employee/login", method: "POST" },
  loginClientEmployee: { url: "/clients/login", method: "POST" },

  /* ================= USERS ================= */

  createClientEmployee: { url: "/clients/create", method: "POST" },
  createItEmployee: { url: "/employee/create", method: "POST" },

  getItEmployees: { url: "/employee/all", method: "GET" },
  getClientEmployees: { url: "/clients/all", method: "GET" },

  updateItEmployee: { url: "/employee/update/:e_id", method: "PUT" },
  deleteItEmployee: { url: "/employee/delete/:e_id", method: "DELETE" },

  // ⚠️ ONLY if you create backend routes for this
  updateClientEmployee: { url: "/clients/update/:id", method: "PUT" },
  deleteClientEmployee: { url: "/clients/delete/:id", method: "DELETE" },

  /* ================= COMPANY ================= */

  createCompany: { url: "/company/create", method: "POST" },
  getCompanies: { url: "/company/all", method: "GET" },
  updateCompany: { url: "/company/update/:company_id", method: "PUT" },
  deleteCompany: { url: "/company/delete/:company_id", method: "DELETE" },

  /* ================= ASSETS ================= */

  createAsset: { url: "/asset/create", method: "POST" },
  getAssets: { url: "/asset/all", method: "GET" },
  updateAsset: { url: "/asset/:id", method: "PUT" },
  deleteAsset: { url: "/asset/:id", method: "DELETE" },

  /* ================= TICKETS ================= */

  createTicket: { url: "/ticket/create", method: "POST" },
  trackTicket: { url: "/ticket/:ticket_id", method: "GET" },

  getUserTickets: { url: "/ticket/user/:email", method: "GET" },
  getAssignedTickets: { url: "/ticket/assigned/:e_id", method: "GET" },
  getAllTickets: { url: "/tickets", method: "GET" },

  updateTicketStatus: { url: "/ticket/status/:ticket_id", method: "PUT" },
  reassignEngineer: { url: "/ticket/reassign/:ticket_id", method: "PUT" },

  sendCloseOtp: { url: "/ticket/send-otp/:ticket_id", method: "POST" },
  closeTicket: { url: "/ticket/close/:ticket_id", method: "POST" },

  /* ================= LOGS ================= */

  getClosedLogs: { url: "/logs/closed", method: "GET" },
};

export const API_NOTIFICATION_MESSAGES = {
    loading: {
      title: 'Loading...',
      message: 'Data is being loaded, please wait...',
    },
    success: {
      title: 'Success',
      message: 'Data loaded successfully',
    },
    responseFailure: {
      title: 'Error',
      message: 'An error occurred while fetching response from the server. Please try again.',
    },
    requestFailure: {
      title: 'Error',
      message: 'An error occurred while parsing request data.',
    },
    networkError: {
      title: 'Error',
      message: 'Unable to connect to the server. Please check your network and try again later.',
    },
  };
  