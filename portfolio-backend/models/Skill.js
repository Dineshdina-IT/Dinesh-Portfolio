import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: String,
  level: Number,
  category: String // e.g., "frontend", "backend"
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);
