const router = require('express').Router();
const controller = require('../controllers/nodes');

// middleware de autenticacion
const auth = require('../middlewares/auth');

// node router (maneja las rutas de la entidad "nodes")
router.get('/create', auth.isAuthenticated, controller.create);
router.post('/create', auth.isAuthenticated, controller.processCreate);

router.get('/edit', auth.isAuthenticated, controller.edit);
router.put('/edit', auth.isAuthenticated, controller.processEdit);

module.exports = router;
