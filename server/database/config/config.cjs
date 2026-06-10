require('dotenv').config();
const { SSMClient, GetParametersCommand } = require('@aws-sdk/client-ssm');

module.exports = (async () => {
    // Di default si usa la password dell'env locale
    let prodPassword = process.env.DB_PASSWORD || null;

    // Per production si recupera la password dallo store parameter di AWS
    if (process.env.NODE_ENV === 'production') {
        console.log('Ambiente di produzione rilevato. Recupero la password da AWS SSM...');

        const ssmClient = new SSMClient({ region: process.env.AWS_REGION || 'eu-south-1' });
        const command = new GetParametersCommand({
            Names: ['/travel-dream/db_password'],
            WithDecryption: true,
        });

        try {
            const ssmResponse = await ssmClient.send(command);
            const param = ssmResponse.Parameters.find(p => p.Name === '/travel-dream/db_password');

            if (param) {
                prodPassword = param.Value;
                console.log('Password recuperata con successo da SSM.');
            }
        } catch (error) {
            console.error('ERRORE: Impossibile recuperare la password da SSM.', error);
            process.exit(1);
        }
    }

    return {
        development: {
            username: process.env.DB_USER || 'admin-user-itineria',
            password: process.env.DB_PASSWORD || 'llha23_gg#9Fa',
            database: process.env.DB_NAME || 'itineria_db',
            host: process.env.DB_HOST || 'db-itineria',
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
            password: prodPassword,
            database: process.env.DB_NAME || 'database_production',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            dialect: 'mysql'
        }
    };
})();