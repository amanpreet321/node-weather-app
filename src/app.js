const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

const port = process.env.PORT || 3000

const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aman",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Aman",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Aman",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Enter an address to fetch weather data",
    });
  }
  geoCode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must enter a search item",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    name: "Aman",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "My 404 page",
    name: "Aman",
  });
});

app.listen(port, () => {
  console.log("Server is up and running @"+ port);
});
