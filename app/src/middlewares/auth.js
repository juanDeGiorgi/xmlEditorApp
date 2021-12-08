const passport = require('passport');

// loggea al usuario usando la estrategia configurada
const authenticate = () => {
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
  });
};

// verifica si hay un usuario autenticado
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/auth/login');
};

module.exports = { isAuthenticated, authenticate };
