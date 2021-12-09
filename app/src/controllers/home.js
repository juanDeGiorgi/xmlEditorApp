const xmlService = require('../services/xml');

const home = async (req, res) => {
  // leo el xml y lo combierto en un array de nodos
  const xml = await xmlService.readXml();
  const nodos = xmlService.serializeXml(xml);

  res.status(200).render('index.ejs', { nodos });
};

module.exports = {
  home,
};
