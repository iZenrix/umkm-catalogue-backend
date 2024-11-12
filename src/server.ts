import app from './app';
import { config } from './config/env';
app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});

export default app;

module.exports = app;
