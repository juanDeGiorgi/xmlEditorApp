const login = (req, res) => {
  res.status(200).render('login.ejs');
};

module.exports = {
  login,
};
