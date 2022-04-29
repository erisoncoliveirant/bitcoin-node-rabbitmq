module.exports = {
  apps : [{
    name: 'bitcoin-candle-generator',
    script: 'build/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '600M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]

  // deploy : {
  //   production : {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/production',
  //     repo: 'git@github.com:tiig/md071-api.git'
  //   }
  // }
};
