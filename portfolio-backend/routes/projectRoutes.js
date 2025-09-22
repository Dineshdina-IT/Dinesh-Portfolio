import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST new project
router.post("/", async (req, res) => {
  try {
    const { title, description, technologies, githubLink, demoLink } = req.body;
    const newProject = new Project({ title, description, technologies, githubLink, demoLink });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

export default router;
