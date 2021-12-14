require('dotenv').config();

const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

// configuro las credenciales del bucket en aws s3
const storage = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const getXml = async () => {
  try {
    const params = {
      Bucket: process.env.BUCKET,
      Key: 'modelos.xml',
    };

    const data = await storage.getObject(params).promise();

    return data.Body.toString('utf-8');
  } catch (err) {
    throw new Error(err);
  }
};

// recibe la ruta donde esta el archivo temporal del xml y lo sube al bucket
const uploadToBucket = async (filePath) => {
  try {
    const stream = fs.createReadStream(filePath);

    const params = {
      Bucket: process.env.BUCKET,
      Key: 'modelos.xml',
      Body: stream,
      ACL: 'public-read',
      ContentType: 'txt/xml',
      ContentDisposition: 'inline',
    };

    return storage.upload(params).promise();
  } catch (err) {
    return err;
  }
};

module.exports = {
  getXml,
  uploadToBucket,
};
