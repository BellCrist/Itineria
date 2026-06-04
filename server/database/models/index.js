import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { DataTypes, Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';

// Per gestire __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
// Mappatura degli ambienti
const envMap = {
  'dev': 'development',
  'development': 'development',
  'prod': 'production',
  'production': 'production',
  'test': 'test'
};
const normalizedEnv = envMap[env] || 'development';

// Importiamo la configurazione dinamica che legge le variabili d'ambiente
import configData from '../config/config.js';
const config = configData[normalizedEnv];

if (!config) {
  throw new Error(`Configuration not found for environment: ${env} (normalized to: ${normalizedEnv})`);
}

const db = {};

//Logica di recupero dei parameter store (solo in produzione)
let dbPassword = config.password;

if (normalizedEnv === 'production') {
  console.log('Recupero dei parameters store da AWS SSM Parameter Store...');

  const ssmClient = new SSMClient({ region: process.env.AWS_REGION || 'eu-south-1' });
  const command = new GetParametersCommand({
    Name: ['/travel-dream/db_password','/travel-dream/jwt_secret'], // path esatto degli store parameters su AWS
    WithDecryption: true,             // true perchè c'è secureString su AWS
  });

  try {
    const ssmResponse = await ssmClient.send(command);
    //Mappature degli store parameter dentro un oggetto
    const secrets = {};
    ssmResponse.Parameters.forEach(p => {
      secrets[p.Name] = p.Value;
    });

    dbPassword = secrets['/travel-dream/db_password'];
    process.env.JWT_SECRET = secrets['/travel-dream/jwt_secret'];
    
    console.log('Parameter store recuperati con successo.');
  } catch (error) {
    console.error('Errore nel recupero dei parameter store da AWS SSM:', error);
    throw error;
  }
}

// Inizializzazione di Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, dbPassword, config);
}

// Lettura dei file dei modelli
const files = fs.readdirSync(__dirname).filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  );
});

// Funzione async per caricare i modelli
async function loadModels() {
  for (const file of files) {
    const modelPath = path.resolve(__dirname, file);
    const { default: modelFactory } = await import(`file://${modelPath}`);

    //factory function che ritorna il modello
    const model = modelFactory(sequelize, DataTypes);
    db[model.name] = model;
  }
}

await loadModels();

// Gestione delle associazioni
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;