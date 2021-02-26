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
app.post("/food1/:name/:serving/:calories", (req, res) => {
  var sqlQuery =
    "Insert into food(name, serving, calories) values('" +
    req.params.name +
    "','" + req.params.serving + "','" +
    req.params.calories +
    "')";
  con.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//insert activities values into activityhistory table 
app.post("/activityhistory/:activityId/:userId/:caloriesBurnt/:duration/:date", (req, res) => {
  var sqlQA =
    "Insert into activityhistory(activityId, userId, caloriesBurnt, duration, date) values('" + req.params.activityId + "','" +
    req.params.userId +
    "','" + req.params.caloriesBurnt + "','" +
    req.params.duration + "','" + req.params.date +
    "')";
  con.query(sqlQA, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//insert activities values into activity table--- just used once
app.post("/activity/:name", (req, res) => {
  var sqlQ_A =
    "Insert into activity(name) values('" + req.params.name +
    "')";
  con.query(sqlQ_A, function (error, results, fields) {
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
