const router = require('express').Router();
const controller = require('../controllers/auth');

// middleware de autenticacion
const auth = require('../middlewares/auth');

// auth router (maneja las rutas de authenticacion)
router.get('/login', controller.login);
router.post('/login', auth.authenticate, controller.processLogin);
router.get('/logOut', controller.logOut);

module.exports = router;
