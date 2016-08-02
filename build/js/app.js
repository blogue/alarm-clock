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

},{"./../.env":1,"./../js/alarmclock.js":2}]},{},[3]);
