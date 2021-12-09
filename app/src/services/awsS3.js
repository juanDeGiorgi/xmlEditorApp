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

const makeToPublicXml = (Bucket) => {
  const params = {
    Bucket,
    Key: 'modelos.xml',
    AccessControlPolicy: {
      Owner: {
        DisplayName: 'Owner',
        ID: process.env.AWS_CANONICAL_ID,
      },
      Grants: [
        {
          Grantee: {
            Type: 'CanonicalUser',
            DisplayName: 'Owner',
            ID: process.env.AWS_CANONICAL_ID,
          },
          Permission: 'FULL_CONTROL',
        },
        {
          Grantee: {
            Type: 'Group',
            URI: 'http://acs.amazonaws.com/groups/global/AllUsers',
          },
          Permission: 'READ',
        },
      ],
    },
  };

  return storage.putObjectAcl(params).promise();
};

const uploadToBucket = async (filePath) => {
  const stream = fs.createReadStream(filePath);

  const Bucket = await getBucket();
  const params = {
    Bucket,
    Key: 'modelos.xml',
    Body: stream,
  };

  try {
    await storage.upload(params).promise();

    return makeToPublicXml(Bucket);
  } catch (err) {
    return err;
  }
};

module.exports = {
  uploadToBucket,
  getBucket,
};
