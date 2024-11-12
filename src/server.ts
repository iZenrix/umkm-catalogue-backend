import app from './app';
import { config } from './config/env';
module.exports = app;
app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});

