const router = require('express').Router();
const controller = require('../controllers/home');

// middleware de autenticacion
const auth = require('../middlewares/auth');

// home router (maneja las rutas del home)
router.get('/', auth.isAuthenticated, controller.home);

module.exports = router;
