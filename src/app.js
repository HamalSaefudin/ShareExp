const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middleware/error');
const authLimiter = require('./middleware/rate-limiter');
const routes = require('./routes');

const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

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

// limit auth request
if (config.env === 'production') {
    app.use('/v1/auth', authLimiter);
}

app.use('/v1', routes);

// send back error 404 for unknown request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});

// convert error to ApiError
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
