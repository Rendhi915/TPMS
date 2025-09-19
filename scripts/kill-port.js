const { exec } = require('child_process');

function killPort(port = 3001) {
  return new Promise((resolve) => {
    // Find process using the port
    exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
      if (error) {
        console.log(`No process found on port ${port}`);
        resolve();
        return;
      }

      const lines = stdout.split('\n');
      const pids = new Set();

      lines.forEach((line) => {
        if (line.includes('LISTENING')) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0') {
            pids.add(pid);
          }
        }
      });

      if (pids.size === 0) {
        console.log(`No listening process found on port ${port}`);
        resolve();
        return;
      }

      // Kill all processes
      const killPromises = Array.from(pids).map((pid) => {
        return new Promise((resolvePid) => {
          console.log(`🔄 Killing process PID: ${pid}`);
          exec(`taskkill /PID ${pid} /F`, (killError) => {
            if (killError) {
              console.log(`❌ Failed to kill PID ${pid}: ${killError.message}`);
            } else {
              console.log(`✅ Successfully killed PID ${pid}`);
            }
            resolvePid();
          });
        });
      });

      Promise.all(killPromises).then(() => {
        console.log(`🎯 Port ${port} cleanup completed`);
        resolve();
      });
    });
  });
}

// Check if script is run directly
if (require.main === module) {
  const port = process.argv[2] || 3001;
  console.log(`🔍 Cleaning up port ${port}...`);
  killPort(port).then(() => {
    console.log('✨ Port cleanup finished');
    process.exit(0);
  });
}

module.exports = killPort;
