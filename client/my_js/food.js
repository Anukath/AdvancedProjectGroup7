// Author: Tek,Anukaran Kathuria

// for displaying in food intake info for today in the table in food page with edit and delete options
$(document).ready(function () {
  //  $("#Click").click(function(){ for displaying in food intake info for today
  //converting foodIntake table to datatable
  var foodIntaketable = $("#foodIntake").DataTable({
    // using ajax call to fetech data from database
    ajax: {
      url: "http://localhost:8080/foodhistoryTable/1",
      dataSrc: "response",
    },
    // the columns in table
    columns: [
      { data: "name" },
      { data: "serving" },
      { data: "calories" },
      { data: "quantity" },
      { data: "totalcalories" },
      // adding extra edit and update column
      {
        data: null,
        className: "dt-center editor-edit",
        defaultContent: '<i class="fa fa-pencil"/>',
        orderable: false,
      },
      // adding extra edit and update column
      {
        data: null,
        className: "dt-center editor-delete",
        defaultContent: '<i class="fa fa-trash"/>',
        orderable: false,
      },
    ],
  });

  // Functionality for edit button
  $("#foodIntake").on("mousedown.edit", "i.fa.fa-pencil", function (e) {
    // Replace icon
    $(this).removeClass().addClass("fa fa-check");
    var $row = $(this).closest("tr").off("mousedown");
    // fetching columns to update
    var $tds = $row
      .find("td")
      .not(":first")
      .not(":nth-child(2)")
      .not(":nth-child(3)")
      .not(":nth-child(5)")
      .not(":nth-last-child(2)")
      .not(":last");
    // convert the editable columns to input box
    $.each($tds, function (i, el) {
      var txt = $(this).text();
      $(this)
        .html("")
        .append("<input type='text' value=\"" + txt + '">');
    });
  });
  // delete functionality for the table
  $("#foodIntake").on("mousedown", "td .fa.fa-trash", function (e) {
    var $row = $(this).closest("tr");
    // fethcinh columns to update
    var $tds = $row
      .find("td")
      .not(":nth-child(2)")
      .not(":nth-child(3)")
      .not(":nth-child(5)")
      .not(":nth-last-child(2)")
      .not(":last");
    //delete data
    var url = "http://localhost:8080/deletefoodhistory/1";
    $.each($tds, function (i, el) {
      var txt = $(this)[0].outerText;
      url = url + "/" + txt;
    });
    // api call to delte data
    $.ajax({
      method: "post",
      dataType: "html",
      url: url,
    });
    // redraw the table
    foodIntaketable.row($(this).closest("tr")).remove().draw();
  });

  $("#foodIntake").on("mousedown", "input", function (e) {
    e.stopPropagation();
  });
  // saving changes functionality
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
    //setting url
    var url = "http://localhost:8080/updatefoodhistory/1/";
    url = url + $row.find("td").first()[0].outerText;

    $.each($tds, function (i, el) {
      var txt = $(this).find("input").val();
      url = url + "/" + txt;

      $(this).html(txt);
      //calculate the total calories burnt
      $row
        .find("td:nth-child(5)")
        .html(
          $row.find("td:nth-child(4)").last()[0].outerText *
            $row.find("td:nth-child(3)").last()[0].outerText
        );
    });

    //update the total colories taken
    $.ajax({
      method: "post",
      dataType: "html",
      url: url,
    });
    // refreshing the page--- so that the change can be seen but it will go to main page-------- not sure good idea to do or not-- please remove if needed
    window.location.href = window.location.href;
  });

  //data table for showing information about food database for ref
  $("#example").DataTable({
    ajax: {
      url: "http://localhost:8080/food",
      dataSrc: "response",
    },
    columns: [{ data: "name" }, { data: "serving" }, { data: "calories" }],
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

/*  var bool = $("#date").val();
    if (bool == NULL)
    { today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //As January is 0.
      var yyyy = today.getFullYear();
      if(dd<10) dd='0'+dd;
      if(mm<10) mm='0'+mm;
      sp = '-';
      bool = (yyyy+sp+mm+sp+mm);
      $("#date").val() = bool
    }   not sure this is the way or not */

// its for dropdown for food with food name displaying and serving and calorie info in title in the food page
$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/food",
    data: "response",
    dataType: "json",
    success: function (data) {
      //console.log(data["response"]);
      // adding options in dropdown for listing food items
      var s =
        '<option value="-1">Please Select Food that you would like to add to the food history</option>';
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
