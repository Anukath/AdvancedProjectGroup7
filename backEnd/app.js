const mysql = require("mysql");
const express = require("express");
// const Joi = require("joi"); //used for validation
const app = express();
app.use(express.json());

//database setup
app.use(function (req, res, next) {
  global.con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "S9841348850@s",
    database: "calorietracker",
  });
  con.connect();
  next();
});

//fetch all food items
app.get("/food/", (req, res) => {
  con.query("SELECT * from food", function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//insert food values
app.post("/food/:name/:calorie", (req, res) => {
  var sqlQuery =
    "Insert into food(name,calories) values('" +
    req.params.name +
    "'," +
    req.params.calorie +
    ")";
  con.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//fetch userActivity
app.get("/userActivity/:userId/", (req, res) => {
  con.query(
    "SELECT * from activityhistory where userid=" + req.params.userId,
    function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  );
});

//register a new user
app.post("/register/:id/:password", (req, res) => {
  var sqlQ =
    "Insert into users (createdAt,lastUpdated,userName,password) values(" +
    Date.now() +
    "," +
    Date.now() +
    ",'" +
    req.params.id +
    "','" +
    req.params.password +
    "')";
  con.query(sqlQ, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
