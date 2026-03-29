import ClientCompany from "../models/clientCompany.js";

/* ================= HELPER FUNCTIONS ================= */

// validate required fields
const validateCompanyInput = ({
  companyName,
  city,
  tel,
  head,
  contractStart,
  contractEnd,
  email,
  address,
  category
}) => {
  return (
    companyName &&
    city &&
    tel &&
    head &&
    contractStart &&
    contractEnd &&
    email &&
    address &&
    category
  );
};

// generate company_id
const generateCompanyId = () => "COMP" + Date.now();

// build response
const buildCompanyResponse = (company) => ({
  id: company._id,
  company_id: company.company_id,
  companyName: company.companyName,
  city: company.city,
  tel: company.tel,
  head: company.head,
  contractStart: company.contractStart,
  contractEnd: company.contractEnd,
  email: company.email,
  address: company.address,
  category: company.category
});


/* ================= ADD CLIENT COMPANY ================= */

export const addClientCompany = async (req, res) => {
  try {
    const {
      companyName,
      city,
      tel,
      head,
      contractStart,
      contractEnd,
      email,
      address,
      category
    } = req.body;

    // validate required
    if (!validateCompanyInput(req.body)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check existing email
    const existingCompany = await ClientCompany.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        message: "Company with this email already exists"
      });
    }

    // generate company id
    const company_id = generateCompanyId();

    // create document
    const newCompany = new ClientCompany({
      company_id,
      companyName,
      city,
      tel,
      head,
      contractStart,
      contractEnd,
      email,
      address,
      category
    });

    await newCompany.save();

    res.status(201).json({
      message: "Client company added successfully by Super Admin",
      company: buildCompanyResponse(newCompany)
    });

  } catch (error) {
    console.error("Add Client Company Error:", error);
    res.status(500).json({
      message: "Server error while adding client company"
    });
  }
};


/* ================= UPDATE CLIENT COMPANY ================= */

export const updateClientCompany = async (req, res) => {
  try {
    const { company_id } = req.params;

    const company = await ClientCompany.findOne({ company_id });

    if (!company) {
      return res.status(404).json({
        message: "Client company not found"
      });
    }

    // update fields
    Object.assign(company, req.body);

    await company.save();

    res.status(200).json({
      message: "Client company updated successfully",
      company: buildCompanyResponse(company)
    });

  } catch (error) {
    console.error("Update Client Company Error:", error);
    res.status(500).json({
      message: "Server error while updating client company"
    });
  }
};


/* ================= DELETE CLIENT COMPANY ================= */

export const deleteClientCompany = async (req, res) => {
  try {
    const { company_id } = req.params;

    const company = await ClientCompany.findOneAndDelete({ company_id });

    if (!company) {
      return res.status(404).json({
        message: "Client company not found"
      });
    }

    res.status(200).json({
      message: "Client company deleted successfully"
    });

  } catch (error) {
    console.error("Delete Client Company Error:", error);
    res.status(500).json({
      message: "Server error while deleting client company"
    });
  }
};


/* ================= GET ALL CLIENT COMPANIES ================= */

export const getAllClientCompanies = async (req, res) => {
  try {
    const companies = await ClientCompany.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: companies.length,
      companies
    });

  } catch (error) {
    console.error("Get Client Companies Error:", error);
    res.status(500).json({
      message: "Server error while fetching companies"
    });
  }
};