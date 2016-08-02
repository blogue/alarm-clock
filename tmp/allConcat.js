var Alarm = require("./../js/alarmclock.js").alarmclockModule;

$(document).ready(function(){
  var newAlarm = new Alarm();
  var alarmSound = new Audio("alarm.mp3");
  alarmSound.loop = true;
  var displayTime = setInterval(function(){$('#time').text("Current Time: " + moment().format("hh:mma"));}, 1000);

  $("#alarm-clock-form").submit(function(event){
    event.preventDefault();
    var userTime = $("#user-time").val();
    newAlarm.addAlarm(userTime);
    $("#alarms").append("<li>"+ userTime + "</li>");
  });

  $("#on-button").click(function(){
    var alarm = setInterval(function(){
      if(newAlarm.checkAlarm(moment().format("HH:mm")))
      {
        alarmSound.play();
        clearInterval(alarm);
      }
    }, 1000);
  });

  $("#off-button").click(function(event){
    event.preventDefault();
    alarmSound.pause();
  });

  $("#snooze").click(function(event){
    event.preventDefault();
    alarmSound.pause();
    var snooze = setTimeout(function(){
      alarmSound.play();
    }, 5000);
  });
});

var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("The city you have chosen is " + city + ".");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
      $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%");
    }).fail(function(error){
      $('.showWeather').text(error.responseJSON.message);
    });
  });
});
