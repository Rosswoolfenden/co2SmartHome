const { Client } = require('tplink-smarthome-api');
const logging = require("../logging/logging");
const log = logging.createLogger("smart plug connector");
const interfaces = require('os').networkInterfaces();

const client  =  new Client();
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

// todo save plugs to db
function registerPlug(plug) {
    console.log(plug.deviceId);
    plugs.push(plug);
    log.info("found plug", plug);
}

exports.getDevice = function(deviceId) {
  return plugs.find(d => d.deviceId == deviceId);
}

exports.getAllDevices = function() {
  console.log(plugs[0]);
  return plugs[0];
}

exports.turnAllPlugsOn = function (plugud) {

    log.info("turning on all plug now " + plugs.length);
    const plug = plugs[0];
    log.info("trying");
    try {
        plug.setPowerState(true);

        // todo return plug name 
        return ({Success: "Turned on inser"})
    } catch (err) {
        log.error("Error: Failed to do this cos  -- "+ err);
        return ({Error: "Failed to turn on #insert name#"})
    } 
}

// todo - sort out the repsonse 
exports.turnAllPlugsOff = function() {
    log.info("turning light off");
    const plug = plugs[0];
    try {
        plug.setPowerState(false);
    } catch (err) {
        log.error("Failed to do this ");
    }
}
 