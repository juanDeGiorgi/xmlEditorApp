const createError = require('http-errors');
const xmlService = require('../services/xml');

const create = (req, res) => {
  res.status(200).render('createForm.ejs');
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
  const nodeIndex = req.params.id;
  const node = await xmlService.findNode(nodeIndex);

  if (node) {
    return res.status(200).render('editForm.ejs', { node });
  }

  return next(createError(404));
};

const processEdit = async (req, res) => {
  const nodeToEdit = req.body;
  const nodeIndex = req.params.id;

  const error = await xmlService.editNode(nodeToEdit, nodeIndex);

  if (error) {
    return next(createError(error));
  }

  return res.redirect('/');
};

module.exports = {
  create,
  processCreate,
  processEdit,
  edit,
};
