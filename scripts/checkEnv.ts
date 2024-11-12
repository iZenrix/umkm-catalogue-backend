import { config } from '../src/config/env';

console.log('Environment Configuration:');
console.log('-------------------------');
console.log('NODE_ENV:', config.nodeEnv);
console.log('PORT:', config.port);
console.log('DATABASE_URL:', config.databaseUrl);
console.log('JWT_SECRET exists:', !!config.jwtSecret);