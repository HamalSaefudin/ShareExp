const express = require('express');

const authRoute = require('./auth.routes');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
];

defaultRoutes.forEach((x) => {
    router.use(x.path, x.route);
});

module.exports = router;
