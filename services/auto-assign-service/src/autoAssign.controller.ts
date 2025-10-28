import { Controller, Post, Body } from '@nestjs/common';

export class AutoAssignRequest {
  threatId!: string;
  severity!: 'low' | 'medium' | 'high';
  teamLeads!: string[];
}

export class AutoAssignResponse {
  assignedTo!: string;
  status!: 'assigned' | 'pending';
  message!: string;
}

@Controller('auto-assign')
export class AutoAssignController {
  @Post('threat')
  async autoAssignThreat(@Body() req: AutoAssignRequest): Promise<AutoAssignResponse> {
    // Example logic: assign high-severity threats to first team lead
    const assignedTo = req.severity === 'high' && req.teamLeads.length > 0 ? req.teamLeads[0] : '';
    return {
      assignedTo,
      status: assignedTo ? 'assigned' : 'pending',
      message: assignedTo ? `Threat assigned to ${assignedTo}` : 'No team lead available for assignment',
    };
  }
}
