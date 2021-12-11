const createError = require('http-errors');
const xmlService = require('../services/xml');

const getXml = async (req, res) => {
  const xml = await xmlService.readXml();

  res.type('application/xml');
  res.send(xml);
};

const create = (req, res) => {
  res.render('createForm.ejs');
};

const processCreate = async (req, res, next) => {
  const newNode = req.body;

  const Allnodes = await xmlService.addNodeToXml(newNode);
  const error = await xmlService.updateXml(Allnodes);

  if (error) {
    return next(createError(error));
  }

  return res.redirect('/');
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const node = await xmlService.findNode(id);

  if (node) {
    return res.render('editForm.ejs', { node });
  }

  return next(createError(404));
};

const processEdit = async (req, res, next) => {
  const nodeToEdit = req.body;
  const { id } = req.params;

  const error = await xmlService.editNode(nodeToEdit, id);

  if (error) {
    return next(createError(error));
  }

  return res.redirect('/');
};

module.exports = {
  getXml,
  create,
  processCreate,
  processEdit,
  edit,
};
