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
