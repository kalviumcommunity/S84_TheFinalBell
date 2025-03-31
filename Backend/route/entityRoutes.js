const express = require("express");
const router = express.Router();
const Entity = require("../model/Entity");

// GET all entities
router.get("/", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching entities" });
  }
});

// POST new entity
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newEntity = new Entity({ title, description });
    await newEntity.save();
    res.status(201).json(newEntity);
  } catch (error) {
    res.status(500).json({ message: "Error adding entity" });
  }
});

module.exports = router;
