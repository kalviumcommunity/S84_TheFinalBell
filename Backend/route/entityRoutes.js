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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const entity = await Entity.findById(id);

  if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
  }

  entity.title = req.body.title;
  entity.description = req.body.description;

  await entity.save();
  res.json(entity);
});


// DELETE entity by ID
router.delete("/:id", async (req, res) => {
  try {

    const {id} = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const entity = await Entity.findByIdAndDelete(id);
    if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
    }
    res.status(200).json({ message: "Entity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting entity" });
  }
});

module.exports = router;
