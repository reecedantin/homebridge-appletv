var Service;
var Characteristic;

var net = require('net');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-appletv", "appletv", AppleTVAccessory);
}

function AppleTVAccessory(log, config) {
  this.log = log;
  this.service = 'Switch';

  this.name          = config['name'];
  this.host          = config['host'];
  this.port          = config['port'];
}


AppleTVAccessory.prototype.setState = function(powerOn, callback) {
  var accessory = this;
  var state = powerOn ? 'on' : 'off';

  http.get('http://'+ accessory.host + ':3689/login?pairing-guid=0&hasFP=1', (res) => {});

}

AppleTVAccessory.prototype.getState = function(callback) {
  callback(null, false);
}

AppleTVAccessory.prototype.getServices = function() {
  var informationService = new Service.AccessoryInformation();
  var switchService = new Service.Switch(this.name);

  informationService
  .setCharacteristic(Characteristic.Manufacturer, 'AppleTV Manufacturer')
  .setCharacteristic(Characteristic.Model, 'AppleTV Model')
  .setCharacteristic(Characteristic.SerialNumber, 'AppleTV Serial Number');

  var characteristic = switchService.getCharacteristic(Characteristic.On)
  .on('set', this.setState.bind(this));

  if (this.stateCommand) {
    characteristic.on('get', this.getState.bind(this))
  };

  return [switchService];
}
