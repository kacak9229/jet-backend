/* Module dependecies */
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const cors = require('cors');

/* Custom module */
const config = require('./src/config/secret');

/* Instance of express / create express server */
const app = express();

/* Connect to the database */
mongoose.connect(config.database, {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.log("Error connected");
  } else {
    console.log("Connected to the database");
  }
});

/* Middleware */
app.use(helmet());
app.use(cors());
app.use(logger('dev')); // Set to dev for debugging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



const mainRoute = require('./src/routes/api');

/* App routes */
app.use('/api', mainRoute);

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running on port ${config.port}`);
  }
});