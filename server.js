const dotenv = require("dotenv"); 
dotenv.config(); 

const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // <-- put this back

const methodOverride = require("method-override");
const morgan = require("morgan");

const Fruit = require("./models/fruit.js");

const app = express();
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// serve static files like CSS/images
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

// INDEX
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index", { fruits: allFruits });
});

// NEW
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new");
});

// SHOW
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show", { fruit: foundFruit });
});

// CREATE
app.post("/fruits", async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === "on";
  await Fruit.create(req.body);
  res.redirect("/fruits");
});

// DELETE
app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

// EDIT
app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit", { fruit: foundFruit });
});

// UPDATE
app.put("/fruits/:fruitId", async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === "on";
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  res.redirect(`/fruits/${req.params.fruitId}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
