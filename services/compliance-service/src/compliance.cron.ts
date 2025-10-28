import cron from 'node-cron';

function exportComplianceReport() {
  // Dummy logic: simulate export
  console.log('Compliance report exported at', new Date().toISOString());
}

// Schedule every Monday at 6 AM
cron.schedule('0 6 * * 1', () => {
  exportComplianceReport();
});

console.log('Compliance export cron job scheduled for every Monday 6 AM.');
