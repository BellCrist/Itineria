# 🌍 Itinerary App

Una moderna applicazione web full-stack per creare, gestire e condividere itinerari di viaggio. Gli utenti possono pianificare i loro viaggi con waypoint dettagliati, salvare i propri itinerari e visualizzare i dettagli delle loro destinazioni.

---

## 📋 Indice

- [Funzionalità](#funzionalità)
- [Architettura](#architettura)
- [Tecnologie](#tecnologie)
- [Scelte Progettuali](#scelte-progettuali)
- [Prerequisiti](#prerequisiti)
- [Setup da Zero](#setup-da-zero)
- [Esecuzione](#esecuzione)
- [Docker](#docker)
- [Testing](#testing)
- [Credenziali di Prova](#credenziali-di-prova)
- [API Documentation](#api-documentation)
- [Struttura del Progetto](#struttura-del-progetto)

---

## 🎯 Funzionalità

### Autenticazione & Utenti
- ✅ **Registrazione** - Creazione di nuovi account utente con validazione
- ✅ **Login/Logout** - Sistema di autenticazione basato su JWT
- ✅ **Gestione Profilo** - Visualizzazione e modifica dei dati utente
- ✅ **Refresh Token** - Token di refresh per sessioni prolungate (7 giorni)
- ✅ **Password Hashing** - Utilizzo di bcrypt per la sicurezza

### Itinerari
- ✅ **Creazione Itinerari** - Creazione di nuovi itinerari con waypoint e descrizioni
- ✅ **Visualizzazione Lista** - Elenco di tutti gli itinerari dell'utente
- ✅ **Dettagli Itinerario** - Visualizzazione completa di un itinerario con tutti i waypoint
- ✅ **Modifica Itinerari** - Aggiornamento di itinerari esistenti
- ✅ **Eliminazione Itinerari** - Cancellazione di itinerari
- ✅ **Privacy** - Possibilità di rendere gli itinerari privati o pubblici

### Ricerca & Scoperta
- ✅ **Ricerca Itinerari** - Ricerca di itinerari pubblici per destinazione
- ✅ **Filtri Avanzati** - Filtraggio per paese, città e altre caratteristiche

### Progressive Web App
- ✅ **Installabilità** - Installazione come app nativa (PWA)
- ✅ **Offline Support** - Funzionalità base disponibili anche offline
- ✅ **Service Worker** - Caching intelligente degli assets

---

## 🏗️ Architettura
SPA con Express che in produzione fornisce direttamente i file statici del frontend.
L'applicazione segue un'architettura **client-server monolitica** con separazione chiara tra frontend e backend.

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                         │
│  React 19 + Vite + React Router + Bootstrap                 │ genera l'interfaccia grafica e gestisce la navigazione delle rotte a frontend.
                                                                esegue chiamate HTTP/REST verso il server.
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express.js Server                          │
│  - JWT Authentication                                       │ Si occupa di validare i dati che riceve dal frontend, dell'autenticazione e autorizzazione.
│  - Route handlers (auth, itineraries, profile)              │ Gestisce le richieste in arrivo ai vari endpoint.
│  - Cookie-based session management                          │
└────────────────────┬────────────────────────────────────────┘
                     │ SQL
                     ▼
┌─────────────────────────────────────────────────────────────┐
│           MySQL Database (via Sequelize ORM)                │
│  - Users                                                    │ Scelto il database Mysql per la relazione tra i vari dati a disposizione
│  - Itineraries                                              │ e anche perchè permette la memorizzazione di dati in formato json.
│  - Refresh Tokens                                           │ Sequelize è l'ORM che è stato scelto per costruire il database e le varie tabelle
└─────────────────────────────────────────────────────────────┘ ma soprattutto per eseguire le migrations in fase di deploy in produzione.
```

### Flusso di Autenticazione

```
┌──────────────────────────────────────────────────────────────────┐
│                     Utente non autenticato                       │
└──────────────┬───────────────────────────────────────────────────┘
               │
               ▼
    ┌─────────────────────┐
    │  Registration Page  │
    │    o Login Page     │
    └──────────┬──────────┘
               │
     Credenziali valide
               │
               ▼
    ┌──────────────────────────────────┐
    │ Server genera Access Token (15m) │
    │ e Refresh Token (7 giorni)       │
    │ Stored in HttpOnly Cookies       │
    └──────────┬───────────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Utente autenticato       │
    │ Accesso alle rotte       │
    │ protette                 │
    └──────────┬───────────────┘
               │
    Token scaduto?
               │
          Sì  │  No
               │ ├──────────────────┐
               │                    │
               ▼                    ▼
    ┌──────────────────────┐  ┌────────────────────┐
    │ Refresh Token Flow   │  │ Usa Access Token   │
    │ Genera nuovo token   │  │ per API requests   │
    └──────────────────────┘  └────────────────────┘
```

---

## 🛠️ Tecnologie

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool e dev server (istantanea HMR)
- **React Router v7** - Routing SPA
- **Bootstrap 5** - UI components
- **React Bootstrap** - Bootstrap components per React
- **Bootstrap Icons** - Icone
- **React Select** - Dropdown avanzati
- **js-cookie** - Gestione cookies
- **Vite PWA Plugin** - Progressive Web App support

### Backend
- **Node.js 22 (Alpine)** - Runtime
- **Express 5** - Framework web
- **Sequelize 6** - ORM per MySQL
- **MySQL 8** - Database
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cookie-parser** - Parsing cookies
- **cors** - CORS middleware
- **dotenv** - Environment variables

### DevOps & Build
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nodemon** - Auto-reload in development

---

## 🎨 Scelte Progettuali

### 1. **Stack Tecnologico**
- **Vite vs Webpack**: Vite scelto per la velocità di build e HMR istantaneo
- **React Router v7**: Versione più recente con miglior performance
- **MySQL + Sequelize**: Relazionale per dati strutturati (utenti, itinerari, token)

### 2. **Autenticazione**
- **JWT + Refresh Token Pattern**:
  - Access token breve (15 min) per sicurezza
  - Refresh token lungo (7 giorni) per user experience
  - HttpOnly cookies per protezione XSS
- **Bcrypt**: 10 salt rounds per hashing sicuro

### 3. **Architettura Backend**
- **Controller-based**: Logica separata per auth, itineraries, profile
- **Middleware**: Autenticazione centralizzata via cookies
- **SPA Fallback**: Serve index.html per React Router (ultima route)

### 4. **Database Design**
- **Migrations**: Sequelize migrations per versionamento schema
- **Relationships**: User → Itineraries (1:N), User → RefreshTokens (1:N)
- **Soft Design**: Permet di aggiungere future features (condivisioni, rating, etc.)

### 5. **Security**
- **CORS**: Configurabile per production
- **HttpOnly Cookies**: Protezione XSS/CSRF
- **Password Hashing**: Bcrypt con salt
- **JWT Secrets**: Differenziati per ambienti
- **Input Validation**: Lato server per tutti gli input

### 6. **Build Monolitico**
- **Multi-stage Dockerfile**:
  - Stage 1: Build client React con Vite
  - Stage 2: Setup server Node + client compilato
- **Vantaggi**: Single deployment, versioning unificato
- **Scaling**: Client statico servito da Express, database separabile

### 7. **Progressive Web App**
- **Offline First**: Service worker per caching intelligente
- **Installabilità**: Web manifest per "Add to Home Screen"
- **Performance**: Compressione assets, lazy loading

---

## 📋 Prerequisiti

### Locale
- **Node.js** >= 18 (consigliato 20+)
- **npm** >= 9
- **MySQL** >= 8.0 (oppure via Docker)
- **Git**

### Docker
- **Docker** >= 20.10
- **Docker Compose** >= 1.29

---

## 🚀 Setup da Zero

### 1. Clone del Repository

```bash
git clone https://github.com/cristianbellesi/itinerary-app.git
cd itinerary-app
```

### 2. Setup Database (via Docker o locale)

#### Opzione A: Docker Compose (Consigliato)
```bash
docker-compose up -d db-itineria
```

#### Opzione B: MySQL locale
```bash
# macOS (brew)
brew install mysql
brew services start mysql

# Ubuntu/Debian
sudo apt-get install mysql-server
sudo systemctl start mysql

# Crea database e utente
mysql -u root -p << EOF
CREATE DATABASE itineria_db;
CREATE USER 'admin-user-itineria'@'localhost' IDENTIFIED BY 'llha23_gg#9Fa';
GRANT ALL PRIVILEGES ON itineria_db.* TO 'admin-user-itineria'@'localhost';
FLUSH PRIVILEGES;
EOF
```

### 3. Setup Server

```bash
cd server

# Installa dipendenze
npm install

# Configura environment (copia template o crea file)
cat > .env << EOF
NODE_ENV=development
PORT=8080
CORS_ORIGIN=http://localhost:5173
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=itineria_db
DB_USER=admin-user-itineria
DB_PASSWORD=llha23_gg#9Fa
JWT_SECRET=your-secret-key-change-in-production
EOF

# Esegui migrazioni database
npm run db:migrate

cd ..
```

### 4. Setup Client

```bash
cd client

# Installa dipendenze
npm install

cd ..
```

---

## ▶️ Esecuzione

### Modalità Sviluppo (2 terminali)

**Terminal 1 - Server Express**
```bash
cd server
npm run dev
# Server in esecuzione su http://localhost:8080
```

**Terminal 2 - Frontend Vite**
```bash
cd client
npm run dev
# Frontend in esecuzione su http://localhost:5173
```

Accedi a **http://localhost:5173**

### Modalità Produzione (Locale)

```bash
# Build client
cd client
npm run build

# Avvia server in produzione
cd ../server
npm install --only=production
npm run start:prod
# App disponibile su http://localhost:8080
```

---

## 🐳 Docker

### Build dell'Immagine

```bash
docker build -t itinerary-app:latest .
```

### Esecuzione con Docker Compose

```bash
# Avvia client, server e database
docker-compose up -d

# Logs
docker-compose logs -f

# Stop
docker-compose down
```

L'app sarà disponibile su:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080/api

### Variabili d'Ambiente in Docker

Crea un file `.env.docker`:

```bash
NODE_ENV=production
PORT=8080
CORS_ORIGIN=http://localhost
DB_HOST=db-itineria
DB_PORT=3306
DB_NAME=itineria_db
DB_USER=admin-user-itineria
DB_PASSWORD=llha23_gg#9Fa
JWT_SECRET=your-production-secret
```

Avvia con:
```bash
docker-compose --env-file .env.docker up -d
```

---

## 🧪 Testing

### Linting (Frontend)

```bash
cd client
npm run lint
```

### Test Manuali API

Usa **Postman**, **Thunder Client** o **curl**:

```bash
# Registrazione
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mario",
    "surname": "Rossi",
    "email": "mario@example.com",
    "password": "SecurePass123!",
    "country": "IT",
    "city": "Roma",
    "address": "Via Test 123",
    "province": "RM",
    "zipCode": "00100"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mario@example.com",
    "password": "SecurePass123!"
  }'

# Ottenere lista itinerari (con token nei cookie)
curl -X GET http://localhost:8080/api/itineraries \
  -H "Cookie: accessToken=<YOUR_TOKEN>"
```

---

## 👤 Credenziali di Prova

### Utente di Test

Se il database è già pre-seeded:

- **Email**: `test@example.com`
- **Password**: `TestPassword123!`

### Per Creare un Utente di Test

Registrati tramite l'interfaccia web o usa curl:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "surname": "User",
    "email": "test@example.com",
    "password": "TestPassword123!",
    "country": "IT",
    "city": "Milano",
    "address": "Via Test 456",
    "province": "MI",
    "zipCode": "20100"
  }'
```

### Credenziali Database

- **Database**: `itineria_db`
- **Username**: `admin-user-itineria`
- **Password**: `llha23_gg#9Fa`
- **Host**: `localhost:3306`

---

## 📡 API Documentation

### Base URL
```
Development: http://localhost:8080
Production: https://yourdomain.com
```

### Autenticazione

#### POST `/api/auth/register`
Registra un nuovo utente.

**Body:**
```json
{
  "name": "string",
  "surname": "string",
  "email": "string",
  "password": "string",
  "country": "string (ISO 2-char code)",
  "city": "string",
  "address": "string",
  "province": "string",
  "zipCode": "string"
}
```

**Response:** `201 Created`
```json
{
  "message": "Registrazione effettuata con successo",
  "user": {
    "id": 1,
    "name": "Mario",
    "email": "mario@example.com"
  }
}
```

---

#### POST `/api/auth/login`
Effettua il login di un utente.

**Body:**
```json
{
  "email": "mario@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login effettuato con successo",
  "user": {
    "id": 1,
    "name": "Mario",
    "email": "mario@example.com"
  }
}
```

**Cookies Impostati:**
- `accessToken` (HttpOnly, 15 min)
- `refreshToken` (HttpOnly, 7 giorni)

---

#### POST `/api/auth/logout`
Effettua il logout.

**Response:** `200 OK`

---

#### POST `/api/auth/refresh-token`
Rinfresca l'access token usando il refresh token.

**Response:** `200 OK`
```json
{
  "message": "Token rinnovato con successo"
}
```

---

### Itinerari

#### GET `/api/itineraries`
Ottiene tutti gli itinerari dell'utente autenticato.

**Headers:** Richiede `accessToken` nei cookies

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Roma Tour",
    "description": "Tour di 3 giorni a Roma",
    "waypoints": [...],
    "privateItinerary": false,
    "createdAt": "2026-05-23T10:00:00Z",
    "updatedAt": "2026-05-23T10:00:00Z"
  }
]
```

---

#### GET `/api/itineraries/:id`
Ottiene i dettagli di un itinerario specifico.

**Response:** `200 OK`
```json
{
  "id": 1,
  "userId": 1,
  "title": "Roma Tour",
  "description": "Tour di 3 giorni a Roma",
  "waypoints": [
    {
      "name": "Colosseo",
      "coordinates": [41.8902, 12.4924],
      "description": "Anfiteatro flavio"
    }
  ],
  "privateItinerary": false,
  "createdAt": "2026-05-23T10:00:00Z"
}
```

---

#### POST `/api/itineraries`
Crea un nuovo itinerario.

**Body:**
```json
{
  "tripName": "Roma Tour",
  "tripDescription": "Tour di 3 giorni a Roma",
  "waypoints": [
    {
      "name": "Colosseo",
      "coordinates": [41.8902, 12.4924],
      "description": "Anfiteatro flavio"
    }
  ],
  "privateItinerary": false
}
```

**Response:** `201 Created`

---

#### PUT `/api/itineraries/:id`
Aggiorna un itinerario.

**Body:** Stesso formato di POST

**Response:** `200 OK`

---

#### DELETE `/api/itineraries/:id`
Elimina un itinerario.

**Response:** `200 OK`

---

### Profilo Utente

#### GET `/api/user-profile`
Ottiene il profilo dell'utente autenticato.

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Mario",
  "surname": "Rossi",
  "email": "mario@example.com",
  "country": "IT",
  "city": "Roma",
  "address": "Via Test 123",
  "province": "RM",
  "zipCode": "00100"
}
```

---

#### PUT `/api/user-profile`
Aggiorna il profilo dell'utente.

**Body:**
```json
{
  "name": "string",
  "surname": "string",
  "country": "string",
  "city": "string",
  "address": "string",
  "province": "string",
  "zipCode": "string"
}
```

**Response:** `200 OK`

---

## 📁 Struttura del Progetto

```
itinerary-app/
├── client/                          # Frontend React + Vite
│   ├── src/
│   │   ├── pages/                   # Pagine (Home, Login, Profile, etc.)
│   │   ├── components/              # Componenti riusabili
│   │   ├── layout/                  # Componenti layout (Form, Slider, etc.)
│   │   ├── context/                 # AuthContext
│   │   ├── css/                     # Styling per componenti
│   │   ├── assets/                  # Immagini e risorse
│   │   ├── App.jsx                  # Routes definition
│   │   └── main.jsx                 # Entry point
│   ├── public/                      # Static assets
│   ├── vite.config.js               # Vite configuration
│   ├── package.json
│   └── eslint.config.js
│
├── server/                          # Backend Express
│   ├── controllers/                 # Business logic
│   │   ├── authController.js        # Auth logic (register, login, refresh)
│   │   ├── itineraryController.js   # Itinerary CRUD
│   │   └── profileController.js     # Profile management
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js
│   │   ├── itineraryRoutes.js
│   │   └── profileRoutes.js
│   ├── middleware/                  # Express middleware
│   │   └── authMiddleware.js        # JWT verification
│   ├── database/
│   │   ├── models/                  # Sequelize models
│   │   │   ├── user.js
│   │   │   ├── itinerary.js
│   │   │   └── refreshToken.js
│   │   ├── migrations/              # DB migrations (Sequelize)
│   │   ├── seeders/                 # Optional seed data
│   │   └── config/                  # Database config
│   ├── server.js                    # Express app setup
│   ├── package.json
│   └── .env                         # Environment variables
│
├── docker-compose.yml               # Multi-container setup
├── Dockerfile                       # Multi-stage build
├── README.md                        # This file
├── DEPLOY.md                        # Deployment instructions (AWS)
└── LICENSE
```

---

## 🔐 Sicurezza in Produzione

Quando deployi in produzione:

1. **Cambia tutte le credenziali** (JWT_SECRET, DB password)
2. **Usa HTTPS** (certificati SSL/TLS)
3. **Configura CORS correttamente** con il tuo dominio
4. **Imposta Node_ENV=production**
5. **Usa environment variables** da AWS Secrets Manager, HashiCorp Vault, etc.
6. **Abilita rate limiting** per le API
7. **Setup monitoring e logging** (CloudWatch, Sentry, etc.)
8. **Backup regolari** del database

Vedi [DEPLOY.md](DEPLOY.md) per istruzioni AWS EC2.

---

## 📚 Migrazioni Database

### Visualizzare stato migrazioni
```bash
cd server
npx sequelize-cli db:migrate:status
```

### Eseguire migrazioni
```bash
npm run db:migrate
```

### Creare nuova migrazione
```bash
npx sequelize-cli migration:create --name add-new-column
```

---

## 🐛 Troubleshooting

### Errore connessione database
```bash
# Verifica che MySQL è in esecuzione
mysql -u admin-user-itineria -p -h 127.0.0.1 itineria_db

# Se usa Docker
docker-compose logs db-itineria
```

### Port già in uso
```bash
# Frontend (5173)
lsof -i :5173
kill -9 <PID>

# Backend (8080)
lsof -i :8080
kill -9 <PID>

# MySQL (3306)
lsof -i :3306
kill -9 <PID>
```

### Cookie non salvati
- Verifica CORS_ORIGIN sia corretto
- Assicurati che `credentials: true` è impostato nel frontend
- Controlla che i cookie non sono bloccati dal browser

### Migrazioni falliscono
```bash
# Resetta database (DEV ONLY!)
cd server
npx sequelize-cli db:drop
npx sequelize-cli db:create
npm run db:migrate
```

---

## 📄 Licenza

Questo progetto è licensiato sotto [LICENSE](LICENSE).

---

**Ultimo aggiornamento**: Maggio 2026
