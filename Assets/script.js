
$(function () {
  //Set current date at the top of the page
  var currentDayEl = $('#currentDay');
  currentDayEl.text(dayjs().format('MMMM DD, YYYY')); 

  //Select the div that will hold the time blocks
  var hourlyEl = $('#event-holder');
  //Generate and populate the time blocks
  checkEvents(); 

  hourlyEl.on('click', '.saveBtn', saveText);

  function checkEvents() {
    var tense;
    var hour;
    
    //Loop to dynamically add html elements for each time block in hourly increments from 9-5
    for (var i=9; i<=17; i++) {
      //Create a new date object with the hour relative to the time block created in the current iteration of the loop
      var compareHour = dayjs().hour(i);

      //Compare user's current time to 'compareHour' and set the 'tense' variable to the result
      if (dayjs().isAfter(compareHour)){
        tense = "past";
      }
      else if (dayjs().isSame(compareHour)){
        tense = "present";
      }
      else if (dayjs().isBefore(compareHour)){
        tense = "future";
      }

      //Show the displayed time as 12HR format (so 13pm is shown as 1pm)
      if (i > 12) {
        hour = i - 12 + "PM";
      }
      else {
        hour = i + "AM";
      }

      //Create a new group of elements for each iteration of the loop to make a time block for that hour
      //The parent div has a dynamic id set to 'hour-i' where 'i' is the current iteration
      //The parent div has a dynamic css class name based on the 'tense' variable which sets the colour of the block
      //The displayed label that shows the time is set based on the 'hour' variable
      var hourlyContainer = $('<div id="hour-' + i + '" class="row time-block ' + tense + '">' +
                              '<div class="col-2 col-md-1 hour text-center py-3">' + hour + '</div>' +
                              '<textarea class="col-8 col-md-10 description" rows="3"> </textarea>' +
                              '<button class="btn saveBtn col-2 col-md-1" aria-label="save">' +
                                '<i class="fas fa-save" aria-hidden="true"></i>' +
                              '</button>' +
                            '</div>');
      hourlyEl.append(hourlyContainer);
      //If any event exists in storage, it's added to the appropriate time block in the textarea element
      if (localStorage.getItem('hour-' + i) !== null){
        hourlyEl.children('#hour-' + i).children('textarea').text(localStorage.getItem('hour-' + i));
      }
    }
  }

  //Checks which save button was clicked and saves the text to local storage with the key value
  //being the time block's id value
  function saveText(event) {
    var btnClicked = $(event.target).parent();
    var key = btnClicked.attr('id');
    var value = btnClicked.children('textarea').val();
    localStorage.setItem(key, value);
  }
});


