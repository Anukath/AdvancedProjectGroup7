    
  //The below is for adding activities for history to the database-->
  $(document).ready(function () {    //jQuery for replacing $(document).ready
        $('#submit_a').click(function (event) {
            $.ajax({
                method: 'post',
                dataType: 'html',
                url: 'http://localhost:8080/activityhistory/' +  $('#activityId').val()+ '/'+ $('#userId').val() + '/'+  $('#caloriesBurnt').val() + '/'+ $('#duration').val()  + '/'+ $('#date').val(),
            });
            // success messaage display
        alert("Activity Info Successfully added to activity history table");
        // refreshing the page 
        window.location.href=window.location.href;  
        });

        
  $("#activity1").DataTable({
    ajax: {
      url: "http://localhost:8080/activity1/",
      dataSrc: "response",
    },
    columns: [
      { data: "id" },
      { data: "name" },
     
    ],
  });
});

    // code for donut chart for calorie burnt and possibly others
    // but had issue so I replaced with MS Power BI visualization
    // Just keep it for ref in case I need it in future
    jQuery(function () {
    
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
          url: 'http://localhost:8080/userActivity/1/',
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
      }); 
  //The below is for adding activity to the database--> --- JQuery---
  //Function overriding may create problem.... last function my override previous
  // meaning I may have to write different js file for each these functions
  jQuery(function () {    //jQuery for replacing $(document).ready
    $('#submit_act').click(function (event) {
        $.ajax({
            method: 'post',
            dataType: 'html',
            url: 'http://localhost:8080/activity/' + $('#name_a').val(),
        });
        // success messaage display
        alert("Activity Successfully added to activity table");
        // refreshing the page 
        window.location.href=window.location.href;  
    });
});


