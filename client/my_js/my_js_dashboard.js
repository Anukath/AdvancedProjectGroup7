$(document).ready(function () {
  options = {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "Water",
    },
  };
  //Chart for water using api call
  $.ajax({
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
        labels: ["Drunk", "Remaining"],

        // These labels appear in the legend and in the tooltips when hovering different arcs
      };
      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: dataWater,
        options: options,
      });
    },
  });
  optionsChart1 = {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "Calorie Intake",
    },
  };
  $.ajax({
    url: "http://localhost:8080/calorie/1",
    success: function (result) {
      var ctx = document.getElementById("donut1").getContext("2d");
      var jso = JSON.parse(result);
      dataWater = {
        datasets: [
          {
            data: Object.values(jso["response"][0]),
            backgroundColor: ["#2ECC40", "#7FDBFF"],
          },
        ],
        labels: ["Taken", "Suggested"],

        // These labels appear in the legend and in the tooltips when hovering different arcs
      };
      console.log(dataWater);

      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: dataWater,
        options: optionsChart1,
      });
    },
  });
  optionsChart3 = {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "Activities",
    },
  };
  $.ajax({
    url: "http://localhost:8080/userActivity/1",
    dataType: "json",

    success: function (result) {
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
  optionsChart4 = {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "Food",
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
      console.log(dataWater);

      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: dataWater,
        options: optionsChart4,
      });
    },
  });

  $.ajax({
    url: "http://localhost:8080/calorieHistory/1",
    dataType: "json",

    success: function (result) {
      const burntLine = Object.keys(result["response"]).map(
        (key) => result["response"][key].burnt
      );
      const takenLine = Object.keys(result["response"]).map(
        (key) => result["response"][key].taken
      );
      const suggestedLine = Object.keys(result["response"]).map(
        (key) => result["response"][key].suggested
      );
      const timeX = Object.keys(result["response"]).map((key) => {
        result["response"][key].time;
        c = result["response"][key].time;
        var date1 = new Date(c);
        return date1.toLocaleDateString("en-CA");
      });
      //Demo data
      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [...timeX],

          datasets: [
            {
              label: "Calories Burnt",
              data: [...burntLine],
              borderWidth: 1,
              backgroundColor: "rgba(46, 204, 64, 0.1)",
              fill: true,
            },
            {
              label: "Calories taken",
              data: [...takenLine],
              borderWidth: 1,
              backgroundColor: "rgba(255, 133, 27, 0.1)",
              fill: true,
            },
            {
              label: "Suggested Calories",
              data: [...suggestedLine],
              borderWidth: 1,
              backgroundColor: "rgba(255, 220, 0, 0.1)",
              fill: true,
            },
          ],
        },
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
            display: true,
            text: "Calorie History",
          },
        },
      });
    },
  });

  $.ajax({
    url: "http://localhost:8080/userSummary/1",
    dataType: "json",

    success: function (result) {
      const data = Object.keys(result["response"][0]).map(
        (key) => result["response"][0][key]
      );
      $("#calNeeded").html(data[0] + " Cals");
      $("#calConsumed").html(data[1] + " Cals");
      $("#calLeft").html(data[2] + " Cals");
      $("#water").html(data[3] + " Taken");
      $("#burnTarget").html(data[4] + " Cals");
      $("#burnt").html(data[5] + " Cals");
    },
  });
});
