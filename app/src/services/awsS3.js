require('dotenv').config();

const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const storage = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const getBucket = async () => {
  const data = await storage.listBuckets().promise();

  return data.Buckets[0].Name;
};

const uploadToBucket = async (filePath) => {
  const stream = fs.createReadStream(filePath);

  const Bucket = await getBucket();
  const params = {
    Bucket,
    Key: 'modelos.xml',
    Body: stream,
    ACL: 'public-read',
    ContentType: 'txt/xml',
    ContentDisposition: 'inline',
  };

  try {
    return storage.putObject(params).promise();
  } catch (err) {
    return err;
  }
};

module.exports = {
  uploadToBucket,
  getBucket,
};
