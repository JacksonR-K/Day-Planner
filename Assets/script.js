
$(function () {
  var currentDayEl = $('#currentDay');
  currentDayEl.text(dayjs().format('MMMM DD, YYYY')); //Set current date at the top of the page
  checkEvents(); //Generate and populate the time blocks

  function checkEvents() {
    var tense;
    var hour;
    /*
      Loop to dynamically add html elements to the page with their content/attributes set based 
      on the given hour of the day using the variables 'hour' and 'tense' as well as the current
      iteration of 'i' being the hour of the day in question
    */
    for (var i=9; i<=17; i++) {
      //Create a new date object with the hour relative to the currently generated block
      var compareHour = dayjs().hour(i);

      //Set the 'tense' based on if the current hour is before/after/current to the compareDate
      //'tense' sets the colour of the block using a css selector matching it's class name ('past', 'present', or 'future') 
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

      //Preset code to create a new element for each iteration of the loop
      //The parent div has a dynamic id set to 'hour-i' where 'i' is the current iteration
      //The parent div has a dynamic css class name based on the 'tense' variable
      //The displayed label that shows the time is set based on the 'hour' variable
      var hourlyContainer = $('<div id="hour-' + i + '" class="row time-block ' + tense + '">' +
                              '<div class="col-2 col-md-1 hour text-center py-3">' + hour + '</div>' +
                              '<textarea class="col-8 col-md-10 description" rows="3"> </textarea>' +
                              '<button class="btn saveBtn col-2 col-md-1" aria-label="save">' +
                                '<i class="fas fa-save" aria-hidden="true"></i>' +
                              '</button>' +
                            '</div>');
      var hourlyEl = $('#event-holder');
      hourlyEl.append(hourlyContainer);
    }
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
});
