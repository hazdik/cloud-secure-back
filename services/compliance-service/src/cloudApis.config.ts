// Cloud API configuration for compliance checks
export const cloudComplianceApis = {
  aws: {
    configApi: 'https://config.amazonaws.com/',
    rulesApi: 'https://config.amazonaws.com/rules',
    credentialsEnv: 'AWS_CREDENTIALS',
  },
  azure: {
    policyApi: 'https://management.azure.com/providers/Microsoft.Authorization/policyAssignments',
    complianceApi: 'https://management.azure.com/providers/Microsoft.PolicyInsights/policyStates/latest',
    credentialsEnv: 'AZURE_CREDENTIALS',
  },
  gcp: {
    sccApi: 'https://securitycenter.googleapis.com/v1/organizations/{org_id}/sources',
    findingsApi: 'https://securitycenter.googleapis.com/v1/organizations/{org_id}/findings',
    credentialsEnv: 'GCP_CREDENTIALS',
  },
};
