import cron from 'node-cron';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.POSTGRES_URL || 'postgres://user:pass@localhost:5432/costdb',
});

async function collectCostMetrics() {
  await client.connect();
  // Dummy cost metrics collection logic
  await client.query('INSERT INTO cost_metrics (collected_at, value) VALUES (NOW(), $1)', [Math.random() * 100]);
  await client.end();
  console.log('Cost metrics collected and stored.');
}

cron.schedule('0 0 * * *', () => {
  collectCostMetrics();
});

console.log('Daily cost metrics cron job scheduled.');
