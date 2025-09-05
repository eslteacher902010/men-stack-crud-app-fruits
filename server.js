// server.js
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const morgan = require("morgan");

const fruitsCtrl = require("./controllers/fruits");

const app = express();
app.set("view engine", "ejs");

// Database connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(methodOverride("_method"));
app.use(morgan('dev'));
// new
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


//Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/fruits", fruitsCtrl.index);
app.get("/fruits/new", (req, res) => res.render("fruits/new.ejs"));
app.post("/fruits", fruitsCtrl.create);
app.get("/fruits/:fruitId", fruitsCtrl.showFruit);
app.get("/fruits/:fruitId/edit", fruitsCtrl.editFruit);
app.put("/fruits/:fruitId", fruitsCtrl.updateFruit);
app.delete("/fruits/:fruitId", fruitsCtrl.deleteFruit);

// Start server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
