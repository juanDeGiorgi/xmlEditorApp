const xmlService = require('../services/xml');

const create = (req, res) => {
  res.status(200).render('createForm.ejs');
};

const processCreate = (req, res) => {
  const { Name, OBJName, Scale } = req.body;
  const Allnodes = xmlService.addNodeToXml(Name, OBJName, Scale);
  xmlService.updateXml(Allnodes);
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