// routes/projectRoutes.js
import express from "express";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST new project (admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// PUT update project (admin only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Ensure tags are stored as array
    if (req.body.tags && typeof req.body.tags === "string") {
      req.body.tags = req.body.tags.split(",").map(tag => tag.trim());
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ error: "Project not found" });

    res.json({ success: true, project: updatedProject });
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

export default router;
