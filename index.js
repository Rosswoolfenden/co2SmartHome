const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logging = require("./logging/logging");
const log = logging.createLogger("server");
const app = express();
const routes = require('./routes/authRoutes');
const port = config.port;
app.use(bodyParser.json());

app.use('/', routes);
app.listen(port, () => console.log(`Carbon smart home is running on port ${port}!`));