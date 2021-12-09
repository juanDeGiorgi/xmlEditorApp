const router = require('express').Router();
const controller = require('../controllers/nodes');

// middleware de autenticacion
const auth = require('../middlewares/auth');
const validator = require('../middlewares/nodesValidator');

// node router (maneja las rutas de la entidad "nodes")
router.get('/create', auth.isAuthenticated, controller.create);
router.post(
  '/create',
  auth.isAuthenticated,
  validator.validationCreate,
  controller.processCreate
);

router.get('/edit', auth.isAuthenticated, controller.edit);
router.put('/edit', auth.isAuthenticated, controller.processEdit);

module.exports = router;
