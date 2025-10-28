import { Controller, Post, Body } from '@nestjs/common';


export class TicketSyncRequest {
  ticketId!: string;
  source!: 'jira' | 'servicenow';
  status!: string;
  payload!: any;
}

export class TicketSyncResponse {
  synced!: boolean;
  message!: string;
}

@Controller('ticket-sync')
export class TicketSyncController {
  @Post('sync')
  async syncTicket(@Body() req: TicketSyncRequest): Promise<TicketSyncResponse> {
    // Simulate Jira/ServiceNow API integration
    let synced = false;
    let message = '';
    try {
      if (req.source === 'jira') {
        // Example: call Jira REST API (pseudo-code)
        // await axios.post(`${process.env.JIRA_API_URL}/issue/${req.ticketId}`, req.payload, { headers: { Authorization: `Bearer ${process.env.JIRA_TOKEN}` } });
        synced = true;
        message = `Ticket ${req.ticketId} synced with Jira.`;
      } else if (req.source === 'servicenow') {
        // Example: call ServiceNow REST API (pseudo-code)
        // await axios.patch(`${process.env.SERVICENOW_API_URL}/ticket/${req.ticketId}`, req.payload, { auth: { username: process.env.SN_USER, password: process.env.SN_PASS } });
        synced = true;
        message = `Ticket ${req.ticketId} synced with ServiceNow.`;
      } else {
        message = 'Unknown source.';
      }
    } catch (err: any) {
      message = `Sync failed: ${err.message}`;
    }
    return {
      synced,
      message,
    };
  }
}
