import express from "express";
import Experience from "../models/Experience.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
});

// POST new experience (admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.json({ success: true, experience });
  } catch (err) {
    res.status(500).json({ error: "Failed to create experience" });
  }
});

// PUT update experience (admin only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExperience) return res.status(404).json({ error: "Experience not found" });

    res.json({ success: true, experience: updatedExperience });
  } catch (err) {
    res.status(500).json({ error: "Failed to update experience" });
  }
});

export default router;
