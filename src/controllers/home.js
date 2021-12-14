const xmlService = require('../services/xml');
const s3Service = require('../services/aws');

const home = async (req, res, next) => {
  // leo el xml y lo combierto en un array de nodos
  try {
    const xml = await s3Service.getXml();
    const nodos = xmlService.serializeXml(xml);
  
    return res.status(200).render('home.ejs', { nodos });
    
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = {
  home,
};
