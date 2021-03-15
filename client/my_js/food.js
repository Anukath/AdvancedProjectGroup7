// for displaying in food intake info for today in the table in food page
$(document).ready(function () {
  //  $("#Click").click(function(){ for displaying in food intake info for today
  var foodIntaketable = $("#foodIntake").DataTable({
    ajax: {
      url: "http://localhost:8080/foodhistoryTable/1",
      dataSrc: "response",
    },
    columns: [
      { data: "name" },
      { data: "serving" },
      { data: "calories" },
      { data: "quantity" },
      { data: "totalcalories" },
      {
        data: null,
        className: "dt-center editor-edit",
        defaultContent: '<i class="fa fa-pencil"/>',
        orderable: false,
      },
      {
        data: null,
        className: "dt-center editor-delete",
        defaultContent: '<i class="fa fa-trash"/>',
        orderable: false,
      },
    ],
  });

  $("#foodIntake").on("mousedown.edit", "i.fa.fa-pencil", function (e) {
    $(this).removeClass().addClass("fa fa-check");
    var $row = $(this).closest("tr").off("mousedown");
    var $tds = $row
      .find("td")
      .not(":first")
      .not(":nth-child(2)")
      .not(":nth-child(3)")
      .not(":nth-child(5)")
      .not(":nth-last-child(2)")
      .not(":last");

    $.each($tds, function (i, el) {
      var txt = $(this).text();
      $(this)
        .html("")
        .append("<input type='text' value=\"" + txt + '">');
    });
  });
  $("#foodIntake").on("mousedown", "td .fa.fa-trash", function (e) {
    var $row = $(this).closest("tr");

    var $tds = $row
      .find("td")
      .not(":nth-child(2)")
      .not(":nth-child(3)")
      .not(":nth-child(5)")
      .not(":nth-last-child(2)")
      .not(":last");
    //add user info
    var url = "http://localhost:8080/deletefoodhistory/1";
    $.each($tds, function (i, el) {
      console.log($(this));
      var txt = $(this)[0].outerText;
      url = url + "/" + txt;
      console.log(txt);
    });

    $.ajax({
      method: "post",
      dataType: "html",
      url: url,
    });
    foodIntaketable.row($(this).closest("tr")).remove().draw();
  });
  $("#foodIntake").on("mousedown", "input", function (e) {
    e.stopPropagation();
  });
  $("#foodIntake").on("mousedown.save", "i.fa.fa-check", function (e) {
    $(this).removeClass().addClass("fa fa-pencil");
    var $row = $(this).closest("tr");
    var $tds = $row
      .find("td")
      .not(":first")
      .not(":nth-child(2)")
      .not(":nth-child(3)")
      .not(":nth-child(5)")
      .not(":nth-last-child(2)")
      .not(":last");
    //add user info
    var url = "http://localhost:8080/updatefoodhistory/1/";
    url = url + $row.find("td").first()[0].outerText;

    $.each($tds, function (i, el) {
      var txt = $(this).find("input").val();
      url = url + "/" + txt;
      $(this).html(txt);
    });
    //update the total colories taken
    $.ajax({
      method: "post",
      dataType: "html",
      url: url,
    });
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
        "http://localhost:8080/foodhistory/1/" +
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
        s +=
          '<option value="' +
          data["response"][i]["id"] +
          '"' +
          'title= "' +
          "serving: " +
          data["response"][i]["serving"] +
          " / calorie: " +
          data["response"][i]["calories"] +
          '">' +
          data["response"][i]["name"] +
          "</option>";
      }
      $("#foodDropdown").html(s);
    },
  });
});
