import { Controller, Get, Post, Body } from '@nestjs/common';

export class Rule {
  id!: string;
  name!: string;
  definition!: any;
  frameworks!: string[];
  severity!: string;
  remediation!: string;
}

export class EvaluateRequest {
  resourceConfig!: any;
}

export class EvaluateResponse {
  findings!: Array<{ ruleId: string; compliant: boolean; details: string }>;
}

export class RemediateRequest {
  findingId!: string;
}

export class RemediateResponse {
  status!: 'remediated' | 'error';
  message!: string;
}

@Controller('rules')
export class ComplianceRuleController {
  @Get('list')
  async listRules(): Promise<Rule[]> {
    // Dummy: return static rule list
    return [
      {
        id: 'Rule-AWS-001',
        name: 'Ensure S3 Buckets are not Public',
        definition: {},
        frameworks: ['CIS 1.2.0', 'SOC2', 'ISO27001 A.9.1.2'],
        severity: 'HIGH',
        remediation: 'Set ACL to private and enable Block Public Access',
      },
    ];
  }

  @Post('evaluate')
  async evaluate(@Body() req: EvaluateRequest): Promise<EvaluateResponse> {
    // Dummy: always return non-compliant finding
    return {
      findings: [
        { ruleId: 'Rule-AWS-001', compliant: false, details: 'Bucket ACL is public-read' },
      ],
    };
  }

  @Post('remediate')
  async remediate(@Body() req: RemediateRequest): Promise<RemediateResponse> {
    // Dummy: always return remediated
    return {
      status: 'remediated',
      message: 'Remediation applied for finding ' + req.findingId,
    };
  }

  @Get('report')
  async getReport(): Promise<any> {
    // Dummy: return static report
    return {
      summary: 'Compliance report generated.',
      findings: [],
    };
  }
}
