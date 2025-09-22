import express from "express";
import Skill from "../models/Skill.js";
import authMiddleware from "../middleware/authMiddleware.js"; // middleware to check JWT

const router = express.Router();

// GET all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// POST new skill (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to create skill" });
  }
});

// PUT update skill (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, level } = req.body;
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, level },
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    res.json({ success: true, skill: updatedSkill });
  } catch (err) {
    res.status(500).json({ error: "Failed to update skill" });
  }
});

export default router;
