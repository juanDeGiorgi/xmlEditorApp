const router = require('express').Router();
const controller = require('../controllers/auth');

/* auth routes. */
router.get('/login', controller.login);

module.exports = router;
