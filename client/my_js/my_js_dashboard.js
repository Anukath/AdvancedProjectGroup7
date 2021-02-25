$(document).ready(function () {
  options = {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "Water Title",
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
        labels: ["Remaining", "Drunk"],

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
      const timeX = Object.keys(result["response"]).map(
        (key) => result["response"][key].time
      );
      console.log(timeX);
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
              borderColor: "#3e95cd",
              fill: true,
            },
            {
              label: "Calories taken",
              data: [...takenLine],
              borderWidth: 1,
              borderColor: "#8e5ea2",
              fill: true,
            },
            {
              label: "Suggested Calories",
              data: [...suggestedLine],
              borderWidth: 1,
              borderColor: "#8e5ea2",
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
            text: "Calories taken per day",
          },
        },
      });
    },
  });
});
