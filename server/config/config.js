const env = process.env.NODE_ENV || 'development'; // Check if environment was set for testing or use default 'development'.

try {
    // Use require since import can only be used at top level.
    const config = require('./config.json'); // Read config file.
    // Sets configs from config file to process.env.
    if (env === 'development' || env === 'test') {
        const envConfig = config[env];
        Object.keys(envConfig).forEach((key) => {
            process.env[key] = envConfig[key];
        });
    }
} catch (e) {
    console.log('Config file was not pressent.');
}
