import * as dotenv from "dotenv";

const resetEnv = () => {
    const nodeEnv = process.env.NODE_ENV;

    for (const key in process.env) {
        if (key !== 'NODE_ENV') {
            delete process.env[key];
        }
    }

    process.env.NODE_ENV = nodeEnv;
};

const loadEnv = () => {
    resetEnv();

    const env = process.env.NODE_ENV || 'development';
    console.log('Current ENV:', env);

    const envFile = env === 'production' ? '.env.prod' : '.env';
    console.log('Loading env file:', envFile);

    const result = dotenv.config({ path: envFile });

    if (result.error) {
        console.error('Error loading .env file:', result.error);
        throw result.error;
    }

    const requiredEnvVars = ['DATABASE_URL', 'PORT', 'JWT_SECRET', 'BLOB_READ_WRITE_TOKEN'];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
};

loadEnv();

export const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    databaseUrl: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN
};