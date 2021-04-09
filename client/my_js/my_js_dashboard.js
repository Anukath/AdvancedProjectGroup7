// Author: Anukaran Kathuria
// This page has all the jquery for dashboard page
// This method runs when page is loaded
$(document).ready(function () {
  // donut chart for water intake
  options = {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      // Suggested approx 15 glasses
      text: "Water Intake (Approx 15 glasses/cups)",
    },
  };
  //Chart for water using api call
  $.ajax({
    // Call to backend for fetching data
    url: "http://localhost:8080/water/1",
    success: function (result) {
      var ctx = document.getElementById("donut").getContext("2d");
      var jso = JSON.parse(result);
      dataWater = {
        datasets: [
          {
            data: Object.values(jso["response"][0]),
            backgroundColor: ["#2ECC40", "#7FDBFF"],
          },
        ],
        // Setting labels
        labels: ["Drunk", "Remaining"],
      };
      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: dataWater,
        options: options,
      });
    },
  });
  // donut chart for calorie intake
  optionsChart1 = {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Calorie Intake",
    },
  };
  $.ajax({
    url: "http://localhost:8080/calorie/1",
    success: function (result) {
      var ctx = document.getElementById("donut1").getContext("2d");
      var jso = JSON.parse(result);
      // if response length is 0, then pass null, to avoid break
      dataWater = {
        datasets: [
          {
            data:
              jso["response"].length > 0
                ? Object.values(jso["response"][0])
                : null,
            backgroundColor: ["#2ECC40", "#7FDBFF"],
          },
        ],
        labels: ["Taken", "Suggested"],

        // These labels appear in the legend and in the tooltips when hovering different arcs
      };

      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: dataWater,
        options: optionsChart1,
      });
    },
  });
  // donut chart for calorie burnt/activity
  optionsChart3 = {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Calories Burnt / Activity",
    },
  };
  $.ajax({
    url: "http://localhost:8080/userActivity/1",
    dataType: "json",

    success: function (result) {
      console.log(result);
      var ctx = document.getElementById("donut2").getContext("2d");
      //var jso = JSON.parse(result);
      const data = Object.keys(result["response"]).map(
        (key) => result["response"][key].caloriesBurnt
      );
      const lab = Object.keys(result["response"]).map(
        (key) => result["response"][key].name
      );
      dataWater = {
        datasets: [
          {
            data: [...data],
            backgroundColor: [
              "#2ECC40",
              "#FF851B",
              "#7FDBFF",
              "#B10DC9",
              "#FFDC00",
              "#001f3f",
              "#39CCCC",
              "#01FF70",
              "#85144b",
              "#F012BE",
              "#3D9970",
              "#111111",
              "#AAAAAA",
            ],
          },
        ],

        labels: [...lab],

        // These labels appear in the legend and in the tooltips when hovering different arcs
      };

      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: dataWater,
        options: optionsChart3,
      });
    },
  });
  // donut chart for food intake
  optionsChart4 = {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Food Intake",
    },
  };
  $.ajax({
    url: "http://localhost:8080/foodCalorie/1",
    success: function (result) {
      var ctx = document.getElementById("donut3").getContext("2d");
      const data = Object.keys(result["response"]).map(
        (key) => result["response"][key].calories
      );
      const lab = Object.keys(result["response"]).map(
        (key) => result["response"][key].name
      );
      dataWater = {
        datasets: [
          {
            data: [...data],
            backgroundColor: [
              "#2ECC40",
              "#FF851B",
              "#7FDBFF",
              "#B10DC9",
              "#FFDC00",
              "#001f3f",
              "#39CCCC",
              "#01FF70",
              "#85144b",
              "#F012BE",
              "#3D9970",
              "#111111",
              "#AAAAAA",
            ],
          },
        ],

        labels: [...lab],

        // These labels appear in the legend and in the tooltips when hovering different arcs
      };

      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: dataWater,
        options: optionsChart4,
      });
    },
  });
  // For chart for calorie History
  $.ajax({
    url: "http://localhost:8080/calorieHistory/1",
    dataType: "json",

    success: function (result) {
      // const burntLine = Object.keys(result["response"]).map(
      //   (key) => result["response"][key].burnt
      // );
      // setting multiple lines
      const takenLine = Object.keys(result["response"]).map(
        (key) => result["response"][key].taken
      );
      const suggestedLine = Object.keys(result["response"]).map(
        (key) => result["response"][key].suggested
      );
      //creating labels from date
      const timeX = Object.keys(result["response"]).map((key) => {
        result["response"][key].time;
        c = result["response"][key].time;
        var date1 = new Date(c);
        // converting date format
        return date1.toLocaleDateString("en-CA");
      });
      //Demo data
      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [...timeX],

          datasets: [
            // {
            //   label: "Calories Burnt",
            //   data: [...burntLine],
            //   borderWidth: 1,
            //   backgroundColor: "rgba(46, 204, 64, 0.1)",
            //   fill: true,
            // },
            {
              label: "Calories taken",
              data: [...takenLine],
              borderWidth: 1,
              backgroundColor: "rgba(46, 204, 64, 0.2)",
              fill: true,
            },
            {
              label: "Suggested Calories",
              data: [...suggestedLine],
              borderWidth: 1,
              backgroundColor: "rgba(255, 220, 0, 0.2)",
              fill: true,
            },
          ],
        },
        // tilting the x axis label to an angle of 45 degree
        options: {
          scales: {
            xAxes: [
              {
                ticks: {
                  autoSkip: false,
                  maxRotation: 45,
                  minRotation: 45,
                },
              },
            ],
          },
          title: {
            display: false,
            text: "Calorie History",
          },
          maintainAspectRatio: false,
          responsive: true,
        },
      });
    },
  });
  // Setting values for the summary table
  $.ajax({
  //   url: "http://localhost:8080/userSummary/1",
  //   dataType: "json",

  //   success: function (result) {
  //     const data = Object.keys(result["response"][0]).map(
  //       (key) => result["response"][0][key]
  //     );
  //     $("#calNeeded").html(data[0] + " Cals");
  //     $("#calConsumed").html(data[1] + " Cals");
  //     $("#calLeft").html(data[2] + " Cals");
  //     $("#water").html(data[3] + " Taken");
  //     $("#burnTarget").html(data[4] + " Cals");
  //     $("#burnt").html(data[5] + " Cals");
  //   },
  // });
});
