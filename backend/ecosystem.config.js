module.exports = {
  apps: [
    {
      name: 'topads-api',
      script: 'src/server.js',
      instances: process.env.PM2_INSTANCES || 4,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      
      // Configuración de monitoreo
      max_memory_restart: process.env.PM2_MAX_MEMORY_RESTART || '1G',
      min_uptime: '10s',
      max_restarts: 10,
      
      // Configuración de logs
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Configuración de performance
      node_args: '--max-old-space-size=1024',
      
      // Configuración de watch (solo en desarrollo)
      watch: process.env.NODE_ENV === 'development',
      ignore_watch: ['node_modules', 'logs', '*.log'],
      
      // Configuración de restart
      autorestart: true,
      restart_delay: 4000,
      
      // Configuración de kill timeout
      kill_timeout: 5000,
      
      // Configuración de listen timeout
      listen_timeout: 8000,
      
      // Configuración de shutdown
      shutdown_with_message: true,
      
      // Variables de entorno específicas
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        WORKER_COUNT: 4,
        DB_POOL_MAX: 20,
        DB_POOL_MIN: 5,
        RATE_LIMIT_MAX: 1000,
        REDIS_URL: 'redis://localhost:6379'
      }
    }
  ],
  
  // Configuración de deploy
  deploy: {
    production: {
      user: 'deploy',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:your-username/topads-backend.git',
      path: '/var/www/topads-backend',
      'post-deploy': 'npm install && npm run seed && pm2 reload ecosystem.config.js --env production'
    }
  }
}; 