const mysql = require("mysql");
const express = require("express");
// const Joi = require("joi"); //used for validation
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
//database setup
app.use(function (req, res, next) {
  global.con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "administrator",
    database: "calorietracker",
  });
  con.connect();
  next();
});

//fetch all food items
app.get("/food/", (req, res) => {
  con.query("SELECT * from food ", function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//fetch water Activity for user
app.get("/water/:userId", (req, res) => {
  con.query(
    "SELECT COALESCE(MAX(quantity), 0)as quantity, IFNULL(5-quantity,5) as remaining  from foodhistory a, food b  where userid=" +
      req.params.userId +
      " and a.foodId=b.id and b.name like '%water%' ",
    function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  );
});

//fetch calorie Activity for user
app.get("/calorie/:userId", (req, res) => {
  con.query(
    "SELECT taken, suggested FROM calorietracker.calorytracking where userId=" +
      req.params.userId +
      " order by time desc limit 1",
    function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  );
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
    "SELECT actHis.caloriesBurnt ,act.name  from activityhistory actHis, activity act where actHis.userid=" +
      req.params.userId +
      " and act.id=actHis.activityId",
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
app.get("/foodActivity/food/:userId", (req, res) => {
  con.query(
    "SELECT * from activityhistory where userid=" + req.params.userId,
    function (error, results, fields) {
      if (error) throw error;
      res.send({ status: 200, error: null, response: results });
    }
  );
});
//fetch foodCalorie
app.get("/foodCalorie/:userId", (req, res) => {
  con.query(
    "SELECT f.name, (quantity*f.calories) as calories from foodhistory his, food f where userId =" +
      req.params.userId +
      " and his.foodId=f.id",
    function (error, results, fields) {
      if (error) throw error;
      res.send({ status: 200, error: null, response: results });
    }
  );
});

//fetch calorieHistory
app.get("/calorieHistory/:userId", (req, res) => {
  con.query(
    "SELECT burnt,taken,suggested,time FROM calorytracking where userID= " +
      req.params.userId +
      " order by time",
    function (error, results, fields) {
      if (error) throw error;
      res.send({ status: 200, error: null, response: results });
    }
  );
});

//fetch foodActivity
app.get("/userSummary/:userId", (req, res) => {
  con.query(
    "select suggested, taken,(suggested+burnt-taken)as remaining ,CONCAT(COALESCE(MAX(quantity), 0),' / 5') as water,0 as burntTarget,burnt from calorytracking c ,  foodhistory a, food b where c.userId=" +
      req.params.userId +
      " and a.userId=c.userId and a.foodId=b.id and b.name like '%water%'",
    function (error, results, fields) {
      if (error) throw error;
      res.send({ status: 200, error: null, response: results });
    }
  );
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
