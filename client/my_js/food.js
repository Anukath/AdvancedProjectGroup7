//  $("#Click").click(function(){
$(document).ready(function () {
  //   $("#foodIntake").DataTable({
  //     ajax: {
  //       url: "http://localhost:8080/foodhistoryTable/1",
  //       dataSrc: "response",
  //     },
  //     columns: [
  //       { data: "name" },
  //       { data: "serving" },
  //       { data: "calories" },
  //       { data: "quantity" },
  //       { data: "totalcalories" },
  //     ],
  //   });

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
