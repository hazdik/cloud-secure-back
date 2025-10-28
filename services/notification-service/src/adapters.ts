// Adapters for Slack, Teams, PagerDuty
import axios from 'axios';
import nodemailer from 'nodemailer';

export async function sendSlackWebhook(webhookUrl: string, message: string): Promise<boolean> {
  try {
    await axios.post(webhookUrl, { text: message });
    return true;
  } catch {
    return false;
  }
}

export async function sendTeamsAdaptiveCard(webhookUrl: string, card: any): Promise<boolean> {
  try {
    await axios.post(webhookUrl, card);
    return true;
  } catch {
    return false;
  }
}

export async function sendPagerDutyIncident(apiKey: string, incident: any): Promise<boolean> {
  try {
    await axios.post('https://api.pagerduty.com/incidents', incident, {
      headers: {
        'Authorization': `Token token=${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.pagerduty+json;version=2'
      }
    });
    return true;
  } catch {
    return false;
  }
}

export async function sendEmail(to: string, subject: string, text: string): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: { user: 'user', pass: 'pass' }
    });
    await transporter.sendMail({ from: 'noreply@example.com', to, subject, text });
    return true;
  } catch {
    return false;
  }
}
