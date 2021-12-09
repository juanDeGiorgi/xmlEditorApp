const createError = require('http-errors');
const xmlService = require('../services/xml');

const create = (req, res) => {
  res.status(200).render('createForm.ejs');
};

const processCreate = async (req, res, next) => {
  const { Name, OBJName, Scale } = req.body;
  const newNode = { Name, OBJName, Scale };

  const Allnodes = await xmlService.addNodeToXml(newNode);
  const error = await xmlService.updateXml(Allnodes);

  if (error) {
    console.log(error);
    return next(createError(error));
  }

  return res.redirect('/');
};

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
