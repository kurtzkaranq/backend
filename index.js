const fs = require("fs");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.get("/ejs", (req, res) => {
  res.render("index", { message: "Erkhes" });
});
app.get("/404", (req, res) => {
  res.render("404", { message: "oopsie" });
});
app.get("/js", (req, res) => {
  let data = {
    name: "John",
    hobbies: ["reading manga", "watching anime"],
  };
  res.render("js", { data: data });
});
app.get("/foods", (req, res) => {
  const images = {
    cinnamon:
      "https://www.cookingclassy.com/wp-content/uploads/2020/09/mini-cinnamon-rolls-21.jpg",
    donuts:
      "https://www.blessthismessplease.com/wp-content/uploads/2017/10/Old-fashioned-Donuts-25.jpg",
    pie: "https://www.thespruceeats.com/thmb/cro9EKoXGnuv3c5ui3kvSStMj6M=/3667x3667/smart/filters:no_upscale()/autumn-pumpkin-pie-3059962-hero-01-1e1571b6f48049fe853bce541a0d85e0.jpg",
  };
  res.render("foods", { data: images });
});
app.get("/", (request, response) => {
  console.log(process.env.PORT);
  fs.readFile("./models/models.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading");
    } else {
      response.send(JSON.parse(data));
    }
  });
});
app.listen(3000);
