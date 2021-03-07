

//  $("#Click").click(function(){
$(document).ready(function () {
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

//The below is for adding new food to the database-->
//Function overriding may create problem.... last function my override previous
// meaning I may have to write different js file for each these functions
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

//The below is for adding food info to the foodhistory table-->
//Function overriding may create problem.... last function my override previous
// meaning I may have to write different js file for each these functions
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
        $("#foodname").val() +
        "/" +
        $("#calorie").val() +
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
});

// for the tabs in food and activities page
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();