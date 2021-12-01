const express = require('express');

const userRoute = require('./user.routes');
const authRoute = require('./auth.routes');
const authorRoute = require('./author.routes');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/author',
        route: authorRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
