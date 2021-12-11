const login = (req, res) => {
  return res.status(200).render('login.ejs');
};

const processLogin = (req, res) => {
  return res.redirect('/');
};

const logOut = (req, res) => {
  req.logOut();
  res.redirect('/auth/login');
};

module.exports = {
  login,
  processLogin,
  logOut,
};
