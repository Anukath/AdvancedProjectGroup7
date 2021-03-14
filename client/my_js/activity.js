//adding activities to activity history table
$(document).ready(function () {
  //jQuery for replacing $(document).ready
  $("#submit_a").click(function (event) {
    $.ajax({
      method: "post",
      dataType: "html",
      url:
        "http://localhost:8080/activityhistory/1/" +
        $("#activityDropdown").val() +
        "/" +
        $("#caloriesBurnt").val() +
        "/" +
        $("#duration").val() +
        "/" +
        $("#date").val(),
    });
    // success messaage display
    alert("Activity Info Successfully deleted from activity history table");

    // refreshing the page
    window.location.href = window.location.href;
  });
  // deleting activity from activity history
  $("#submit_del").click(function (event) {
    $.ajax({
      method: "post",
      dataType: "html",
      url:
        "http://localhost:8080/deleteactivities/" +
        $("#activityDropdown_del").val() +
        "/" +
        $("#caloriesBurnt_del").val() +
        "/" +
        $("#duration_del").val() +
        "/" +
        $("#date_del").val(),
    });
    // success messaage display
    alert("Activity Info Successfully deleted from activity history table");
    // refreshing the page
    window.location.href = window.location.href;
  });

  // updating activity info in activity history
  $("#submit_update").click(function (event) {
    $.ajax({
      method: "post",
      dataType: "html",
      url:
        "http://localhost:8080/updateactivityhistory/" +
        $("#activityDropdown_update").val() +
        "/" +
        $("#caloriesBurnt_update").val() +
        "/" +
        $("#duration_update").val() +
        "/" +
        $("#date_update").val(),
    });
    // success messaage display
    alert("Activity Info Successfully updated in activity history table");
    // refreshing the page
    window.location.href = window.location.href;
  });

  // activity datatable for displaying in activity page
  $("#activity1").DataTable({
    ajax: {
      url: "http://localhost:8080/activity1/",
      dataSrc: "response",
    },
    columns: [{ data: "id" }, { data: "name" }],
  });

  // current activities to be displayed on table for info
  var userActivityTable = $("#userActivity").DataTable({
    ajax: {
      url: "http://localhost:8080/userActivityTable/1",
      dataSrc: "response",
    },
    columns: [
      { data: "name" },
      { data: "caloriesBurnt" },
      { data: "duration" },
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

  $("#userActivity").on("mousedown.edit", "i.fa.fa-pencil", function (e) {
    $(this).removeClass().addClass("fa fa-check");
    var $row = $(this).closest("tr").off("mousedown");
    var $tds = $row.find("td").not(":nth-last-child(2)").not(":last");

    $.each($tds, function (i, el) {
      var txt = $(this).text();
      $(this)
        .html("")
        .append("<input type='text' value=\"" + txt + '">');
    });
  });
  $("#userActivity").on("mousedown", "td .fa.fa-trash", function (e) {
    var $row = $(this).closest("tr");

    var $tds = $row.find("td").not(":nth-last-child(2)").not(":last");

    //add user info
    var url = "http://localhost:8080/deleteactivities/1";

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
    userActivityTable.row($(this).closest("tr")).remove().draw();
  });
  $("#userActivity").on("mousedown", "input", function (e) {
    e.stopPropagation();
  });
  $("#userActivity").on("mousedown.save", "i.fa.fa-check", function (e) {
    $(this).removeClass().addClass("fa fa-pencil");
    var $row = $(this).closest("tr");
    var $tds = $row.find("td").not(":nth-last-child(2)").not(":last");
    //add user info
    var url = "http://localhost:8080/updateactivityhistory/1";

    $.each($tds, function (i, el) {
      var txt = $(this).find("input").val();
      url = url + "/" + txt;
      $(this).html(txt);
    });

    $.ajax({
      method: "post",
      dataType: "html",
      url: url,
    });
    toastr["error"]("Are you the six fingered man?");
    toastr["success"]("Are you the six fingered man?");
  });
});
//Adding new activity to the activity table
jQuery(function () {
  //jQuery for replacing $(document).ready

  $("#submit_act").click(function (event) {
    $.ajax({
      method: "post",
      dataType: "html",
      url: "http://localhost:8080/activity/" + $("#name_a").val(),
    });
    // success messaage display
    alert("Activity Successfully added to activity table");
    // refreshing the page
    window.location.href = window.location.href;
  });
});

// tabs in food and activities pages
function openInfo(evt, Name) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(Name).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// its for dropdown for activity with name displaying to make user easy adding activity to act hitory
$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/activity1",
    data: "response",
    dataType: "json",
    success: function (data) {
      //console.log(data["response"]);
      var s = '<option value="-1">Please Select an Activity Name</option>';
      for (var i = 0; i < data["response"].length; i++) {
        s +=
          '<option value="' +
          data["response"][i]["id"] +
          '">' +
          data["response"][i]["name"] +
          "</option>";
      }
      $("#activityDropdown").html(s);
    },
  });
  // its for dropdown for activity with name displaying to make user easy deleting activity from Activity hitory
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/activity1",
    data: "response",
    dataType: "json",
    success: function (data) {
      //console.log(data["response"]);
      var s = '<option value="-1">Please Select an Activity Name</option>';
      for (var i = 0; i < data["response"].length; i++) {
        s +=
          '<option value="' +
          data["response"][i]["id"] +
          '">' +
          data["response"][i]["name"] +
          "</option>";
      }
      $("#activityDropdown_del").html(s);
    },
  });

  // its for dropdown for activity with name displaying to make user easy updating activity info in Activity hitory
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/activity1",
    data: "response",
    dataType: "json",
    success: function (data) {
      //console.log(data["response"]);
      var s = '<option value="-1">Please Select an Activity Name</option>';
      for (var i = 0; i < data["response"].length; i++) {
        s +=
          '<option value="' +
          data["response"][i]["id"] +
          '">' +
          data["response"][i]["name"] +
          "</option>";
      }
      $("#activityDropdown_update").html(s);
    },
  });
});
