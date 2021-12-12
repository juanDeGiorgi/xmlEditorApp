const createError = require('http-errors');
const xmlService = require('../services/xml');
const s3Service = require('../services/aws');

// maneja las respuestas del servidor para la entidad de "nodes"

const getXml = async (req, res, next) => {
  try {
    const xml = await s3Service.getXml();

    res.type('application/xml');
    res.send(xml);
  } catch (err) {
    next(err);
  }
};

const create = (req, res) => {
  res.render('createForm.ejs');
};

const processCreate = async (req, res, next) => {
  try {
    const newNode = req.body;

    const Allnodes = await xmlService.addNodeToXml(newNode);
    const error = await xmlService.updateXml(Allnodes);

    if (error) {
      return next(createError(error));
    }

    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const node = await xmlService.findNode(id);

    if (node) {
      return res.render('editForm.ejs', { node });
    }

    const error = new Error('nodo no encontrado');
    error.status = 404;
    return next(error);
  } catch (err) {
    return next(err);
  }
};

const processEdit = async (req, res, next) => {
  try {
    const nodeToEdit = req.body;
    const { id } = req.params;

    const error = await xmlService.editNode(nodeToEdit, id);

    if (error) {
      return next(createError(error));
    }

    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getXml,
  create,
  processCreate,
  processEdit,
  edit,
};
