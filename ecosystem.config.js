module.exports = {
  apps: [
    {
      name: 'fleet-management-backend',
      script: 'server.js',
      env_file: '.env.production',
      instances: 2, // Sesuaikan dengan CPU cores server
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      error_file: 'log/pm2-error.log',
      out_file: 'log/pm2-out.log',
      log_file: 'log/pm2-combined.log',
      time: true,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      // Auto restart settings
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
    },
  ],
};
