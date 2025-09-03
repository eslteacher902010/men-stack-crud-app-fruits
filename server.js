const dotenv = require("dotenv"); 
dotenv.config(); 

const express = require("express");
const mongoose = require("mongoose");

const Fruit = require("./models/fruit.js");


const app = express();              // <-- create app first order matters
app.set("view engine", "ejs");      // <-- then set view engine

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));


// app.get("/", async (req, res) => {
//   res.send("hello, fruitcake!");
//   // if you want to render instead, remove res.send:
//   // res.render("index");
// });

app.get("/", (req, res) => {
  res.render("index");
});


// GET /fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: allFruits });
});


app.get("/fruits/new", (req, res) => {
  res.render("fruits/new"); // don't need ".ejs"
});

// server.js

// POST /fruits
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits"); // redirect to index fruits
});

///// or you could use a ternary operator !
// req.body.readyToEat === 'on' ? req.body.readyToEat = true : req.body.readyToEat = false;

// await Fruit.create(req.body);
// res.redirect('/fruits/new');



app.listen(3000, () => {
  console.log("Listening on port 3000");
});
