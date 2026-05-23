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

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
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
    
    // Eseguiamo la factory function che ritorna il modello
    const model = modelFactory(sequelize, DataTypes);
    db[model.name] = model;
  }
}

// Carichiamo i modelli
await loadModels();

// Gestione delle associazioni (associate)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;