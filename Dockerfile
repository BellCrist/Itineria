# Stage 1: Build del client React
FROM node:22-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --legacy-peer-deps
COPY client/ ./
RUN npm run build

# Stage 2: Build del server e runtime
FROM node:22-alpine
WORKDIR /app/server

# Copia package.json e package-lock.json del server
COPY server/package*.json ./

# Installa dipendenze del server (e aggiunge sequelize-cli globale per le migrazioni)
RUN npm ci --only=production && npm install -g sequelize-cli

# Copia il codice sorgente del server
COPY server/ ./

# CORREZIONE: Copia il file rinominato senza estensione .cjs nella cartella /app/server
COPY .sequelizerc ./

# Copia il client compilato dal stage 1 nella cartella public del server
COPY --from=client-build /app/client/dist ./public

# Espone la porta 8080
EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

# Start del server con migration
CMD ["npm", "run", "start:prod"]