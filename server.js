/* Module dependecies */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

/* Custom module */
const config = require('./config/secret');

/* Instance of express / create express server */
const app = express();

mongoose.connect(config.database, function(err) {
  if (err) {
    console.log("Error connected");
  } else {
    console.log("Connected to the database");
  }
});

/* Middleware */
app.use(morgan('dev')); // Set to dev for debugging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mainRoute = require('./routes/api');

/* App routes */
app.use('/api', mainRoute);

app.listen(config.port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running on port ${config.port}`);
  }
});