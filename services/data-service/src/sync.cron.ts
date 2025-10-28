import cron from 'node-cron';

function syncCloudResources() {
  // Dummy logic: simulate resource sync
  console.log('Cloud resources synced at', new Date().toISOString());
}

// Schedule every 6 hours
cron.schedule('0 */6 * * *', () => {
  syncCloudResources();
});

console.log('Cloud resource sync job scheduled every 6 hours.');
