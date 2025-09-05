// controllers/fruits.js
const Fruit = require("../models/fruit");

// INDEX
const index = async (req, res) => {
  const foundFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: foundFruits });
};

// SHOW
const showFruit = async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
};

// CREATE
const create = async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === "on";
  await Fruit.create(req.body);
  res.redirect("/fruits");
};

// DELETE
const deleteFruit = async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
};

// EDIT (show edit form)
const editFruit = async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", { fruit: foundFruit });
};

// UPDATE (process form)
const updateFruit = async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === "on";
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  res.redirect(`/fruits/${req.params.fruitId}`);
};

module.exports = {
  index,
  showFruit,
  create,
  deleteFruit,
  editFruit,
  updateFruit,
};
