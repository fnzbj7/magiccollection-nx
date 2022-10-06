export const environment = {
  production: true,
  server: {
    port: 3000
  },
  log: {
    logLevel: ['log', 'error', 'warn', ] 
  },
  db: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'nx-testmagic-prod',
    synchronize: false,
  }
};
