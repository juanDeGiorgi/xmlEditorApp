const passport = require('passport');

// loggea al usuario usando la estrategia configurada
const authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('login', { error: 'Credenciales invalidas' });
    }
    return req.logIn(user, (errLogin) => {
      if (errLogin) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
};

// verifica si hay un usuario autenticado
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/auth/login');
};

module.exports = { isAuthenticated, authenticate };
