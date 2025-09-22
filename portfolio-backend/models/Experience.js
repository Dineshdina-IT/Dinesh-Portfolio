import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  type: String, // "education" or "experience"
  title: String,
  institution: String,
  period: String,
  description: String
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);
