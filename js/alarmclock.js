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
