const mysql = require("mysql");
const express = require("express");
// const Joi = require("joi"); //used for validation
const app = express();
app.use(express.json());

//Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
//database setup
app.use(function (req, res, next) {
  global.con = mysql.createConnection({
    host: "localhost",
    user: "root",
    //was  but it is working with this too password: "administrator",
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

//fetching only food name for dropdown to add food to food history------ not 
//needed now ------------------ can use the same /food/ from up
app.get("/food_dropdown/", (req, res) => {
  con.query("SELECT * from food", function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//insert food values
app.post("/food1/:name/:serving/:calories", (req, res) => {
  var sqlQuery =
    "Insert ignore into food(name, serving, calories) values('" +
    req.params.name + //insert ignore will silently drop duplicate with no error
    "','" +
    req.params.serving +
    "','" +
    req.params.calories +
    "')";
  con.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//insert activities values into activityhistory table
app.post(
  "/activityhistory/:activityId/:userId/:caloriesBurnt/:duration/:date",
  (req, res) => {
    var sqlQA =
      "Insert into activityhistory(activityId, userId, caloriesBurnt, duration, date) values('" +
      req.params.activityId +
      "','" +
      req.params.userId +
      "','" +
      req.params.caloriesBurnt +
      "','" +
      req.params.duration +
      "','" +
      req.params.date +
      "')";
    con.query(sqlQA, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    });
  }
);

//insert food information into foodhistory table
app.post(
  "/foodhistory/:userId/:foodname/:calorie/:quantity/:date",
  (req, res) => {
    var sqlQC =
      "Insert into foodhistory1(userId, foodid, quantity, date) values('" +
      req.params.userId +
      "'," +
      req.params.foodname +
      ",'" +
      
      req.params.quantity +
      "','" +
      req.params.date +
      "')";
    console.log("Here from foodhistory posting.");
    con.query(sqlQC, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    });
  }
);

//insert activities values into activity table
app.post("/activity/:name", (req, res) => {
  var sqlQ_A = "Insert ignore into activity(name) values('" + req.params.name + "')";   
  // insert ignore will silently drop the duplicates with no error
  con.query(sqlQ_A, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//fetch userActivity
// This may not be need as I have replaced charts with MS Power BI visualization
app.get("/userActivity/1/", (req, res) => {
  con.query(
    "SELECT actHis.caloriesBurnt ,act.name  from activityhistory actHis, activity act where actHis.userid= 15" +
      // 15 hard coded for now actually it has to be =" + req.params.userId +
      " and act.id=actHis.activityId",
    function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  );
});

//fetch all activities along with id and names
app.get("/activity1/", (req, res) => {
  con.query("SELECT * from activity", function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//fetch userActivity --------------- we need curdate() function later--- so keep ///it for now plz
app.get("/userActivity1/:userId/", (req, res) => {
  con.query(
    "SELECT SUM(caloriesBurnt) from activityhistory where userId = " +
      req.params.userId +
      "and date = curdate();",
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

//fetch foodActivity
app.get("/foodhistoryTable/:userId", (req, res) => {
  con.query(
    "SELECT f.name,serving,calories, quantity,(quantity*f.calories) as totalcalories from foodhistory1 his, food f where date = curdate() and userId =" +       //if we want to show all history, we need to remove curdate() cond.
      req.params.userId +
      " and his.foodId=f.id",
    function (error, results, fields) {
      if (error) throw error;
      res.send({ status: 200, error: null, response: results });
    }
  );
});
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
