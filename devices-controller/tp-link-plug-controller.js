const { Client } = require('tplink-smarthome-api');
const logging = require("../logging/logging");
const log = logging.createLogger("smart plug connector");
const interfaces = require('os').networkInterfaces();
const { start } = require('repl');

let plugs = [];



function startDiscovery(bindAddress) {
  console.log("the caller function is " + startDiscovery.caller);
  console.log('Starting discovery on interface: ' + bindAddress);
  var client = new Client();
  client.startDiscovery({
    deviceTypes: ['plug'],
    address: bindAddress,
    discoveryTimeout: 20000
  }).on('plug-new', registerPlug);  
}

Object.keys(interfaces)
  .reduce((results, name) => results.concat(interfaces[name]), [])
  .filter((iface) => iface.family === 'IPv4' && !iface.internal)
  .map((iface) => iface.address)
  .map(startDiscovery);


function registerPlug(plug) {
    plugs.push(plug);
    log.info("found plug");
}

module.exports.getDevice = function(deviceId) {
  return plugs.find(d => d.deviceId == deviceId);
}

module.exports.getAllDevices = function() {
  return plugs;
}
