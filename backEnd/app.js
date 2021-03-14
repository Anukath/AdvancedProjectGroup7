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
    //was  but it is working with this too
    //password: "S9841348850@s",
    password: "administrator",
    database: "calorietracker",
  });
  con.connect();
  next();
});

//fetch all food items
app.get("/food/", (req, res) => {
  con.query(
    "SELECT * from food ORDER BY name ASC",
    function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  );
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
//insert activities values into activityhistory table
app.post(
  "/activityhistory/:userId/:activityId/:caloriesBurnt/:duration/:date",
  (req, res) => {
    var sqlQA =
      "Insert into activityhistory(activityId, userId, caloriesBurnt, duration, date) values('" +
      req.params.activityId +
      "', '" +
      req.params.userId +
      "', '" +
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

//deleting activities from activityhistory table
app.post(
  "/deleteactivities/:userId/:activityId/:caloriesBurnt/:duration",
  (req, res) => {
    var sqlQdel =
      "DELETE activityhistory FROM activityhistory Inner join activity on activity.id=activityhistory.activityId where activity.name = '" +
      req.params.activityId +
      "' and caloriesBurnt ='" +
      req.params.caloriesBurnt +
      "' and duration = '" +
      req.params.duration +
      "' and activityhistory.userId= '" +
      req.params.userId +
      "' and date = curdate() ";
    console.log(sqlQdel);
    con.query(sqlQdel, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    });
  }
);

//upadating activityhistory table
app.post(
  "/updateactivityhistory/:userId/:activityId/:caloriesBurnt/:duration",
  (req, res) => {
    var sqlQupdate =
      "Update activityhistory Inner join activity on activity.id=activityhistory.activityId set caloriesBurnt = '" +
      req.params.caloriesBurnt +
      "' , " +
      " duration = '" +
      req.params.duration +
      "' where activity.name = '" +
      req.params.activityId +
      "' and activityhistory.userId= '" +
      req.params.userId +
      "' and date = curdate()";

    con.query(sqlQupdate, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    });
  }
);

//insert food information into foodhistory table
// app.post(
//   "/foodhistory/:foodId/:quantity/:date",
//   (req, res) => {
//     var sqlQC =
//       "Insert into foodhistory(userId, foodId, quantity, date) values('12', '" +
//       req.params.foodId + "', '" +
//       req.params.quantity +
//       "', '" +
//       req.params.date +
//       "')";
//     //console.log("Hi from foodhistory posting for testing");
//     con.query(sqlQC, function (error, results, fields) {
//       if (error) throw error;
//       res.send(JSON.stringify({ status: 200, error: null, response: results }));
//     });
//   }
// );
//insert food information into foodhistory table--- its not inserting ???
// no error but not doing????
app.post("/foodhistory/:userId/:foodId/:quantity/:date", (req, res) => {
  var sqlQC =
    "Insert into foodhistory(userId, foodId, quantity, date) values('" +
    req.params.userId +
    "','" +
    req.params.foodId +
    "','" +
    req.params.quantity +
    "','" +
    req.params.date +
    "')";
  //console.log("Hi from foodhistory posting for testing");
  con.query(sqlQC, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//insert activities values into activity table
app.post("/activity/:name", (req, res) => {
  var sqlQ_A =
    "Insert ignore into activity(name) values('" + req.params.name + "')";
  // insert ignore will silently drop the duplicates with no error
  con.query(sqlQ_A, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//fetch all activities along with id and names
app.get("/activity1/", (req, res) => {
  con.query(
    "SELECT * from activity ORDER BY name ASC",
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

//fetch userActivity
app.get("/userActivityTable/:userId", (req, res) => {
  con.query(
    "SELECT act.name, caloriesBurnt , duration from activityhistory actHis, activity act where date = curdate() and userId =" +
      req.params.userId +
      " and actHis.activityId = act.id ORDER BY act.name ASC",
    function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
    }
  );
});

//fetch food info from Foodhistory  table for current (today)
app.get("/foodhistoryTable/:userId", (req, res) => {
  con.query(
    "SELECT f.name,serving,calories, quantity,(quantity*f.calories) as totalcalories from foodhistory his, food f where date = curdate() and userId =" + //if we want to show all history, we need to remove curdate() cond.
      req.params.userId +
      " and his.foodId=f.id ORDER BY f.name ASC",
    function (error, results, fields) {
      if (error) throw error;
      res.send({ status: 200, error: null, response: results });
    }
  );
});

//upadating foodhistory table
app.post("/updatefoodhistory/:userId/:foodName/:quantity", (req, res) => {
  var sqlQupdate =
    "Update foodhistory Inner join food on food.id=foodhistory.foodId set quantity = '" +
    req.params.quantity +
    "' where food.name = '" +
    req.params.foodName +
    "' and foodhistory.userId= '" +
    req.params.userId +
    "' and date = curdate()";

  con.query(sqlQupdate, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//delete foodhistory table
app.post("/deletefoodhistory/:userId/:foodName/:quantity", (req, res) => {
  var sqlQupdate =
    "Delete foodhistory from foodhistory Inner join food on food.id=foodhistory.foodId where quantity = '" +
    req.params.quantity +
    "' and food.name = '" +
    req.params.foodName +
    "' and foodhistory.userId= '" +
    req.params.userId +
    "' and date = curdate()";

  con.query(sqlQupdate, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
