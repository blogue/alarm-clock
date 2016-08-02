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
var Temperature = require("./../js/temperature.js").temperatureModule;
var City = require("./../js/city.js").cityModule;

$(document).ready(function() {
  var newTemperature = new Temperature();

  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("The city you have chosen is " + city + ".");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
      $('.showWeather').html("The humidity in " + city + " is " + response.main.humidity + "%" + "<br>");
      $('#celcius').html("The temperature in celcius in " + city + " is " + newTemperature.toCelcius(response.main.temp) + "<br>");
      $('#kelvin').html("The temperature in kelvin in " + city + " is " + response.main.temp + "<br>");
      $('#fahrenheit').html("The temperature in fahrenheit in " + city + " is " + newTemperature.toFahrenheit(response.main.temp) + "<br>");
      var newCity = new City(city, newTemperature.toFahrenheit(response.main.temp));
      newTemperature.citytemp.push(newCity);
      console.log(newCity);
      console.log(newTemperature.citytemp);
    }).fail(function(error){
      $('.showWeather').html("<p>" + error.responseJSON.message + "</p>");
    });
  });
});
