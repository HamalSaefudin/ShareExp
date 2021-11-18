const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');

const app = express();

// secure http headers
app.use(helmet());

// parse req.body json
app.use(express.json());

// parse url encoded req.body
app.use(express.urlencoded({ extended: true }));

// sanitize req data (security purpose)
app.use(xss());
app.use(mongoSanitize());

// compress data user access
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

module.exports = app;
