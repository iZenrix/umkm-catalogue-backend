import app from './app';
import { config } from './config/env';

if (process.env.NODE_ENV !== 'production') {
    app.listen(config.port, () => {
        console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
}

export default app;