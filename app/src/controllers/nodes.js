const xmlService = require('../services/xml');

const create = (req, res) => {
  res.status(200).render('createForm.ejs');
};

const processCreate = (req, res) => {};

const edit = (req, res) => {
  res.status(200).render('editForm.ejs');
};

const processEdit = (req, res) => {};

module.exports = {
  create,
  processCreate,
  processEdit,
  edit,
};
