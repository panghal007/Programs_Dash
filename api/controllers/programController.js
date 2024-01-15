const Program = require("../models/programModel");

// const getAllPrograms = async (req, res) => {
//   try {
//     const programs = await Program.findAll();
//     res.json(programs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getAllPrograms = async (req, res) => {
  try {
    // Check if a search term is provided
    const searchTerm = req.query.search;
    console.log("Search Term:", searchTerm);

    const whereClause = searchTerm
      ? { name: { [Op.iLike]: `%${searchTerm}%` } }
      : {};
    console.log("Where Clause:", whereClause);

    const programs = await Program.findAll({ where: whereClause });
    console.log("Programs:", programs);

    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createProgram = async (req, res) => {
  try {
    console.log("Received Program Data:", req.body);

    const newProgram = await Program.create(req.body);
    res.json(newProgram);
  } catch (error) {
    console.error("Error creating program:", error);

    res.status(500).json({ message: error.message });
  }
};

const createNewProgram = async (req, res) => {
  try {
    console.log("Received Program Data:", req.body);

    const newProgram = await Program.create(req.body);
    res.json(newProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProgram = async (req, res) => {
  try {
    const updatedProgram = await Program.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProgram = async (req, res) => {
  try {
    await Program.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  createNewProgram,
};
