const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');
const XmlWriter = require('xml-writer');
const s3Service = require('./aws');

// recibe un xml y lo guarda en la carpeta temporal temp y lo sube al bucket
const saveXml = async (xml) => {
  try {
    const fileName = 'modelos.xml';
    const filePath = path.join(__dirname, '..', 'temp', fileName);

    fs.writeFileSync(filePath, xml, 'utf-8');

    await s3Service.uploadToBucket(filePath);
    fs.unlinkSync(filePath);

    return false;
  } catch (err) {
    return err;
  }
};

// recibe un array de nodos y actualiza el xml con la nueva informacion
const updateXml = async (nodes) => {
  const xmlDoc = new XmlWriter();

  xmlDoc.startDocument('1.0', 'UTF-8');

  xmlDoc
    .startElement('Thumbnails')
    .writeAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .writeAttribute('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema');

  nodes.forEach((node) => {
    xmlDoc
      .startElement('Nodes')
      .writeElement('Name', node.Name)
      .writeElement('OBJName', node.OBJName)
      .writeElement('Scale', node.Scale)
      .endElement();
  });

  xmlDoc.endElement();

  const result = await saveXml(xmlDoc.toString());

  return result;
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
      id: i,
      Name: domNodes[i].getElementsByTagName('Name')[0].textContent,
      OBJName: domNodes[i].getElementsByTagName('OBJName')[0].textContent,
      Scale: domNodes[i].getElementsByTagName('Scale')[0].textContent,
    });
  }

  return nodes;
};

// lee de nuevo el xml ,extrae todos los nodos , agrega un nuevo nodo y retorna un array con todos los nodos
const addNodeToXml = async (newNode) => {
  const xml = await s3Service.getXml();
  const allNodes = serializeXml(xml);

  allNodes.push(newNode);

  return allNodes;
};

// busca un nodo dentro del xml y lo retorna
const findNode = async (id) => {
  const xml = await s3Service.getXml();
  const nodes = serializeXml(xml);

  const node = nodes[id];

  return node;
};

// recibe el nodo y su id lo edita y guarda el xml
const editNode = async (nodeToEdit, id) => {
  const xml = await s3Service.getXml();
  const nodes = serializeXml(xml);

  for (let i = 0; i < nodes.length; i += 1) {
    if (i === +id) {
      nodes[i].Name = nodeToEdit.Name;
      nodes[i].OBJName = nodeToEdit.OBJName;
      nodes[i].Scale = nodeToEdit.Scale;
    }
  }

  return updateXml(nodes);
};

module.exports = {
  serializeXml,
  saveXml,
  updateXml,
  addNodeToXml,
  findNode,
  editNode,
};
