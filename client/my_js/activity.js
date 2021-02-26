    
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
    });
 
  
    
    /*
    ..... below is the form--- in case we decide to use activity post
    which I did earlier and removed------
    <form method="post" action="http://localhost:8080/activity">
    <br/>
    <br/>
    <br/>
    <label for="name_a">Activity:</label>
<select id="name_a" name="name_a"> 
<option value="running" >Running</option>
<option value="swimming">Swimming</option>
<option value="biking">Biking</option>
<option value="exercising">Exercise</option>
<option value="yoga">Yoga</option>
<option value="walking on trademill">Walking  on Trademill</option>
</select>
   
<br/>
<br/>
<br/>
<br/>




<button type="button" id="submit_act" name="submit_act" value="submit_act">
Add
</button>
</form> 

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

*/


