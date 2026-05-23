import 'dotenv/config';

export default {
    development: {
        username: process.env.DB_USER || 'admin-user-itineria',
        password: process.env.DB_PASSWORD || 'llha23_gg#9Fa',
        database: process.env.DB_NAME || 'itineria_db',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql'
    },
    test: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'database_test',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql'
    },
    production: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'database_production',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql'
    }
};
