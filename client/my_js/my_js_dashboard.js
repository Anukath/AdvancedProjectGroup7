//Demo data
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    datasets: [
      {
        label: "Calorie",
        data: [1, 23, 4, 5, 6, 3, 5, 7, 3, 36, 66, 5, 12, 19],
        borderWidth: 1,
        borderColor: "#3e95cd",
        fill: true,
      },
      {
        label: "Total Calorie",
        data: [99, 88, 44, 33, 11, 1, 2, 3, 5, 7, 8, 7, 4],
        borderWidth: 1,
        borderColor: "#8e5ea2",
        fill: true,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Calories taken per day",
    },
  },
});
data = {
  datasets: [
    {
      data: [10, 20, 30],
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: ["Red", "Yellow", "Blue"],
};

options = {
  legend: {
    display: true,
    position: "left",
  },
};
$(document).ready(function () {
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
            backgroundColor: ["#b00404", "#74ccf4"],
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

  $.ajax({
    url: "http://localhost:8080/calorie/1",
    success: function (result) {
      var ctx = document.getElementById("donut1").getContext("2d");
      var jso = JSON.parse(result);
      dataWater = {
        datasets: [
          {
            data: Object.values(jso["response"][0]),
            backgroundColor: ["#b00404", "#74ccf4"],
          },
        ],
        labels: ["Taken", "Suggested"],

        // These labels appear in the legend and in the tooltips when hovering different arcs
      };
      console.log(dataWater);

      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: dataWater,
        options: options,
      });
    },
  });

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
        options: {
          legend: {
            display: true,
            position: "left",
          },
        },
      });
    },
  });
});

var ctx = document.getElementById("donut3").getContext("2d");

var myDoughnutChart = new Chart(ctx, {
  type: "doughnut",
  data: data,
  options: options,
});
