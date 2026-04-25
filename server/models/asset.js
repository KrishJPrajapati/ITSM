import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    assetId: String,
    assetName: String,
    assetType: String,
    brand: String,
    modelNumber: String,
    serialNumber: String,
    ipAddress: String,
    macAddress: String,
    purchaseDate: Date,
    warrantyExpiry: Date,
    location: String,
    assignedUser: String,
    assetStatus: String,
    lastMaintenance: Date,
    maintenanceDesc: String,
  },
  { timestamps: true }
);

export default mongoose.model("Asset", assetSchema);