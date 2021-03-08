// for displaying in food intake info for today in the table in food page
$(document).ready(function () {
  //  $("#Click").click(function(){ for displaying in food intake info for today
    $("#foodIntake").DataTable({
      ajax: {
        url: "http://localhost:8080/foodhistoryTable/12",
        dataSrc: "response",
      },
      columns: [
        { data: "name" },
        { data: "serving" },
        { data: "calories" },
        { data: "quantity" },
        { data: "totalcalories" },
      ],
    });

    //data table for showing information about food database for ref
  $("#example").DataTable({
    ajax: {
      url: "http://localhost:8080/food",
      dataSrc: "response",
    },
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "serving" },
      { data: "calories" },
    ],
  });
});

//The below is for adding new food to the food table 
jQuery(function () {
  //jQuery for replacing $(document).ready
  $("#submit").click(function (event) {
    $.ajax({
      method: "post",
      dataType: "html",
      url:
        "http://localhost:8080/food1/" +
        $("#name").val() +
        "/" +
        $("#serving").val() +
        "/" +
        $("#calories").val(),
    });
    // success messaage display
    alert("Food Info Successfully added to food table");
    // refreshing the page
    window.location.href = window.location.href;
  });
});

//The below is for adding food info to the foodhistory table
jQuery(function () {
  //jQuery for replacing $(document).ready
  $("#submit_b").click(function (event) {
    $.ajax({
      method: "post",
      dataType: "html",
      url:
        "http://localhost:8080/foodhistory/" +
        $("#userId").val() +
        "/" +
        $("#foodDropdown").val() +
        "/" +
        $("#quantity").val() +
        "/" +
        $("#date").val(),
    });
    // success messaage display
    alert("Food Info Successfully added to foodhistory table");
    // refreshing the page
    window.location.href = window.location.href;
  });
});

// its for dropdown for food with food name displaying and serving and calorie info in title in the food page
$(document).ready(function () {  
  $.ajax({ 
      type: "GET",  
      url: "http://localhost:8080/food", 
      data: "response",  
      dataType: "json",
      success: function (data) {  
        //console.log(data["response"]); 
        var s = '<option value="-1">Please Select a Food Name</option>';  
          for (var i = 0; i < data["response"].length; i++) {  
              s += '<option value="' + data["response"][i]["id"] + '"' 
               + 'title= "'  + 'serving: ' + data["response"][i]["serving"] + ' / calorie: ' + data["response"][i]["calories"]  + '">' +  data["response"][i]["name"] 
              + '</option>';  
          }  
          //<option value="1" title="1 i.e. Running">1</option>
          $("#foodDropdown").html(s);  
      }  
  });  
});


/*  This is original save it if change doesn't work, i need it---- ref only
// its for dropdown for food
$(document).ready(function () {  
  $.ajax({ 
      type: "GET",  
      url: "http://localhost:8080/food", 
      data: "response",  
      dataType: "json",
      success: function (data) {  
        //console.log(data["response"]); 
        var s = '<option value="-1">Please Select a Food Name</option>';  
          for (var i = 0; i < data["response"].length; i++) {  
              s += '<option value="' + data["response"][i]["id"]
              + '">' + data["response"][i]["name"] + ' / ' + data["response"][i]["serving"] + ' / ' +data["response"][i]["calories"] 
              + '</option>';  
          }  
          $("#foodDropdown").html(s);  
      }  
  });  
});    */