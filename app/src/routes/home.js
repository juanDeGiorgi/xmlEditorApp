const router = require('express').Router();
const controller = require('../controllers/home');

router.get('/', controller.home);

module.exports = router;
