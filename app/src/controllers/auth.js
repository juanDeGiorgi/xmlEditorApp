const login = (req, res) => {
  return res.status(200).render('login.ejs');
};

const processLogin = async (req, res) => {
  return res.redirect('/');
};

module.exports = {
  login,
  processLogin,
};
