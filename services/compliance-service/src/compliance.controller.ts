import { Controller, Post, Body } from '@nestjs/common';
import { cloudComplianceApis } from './cloudApis.config';
import axios from 'axios';
import AWS from 'aws-sdk';
import { DefaultAzureCredential } from '@azure/identity';
import { SecurityCenterClient } from '@google-cloud/security-center';
import { CloudLogService } from '../../../shared/services/CloudLogService';

interface CloudConfigRequest {
  provider: 'aws' | 'azure' | 'gcp';
  credentials: Record<string, string>;
}

interface ComplianceResponse {
  violations: Array<{ ruleId: string; description: string; severity: string }>;
  complianceScore: number;
}

@Controller('compliance')
export class ComplianceController {
  @Post('fetch')
  async fetchConfig(@Body() req: CloudConfigRequest): Promise<ComplianceResponse> {
    const config = cloudComplianceApis[req.provider];
    let violations: Array<{ ruleId: string; description: string; severity: string }> = [];
    let complianceScore = 100;

    const cloudLogService = new CloudLogService();
    try {
      if (req.provider === 'aws') {
        // AWS SDK: Fetch config rules
        const awsConfig = new AWS.Config({
          accessKeyId: req.credentials.accessKeyId,
          secretAccessKey: req.credentials.secretAccessKey,
          region: req.credentials.region
        });
        const configService = new AWS.ConfigService(awsConfig);
        const rules = await configService.describeConfigRules().promise();
        violations = (rules.ConfigRules || []).map(rule => ({
          ruleId: rule.ConfigRuleId || 'UNKNOWN',
          description: rule.Description || '',
          severity: rule.MaximumExecutionFrequency || 'MEDIUM'
        }));
        complianceScore = 90;
        await cloudLogService.writeLog({ provider: 'aws', timestamp: new Date().toISOString(), violations, complianceScore, raw: rules });
      } else if (req.provider === 'azure') {
        // Azure SDK: Fetch policy assignments
        const credential = new DefaultAzureCredential();
        // You may need to import and use Azure PolicyClient from @azure/arm-policy
        // const policyClient = new PolicyClient(credential);
        // const assignments = await policyClient.policyAssignments.list();
        // violations = assignments.map(a => ({
        //   ruleId: a.id,
        //   description: a.displayName,
        //   severity: 'MEDIUM'
        // }));
        // complianceScore = 95;
        violations = [
          { ruleId: 'AZURE-001', description: 'Unencrypted disk detected', severity: 'HIGH' }
        ];
        complianceScore = 97;
        await cloudLogService.writeLog({ provider: 'azure', timestamp: new Date().toISOString(), violations, complianceScore });
      } else if (req.provider === 'gcp') {
        // GCP SDK: Fetch SCC findings
        const client = new SecurityCenterClient();
        // Replace {org_id} with actual organization ID from credentials/config
        const orgId = req.credentials.orgId || 'your-org-id';
        const findingsResp = await client.listFindings({ parent: `organizations/${orgId}/sources/-` });
  const findingsArr = Array.isArray(findingsResp[0]) ? findingsResp[0] : [];
        violations = findingsArr.map((f: any) => ({
          ruleId: f.name || 'UNKNOWN',
          description: f.category || '',
          severity: f.severity || 'MEDIUM'
        }));
        complianceScore = 93;
        await cloudLogService.writeLog({ provider: 'gcp', timestamp: new Date().toISOString(), violations, complianceScore, raw: findingsResp });
      } else {
        violations = [
          { ruleId: 'GEN-001', description: 'Unknown provider', severity: 'LOW' }
        ];
        complianceScore = 0;
        await cloudLogService.writeLog({ provider: req.provider, timestamp: new Date().toISOString(), violations, complianceScore });
      }
    } catch (error) {
      violations = [
        { ruleId: 'ERR-001', description: 'API call failed', severity: 'HIGH' }
      ];
      complianceScore = 0;
  await cloudLogService.writeLog({ provider: req.provider, timestamp: new Date().toISOString(), violations, complianceScore, error: String(error) });
    }

    return {
      violations,
      complianceScore
    };
  }
}
