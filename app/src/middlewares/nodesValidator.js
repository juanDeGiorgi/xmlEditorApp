const { check, validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('createForm', { errors: errors.mapped() });
  }
  next();
};

const validationCreate = [
  check('name', 'el nombre es obligatorio').notEmpty(),
  check(
    'name',
    'el nombre no puede contener caracteres especiales'
  ).isAlphanumeric('en-US', { ignore: '´' }),

  check('OBJName', 'el nombre del archivo es obligatorio').notEmpty(),

  check('Scale', 'la escala es obligatoria').notEmpty(),
  check('Scale', 'la escala tiene que ser decimal').isDecimal({
    force_decimal: true,
  }),

  validateFields,
];

module.exports = {
  validationCreate,
  validateFields,
};