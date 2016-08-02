(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "ee22cb1cdc25dc397aef5ca0db957c87";

},{}],2:[function(require,module,exports){
function Alarm() {
  this.alarms = [];
}

Alarm.prototype.addAlarm = function(newAlarm) {
  this.alarms.push(newAlarm);
};

Alarm.prototype.checkAlarm = function(currentTime) {
  debugger;
  this.alarms.forEach(
    function checkAlarms(alarm) {
    if(currentTime === alarm) {
      return true;
    }
    else {
      return false;
    }
  }
);

};

exports.alarmclockModule = Alarm;

},{}],3:[function(require,module,exports){
function City(name, temp)
{
  this.cityname = name;
  this.temp = temp;
}

exports.cityModule = City;

},{}],4:[function(require,module,exports){
function Temperature()
{
  this.citytemp = [];
}

Temperature.prototype.toFahrenheit = function(kelvin){
  var fahrenheit = (kelvin * 9/5) - 459.67;
  return fahrenheit;
};

Temperature.prototype.toCelcius = function(kelvin){
  var celcius = kelvin - 273.15;
  return celcius;
};

exports.temperatureModule = Temperature;

},{}],5:[function(require,module,exports){
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

},{"./../.env":1,"./../js/alarmclock.js":2,"./../js/city.js":3,"./../js/temperature.js":4}]},{},[5]);
