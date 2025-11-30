// lib/models/ScanReport.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface IScanReport extends Document {
  userId?: string;
  imageUrl?: string;
  hairType: string;
  scalpHealth: string;
  issues: string[];
  recommendations: string[];
  createdAt: Date;
}

const ScanReportSchema = new Schema<IScanReport>(
  {
    userId: { type: String },
    imageUrl: { type: String },
    hairType: { type: String, required: true },
    scalpHealth: { type: String, required: true },
    issues: [{ type: String, required: true }],
    recommendations: [{ type: String, required: true }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const ScanReport =
  models.ScanReport || mongoose.model<IScanReport>("ScanReport", ScanReportSchema);

export default ScanReport;
