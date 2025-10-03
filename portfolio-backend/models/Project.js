// models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],       // Frontend will send tags as comma-separated string, we'll convert to array
  github: String,
  live: String,
  image: String
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
