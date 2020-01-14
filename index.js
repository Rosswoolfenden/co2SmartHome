const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logging = require("./logging/logging");
const log = logging.createLogger("server");
const app = express();
const cabronRoutes = require('./routes/carbonRoutes');
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const carbon = require('./carbon/fetch');
const port = config.port;
app.use(bodyParser.json());

// carbon.getCarbonData();
app.use('/carbon', cabronRoutes);
app.use('/auth', authRoutes);
app.use('/device', deviceRoutes);

app.listen(port, () => console.log(`Carbon smart home is running on port ${port}!`));