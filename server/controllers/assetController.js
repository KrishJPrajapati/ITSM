import Asset from "../models/asset.js";

/* ================= CREATE ================= */
export const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);

    res.status(201).json({
      message: "Asset created successfully",
      data: asset,
    });
  } catch (error) {
    console.error("Create Asset Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL ================= */
export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });

    res.status(200).json({
      data: assets,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE ================= */
export const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.status(200).json({
      message: "Asset updated",
      data: asset,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE ================= */
export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findByIdAndDelete(id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.status(200).json({
      message: "Asset deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};