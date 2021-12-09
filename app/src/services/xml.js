require('dotenv').config();

const { XMLHttpRequest } = require('xmlhttprequest');
const { DOMParser } = require('xmldom');
const XmlWriter = require('xml-writer');
const fs = require('fs');
const path = require('path');

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

// recibe un xml y lo guarda en la carpeta temporal temp antes de subirlo al bucket
const saveXml = (xml) => {
  const fileName = 'modelos.xml';
  const filePath = path.join(__dirname, '..', 'temp', fileName);

  fs.writeFileSync(filePath, xml, 'utf-8');
};

// recibe un array de nodos y actualiza el xml con la nueva informacion
const updateXml = (nodes) => {
  const xmlDoc = new XmlWriter();

  xmlDoc.startDocument('1.0', 'UTF-8');

  xmlDoc
    .startElement('Thumbnails')
    .writeAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .writeAttribute('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema');

  nodes.forEach((node) => {
    xmlDoc
      .startElement('Nodes')
      .writeElement('Name', node.name)
      .writeElement('OBJName', node.OBJName)
      .writeElement('Scale', node.scale)
      .endElement();
  });

  xmlDoc.endElement();

  saveXml(xmlDoc.toString());
};

// recibe el xml, lo transforma en un array de nodos y lo retorna
const serializeXml = (xml) => {
  // parseo el xml a un objeto del dom y selecciono los nodos que hay dentro
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
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
  serializeXml,
  saveXml,
  updateXml,
};
