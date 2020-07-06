const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const logging = require("./logging/logging");
const log = logging.createLogger("server");
const app = express();
const cabronRoutes = require('./routes/carbonRoutes');
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const carbon = require('./carbon/addLatest');
const forescat = require('./carbon/addForecast');
const port = config.port;
app.use(bodyParser.json());


//test
// Connect to mongo with retry incase of failure. 
const connectWithRetry = function () {
  log.info('Connected to MongoDB ' + config.mongoURL);  
  return mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if (err) {
      log.error('Failed to connect to co2 db, trying again in 10 seconds');
      setTimeout(connectWithRetry, 10000);
    }
  });
};
connectWithRetry();

// todo Add functions to call to add the carbondata

setInterval(function() {
  //const zones = config.zones;
  //zones.forEach(zone => {
    log.info('calling for real data ');
    //const auto = true;
    //addForecast(zone);
    carbon.addCarbonData();

  //});
}, 1800000/2);

setInterval(function() {
  log.info("Calling for forecasted data")
  forescat.addForecast();
  
}, 1800000/2);


// carbon.getCarbonData();
app.use('/carbon', cabronRoutes);
app.use('/auth', authRoutes);
app.use('/device', deviceRoutes);

app.listen(port, () => console.log(`Carbon smart home is running on port ${port}!`));