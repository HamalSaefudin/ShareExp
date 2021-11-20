const logger = require('../config/logger');

exports.register = (req) => {
    logger.info(req);
};
