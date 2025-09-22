import express from "express";
import Experience from "../models/Experience.js";
import authMiddleware from "../middleware/authMiddleware.js"; // JWT auth

const router = express.Router();

// GET all experience/education
router.get("/", async (req, res) => {
  try {
    const timeline = await Experience.find();
    res.json(timeline);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST new experience/education
router.post("/", authMiddleware, async (req, res) => {
  try {
    const exp = new Experience(req.body);
    await exp.save();
    res.json({ success: true, data: exp });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE experience/education by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Experience.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Experience not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
