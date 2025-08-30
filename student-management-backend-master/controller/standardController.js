const Standard = require('../models/standardModel');

// Generate next ID manually
const getNextId = async () => {
  const lastStandard = await Standard.findOne().sort({ id: -1 }); // Sort by highest ID
  return lastStandard ? lastStandard.id + 1 : 1;
};

// Add a new standard
const addStandard = async (req, res) => {
  try {
    const { standard } = req.body;

    if (!standard) {
      return res.status(400).json({ message: "Standard is required" });
    }

    // Check for duplicate
    const existing = await Standard.findOne({ standard });
    if (existing) {
      return res.status(409).json({ message: "Standard already exists" });
    }

    const nextId = await getNextId();

    const newStandard = new Standard({
      id: nextId,
      standard,
    });

    await newStandard.save();

    res.status(201).json({ message: "Standard added successfully", standard: newStandard });
  } catch (error) {
    console.error("Error adding standard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all standards
const getAllStandard = async (req, res) => {
  try {
    const standards = await Standard.find();
    res.status(200).json(standards);
  } catch (error) {
    console.error("Error fetching standards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit a standard
const editStandard = async (req, res) => {
  try {
    const { id } = req.params;
    const { standard } = req.body;

    if (!standard) {
      return res.status(400).json({ message: "Standard is required" });
    }

    const updated = await Standard.findOneAndUpdate(
      { id: parseInt(id) },
      { standard },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Standard not found" });
    }

    res.status(200).json({ message: "Standard updated", standard: updated });
  } catch (error) {
    console.error("Error editing standard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a standard
const deleteStandard = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Standard.findOneAndDelete({ id: parseInt(id) });

    if (!deleted) {
      return res.status(404).json({ message: "Standard not found" });
    }

    res.status(200).json({ message: "Standard deleted", standard: deleted });
  } catch (error) {
    console.error("Error deleting standard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addStandard,
  getAllStandard,
  editStandard,
  deleteStandard,
};
