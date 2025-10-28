// Centralized cloud log storage configuration
export const cloudLogConfig = {
  provider: 'aws', // Change to 'azure' or 'gcp' as needed
  aws: {
    bucket: 'centralized-logs-bucket',
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  azure: {
    container: 'centralized-logs',
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  },
  gcp: {
    bucket: 'centralized-logs-bucket',
    projectId: process.env.GCP_PROJECT_ID,
    credentials: process.env.GCP_CREDENTIALS,
  },
};
