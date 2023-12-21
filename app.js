const express = require("express");
const yaml = require("js-yaml");
const fs = require("fs");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes.js");

const app = express();

const secrets = yaml.load(fs.readFileSync("secrets.yaml", "utf8"));

const dbURI =
  `mongodb+srv://${secrets.userId}:${secrets.password}@cluster0.87knrhv.mongodb.net/node-tutorial?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
