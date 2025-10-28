import { Controller, Post, Body } from '@nestjs/common';

export class IncidentAssignRequest {
  incidentId!: string;
  incidentType!: string;
  severity!: 'low' | 'medium' | 'high';
  availableAgents!: string[];
}

export class IncidentAssignResponse {
  assignedAgent!: string;
  status!: 'assigned' | 'pending';
  message!: string;
}

@Controller('incident-auto-assign')
export class IncidentAssignController {
  @Post('assign')
  async assignIncident(@Body() req: IncidentAssignRequest): Promise<IncidentAssignResponse> {
    // Simple AI-based logic: score agents by incident type and severity
    // In real use, integrate with ML model or external service
    let assignedAgent = '';
    if (req.availableAgents.length > 0) {
      // Example: prioritize agents for high severity, random for others
      if (req.severity === 'high') {
        assignedAgent = req.availableAgents[0];
      } else {
        assignedAgent = req.availableAgents[Math.floor(Math.random() * req.availableAgents.length)];
      }
    }
    return {
      assignedAgent,
      status: assignedAgent ? 'assigned' : 'pending',
      message: assignedAgent ? `Incident assigned to ${assignedAgent}` : 'No agent available for assignment',
    };
  }
}
