import express from "express";
import Contact from "../models/Contact.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST new contact message (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Contact({ name, email, message, user: req.user });
    await newMessage.save();
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Optional: GET all messages (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
