import app from './app';
import dotenv from 'dotenv';
import { config } from './config/env';

const env = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env';
dotenv.config({path: env});

app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});

