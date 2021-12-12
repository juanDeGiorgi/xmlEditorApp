const xmlService = require('../services/xml');
const s3Service = require('../services/aws');

const home = async (req, res) => {
  // leo el xml y lo combierto en un array de nodos
  const xml = await s3Service.getXml();
  const nodos = xmlService.serializeXml(xml);

  res.status(200).render('index.ejs', { nodos });
};

module.exports = {
  home,
};
