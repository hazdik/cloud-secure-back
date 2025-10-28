import { cloudLogConfig } from '../config/cloudLog.config';
import AWS from 'aws-sdk';
import { BlobServiceClient } from '@azure/storage-blob';
import { Storage } from '@google-cloud/storage';

export class CloudLogService {
  async writeLog(log: any) {
    const provider = cloudLogConfig.provider;
    const logData = JSON.stringify(log);
    const logName = `log_${Date.now()}.json`;

    if (provider === 'aws') {
      const s3 = new AWS.S3({
        region: cloudLogConfig.aws.region,
        accessKeyId: cloudLogConfig.aws.accessKeyId,
        secretAccessKey: cloudLogConfig.aws.secretAccessKey,
      });
      await s3.putObject({
        Bucket: cloudLogConfig.aws.bucket,
        Key: logName,
        Body: logData,
        ContentType: 'application/json',
      }).promise();
    } else if (provider === 'azure') {
  if (!cloudLogConfig.azure.connectionString) throw new Error('Azure connection string is undefined');
  const blobServiceClient = BlobServiceClient.fromConnectionString(cloudLogConfig.azure.connectionString);
      const containerClient = blobServiceClient.getContainerClient(cloudLogConfig.azure.container);
      const blockBlobClient = containerClient.getBlockBlobClient(logName);
      await blockBlobClient.upload(logData, Buffer.byteLength(logData));
    } else if (provider === 'gcp') {
      if (!cloudLogConfig.gcp.credentials) throw new Error('GCP credentials are undefined');
      const storage = new Storage({
        projectId: cloudLogConfig.gcp.projectId,
        credentials: JSON.parse(cloudLogConfig.gcp.credentials),
      });
      const bucket = storage.bucket(cloudLogConfig.gcp.bucket);
      const file = bucket.file(logName);
      await file.save(logData, { contentType: 'application/json' });
    } else {
      throw new Error('Unsupported cloud provider for logs');
    }
  }
}