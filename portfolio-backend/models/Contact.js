import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // linked to registered user
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Contact", contactSchema);
