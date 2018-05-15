const env = process.env.NODE_ENV || 'development'; // Check if environment was set for testing or use default 'development'.
import config from './config.json'; // Read config file.

// Sets configs from config file to process.env.
if (env === 'development' || env === 'test') {
    const envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}
