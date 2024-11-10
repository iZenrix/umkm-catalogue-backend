import * as dotenv from "dotenv";

if(process.env.NODE_ENV === 'production') {
    dotenv.config({path: '.env.prod'});
} else{
    dotenv.config({path: '.env.dev'});
}

export const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    databaseUrl: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    blobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN
};