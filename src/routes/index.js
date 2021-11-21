const express = require('express');

const userRoute = require('./user.routes');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/user',
        route: userRoute,
    },
];

defaultRoutes.forEach((x) => {
    router.use(x.path, x.route);
});

module.exports = router;
