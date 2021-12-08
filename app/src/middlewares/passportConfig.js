const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// modulo de configuracion de pasport
const passportConfig = () => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      if (username === 'test' && password === 'test2021') {
        return done(null, { id: '1', userName: 'test' });
      }
      return done(null, false);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    return done(null, { id: '1', userName: 'test' });
  });
};

module.exports = passportConfig;
