require('dotenv').config();

const { XMLHttpRequest } = require('xmlhttprequest');
const Xmldom = require('xmldom').DOMParser;

// lee el xml desde el bucket en AWS y lo retorna
const readXml = async () => {
  let xml;
  const xhttp = new XMLHttpRequest();

  xhttp.open(
    'GET',
    'https://test2021anotherpolitestudio.s3.sa-east-1.amazonaws.com/modelos.xml',
    false
  );

  xhttp.addEventListener('load', () => {
    xml = xhttp.responseText;
  });

  xhttp.send();

  return xml;
};

// recibe el xml, lo transforma en un array de nodos y lo retorna
const serialize = (xml) => {
  // parseo el xml a un objeto del dom y selecciono los nodos que hay dentro
  const doc = new Xmldom().parseFromString(xml, 'application/xml');
  const domNodes = doc.getElementsByTagName('Nodes');

  const nodes = [];

  // recorro el domNodes, combierto cada nodo en un objeto y lo almaceno en un array
  for (let i = 0; i < domNodes.length; i += 1) {
    nodes.push({
      name: domNodes[i].getElementsByTagName('Name')[0].textContent,
      OBJName: domNodes[i].getElementsByTagName('OBJName')[0].textContent,
      scale: domNodes[i].getElementsByTagName('Scale')[0].textContent,
    });
  }

  return nodes;
};

module.exports = {
  readXml,
  serialize,
};
