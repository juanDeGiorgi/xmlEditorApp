const router = require('express').Router();

const authRouter = require('./auth');
const homeRouter = require('./home');
const nodesRouter = require('./nodes');

// global router (maneja todas las rutas de la app)
router.use('/', homeRouter);
router.use('/auth', authRouter);
router.use('/nodes', nodesRouter);

module.exports = router;
