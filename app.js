// Full Documentation - https://docs.turbo360.co
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const express = require("express");

const app = express(); // initialize app

const config = {
  views: "views", // Set views directory
  static: "public", // Set static assets directory
  logging: true,
  // controllers: require('./controllers'), 	// required for CMS integration
  db: {
    url: "mongodb://localhost/mongo-prj",
    type: "mongo",
    onError: (err) => {
      console.log("DB Connection Failed!");
    },
    onSuccess: () => {
      console.log("DB Successfully Connected!");
    },
  },
};

vertex.configureApp(app, config); // to use config settings, remove line 23 below and replace with this

vertex.configureApp(app);
app.use(vertex.setContext(process.env));

// import routes
const index = require("./routes/index");
const api = require("./routes/api"); // sample API Routes

// set routes
app.use("/", index);
app.use("/api", api); // sample API Routes

module.exports = app;
