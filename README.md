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

### Registrazione e autenticazione utenti
- ✅ **Registrazione** - Creazione di nuovi account utente con validazione
- ✅ **Login/Logout** - Sistema di autenticazione basato su JWT
- ✅ **Gestione Profilo** - Visualizzazione e modifica dei dati utente

### Itinerari
- ✅ **Creazione Itinerari** - Creazione di nuovi itinerari con waypoint e descrizioni
- ✅ **Lista degli itinerari** - Elenco di tutti gli itinerari dell'utente
- ✅ **Dettagli Itinerario** - Visualizzazione completa di un itinerario con tutti i waypoint
- ✅ **Modifica Itinerari** - Aggiornamento di itinerari esistenti
- ✅ **Eliminazione Itinerari** - Cancellazione di itinerari
- ✅ **Privacy** - Possibilità di rendere gli itinerari privati o pubblici

### Ricerca & Scoperta
- ✅ **Ricerca Itinerari** - Ricerca di itinerari pubblici in base alla destinazione

### Progressive Web App
- ✅ **Installabilità** - Installazione come app nativa (PWA)
- ✅ **Offline Support** - Funzionalità base disponibili anche offline
- ✅ **Service Worker** - Caching intelligente degli assets         (TODO da migliorare)

---

## 🏗️ Architettura
Single Page Application con framework Express che in produzione fornisce direttamente i file statici del frontend.
L'applicazione segue un'architettura **client-server monolitica** con separazione chiara tra frontend e backend.

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                         │
│  React 19 + Vite + React Router + Bootstrap                 │ genera l'interfaccia grafica e gestisce la navigazione delle rotte a frontend.
|                                                               esegue chiamate HTTP verso gli endpoint del server.
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express.js (Server)                        │
│  - JWT Authentication                                       │ Si occupa di validare i dati che riceve dal frontend, dell'autenticazione e
│  - Route handlers (auth, itineraries, profile)              │ autorizzazione degli utenti. Gestisce le richieste in arrivo ai vari endpoint.
│  - Cookie-based session management                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│           MySQL Database (via Sequelize ORM)                │
│  - Users                                                    │
│  - Itineraries                                              │
│  - Refresh Tokens                                           │
└─────────────────────────────────────────────────────────────┘
```
<img width="731" height="540" alt="system architecture drawio" src="https://github.com/user-attachments/assets/a6a0fd92-c2e6-46ae-9971-b28b6538f902" />
<br>

In produzione queste entità sono state organizzate con la seguente struttura:
  - Immagine docker caricata su AWS ECR (Elastic Container Registry)
  - In una macchina EC2 viene eseguito il container dell'app
  - Sempre su EC2 è stato installato il web server nginx che agisce anche da reverse proxy
  - è stato riservato il sotto dominio **travel-dream.duckdns.org**
  - Al web server è stato applicato un certificato SSL per la comunicazione tramite https e sicurezza dei dati
  - Il database mysql è in esecuzione all'interno del servizio AWS RDS
  - Sono state configurate delle specifiche regole all'interno del security group per:
    1. Far collegare l'admin del sistema da remoto alla macchina EC2 in ssh tramite l'apposita chiave privata.
    2. Permettere alla macchina EC2 di ricevere richieste sulla porta 80 e 443 da qualsiasi indirizzo ip
    3. Permettere all'admin di potersi collegare da remoto al database. In questo caso viene sfruttata la macchina EC2
      che funge da tunnel ssh.
    4. Alla macchina EC2 ho collegato un ip pubblico "fisso", in modo che se il server dovesse riavviarsi, anche cambiando ip,
      il riferimento pubblico rimarrebbe lo stesso. Per questa funzionalità ho utilizzato il servizio Elastic IP di AWS. Ho
      dovuto eseguire questa configurazione nel momento in cui sono andato a riservare un dominio pubblico su DuckDns.
<br>
<img width="852" height="648" alt="production_final_architecture" src="https://github.com/user-attachments/assets/225f65c4-53a3-46a5-acc1-a9974c4b6d90" />
<br>

## Flusso di Autenticazione

<br>
<img width="614" height="737" alt="Flusso di autenticazione" src="https://github.com/user-attachments/assets/1380874f-37ae-49a7-9646-cd0c5f205828" />
<br>


---

## 🛠️ Tecnologie utilizzate

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
- **Node.js 22 (Alpine)** - Js Runtime environment
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
  Per il **frontend** la scelta è ricaduta sulla combinazione di React come libreria per la costruzione dell'interfaccia grafica
  e Vite come build tool e ambiente di sviluppo.
  React è stato scelto per la semplicità di utilizzo per chi come me lo utilizza per la prima volta e soprattutto per
  la possibilità di costruire l'interfaccia grafica attraverso componenti riutilizzabili che facilitano la scrittura e la
  manutenibilità del codice. Attraverso il suo virtual DOM, React ottimizza gli aggiornamenti della pagina, caricando
  soltanto le parti del DOM che hanno effettivamente subito variazioni.
  
  Vite è attualmente lo strumento di costruzione delle app React più adatto. Garantisce facilità nella preparazione di un ambiente
  in cui costruire un'app React e attraverso il suo Hot Module Replacement Vite applica la modifica nel browser
  istantaneamente, senza dover ricaricare l'intera pagina e senza perdere lo stato dell'applicazione.

  Per il **backend** invece è stato scelto Node.js come ambiente runtime di javascript ed Express.js come framework.
  Entrambe sono state scelte per la facilità di utilizzo e per l'ampia community e documentazione a disposizione.
  Express è stato utilizzato per:
  - la creazione e gestione degli endpoint per le chiamate API
  - utilizzo di Middleware fondamentali per l'app, come la gestione dei cookies, json e CORS.

  Per quanto riguarda la **persistenza dei dati** è stato scelto un database relazionale come Mysql, in grado di
  memorizzare i dati degli utenti e degli itinerari e sopratutto perchè permette di memorizzare i dati in formato
  json e questo mi permette di avere una base di dati strutturata e solida, anche per un eventuale riutilizzo di questi dati.
  Per l'interazione con il database all'interno del progetto ho deciso di utilizzare l'ORM Sequelize per i seguenti motivi:
    - mappatura delle tabelle tabelle del database direttamente in classi e oggetti
    - interazione con i dati attraverso metodi nativi
    - gestione automatica delle relazioni tra tabelle
    - Utilizzo dei prepared statements
    - utilizzo delle migration per applicare modifiche alle tabelle. Questo è
    stato decisivo nella scelta per il porting del progetto in produzione, perchè in automatico
    Sequelize, ogni volta che rileva delle nuove migrations, le applica al database, senza doversi
    collegare da remoto direttamente al database e dover lanciare i comandi manualmente.

### 2. **Autenticazione**
- **JWT + Refresh Token Pattern**:
  In fase di autenticazione il sistema rilascia due token JWT:
    1. Access token, con validità 15 minuti, che sarà utilizzato per verificare l'identità e la validità della sessione dell'utente.
    2. Refresh token, con validità 1 giorno, che viene utilizzato per refreshare l'access token nel caso sia scaduto.
  
  Entrambi i token hanno l'opzione 'HttpOnly' per evitare che siano disponibili ad eventuali codici javascript malevoli.
- **Bcrypt**: 10 salt rounds per hashing sicuro


### 5. **Sicurezza**
- **CORS**: Viene utilizzato il middleware CORS di Express per lo scambio di risorse solo tra fonti valide
- **HttpOnly Cookies**: Protezione XSS
- **Password Hashing**: Bcrypt con salt
- **JWT Secrets**: Utilizzato per la firma dell'accessToken

### 6. **Build Monolitico**
- **Multi-stage Dockerfile**:
  - Stage 1: Build client React con Vite
  - Stage 2: Setup server Node + client compilato
- **Vantaggi**: Single deployment, versioning unificato
- **Scaling**: Client statico servito da Express, database separabile
  Il container che verrà generato poi comunicherà con l'istanza del database presente su
  AWS RDS.

### 7. **Progressive Web App**
- **Offline First**: Service worker per caching di alcune risorse
- **Installabilità**: Web manifest per "Add to Home Screen"

---

## 📋 Prerequisiti

### Per Docker (Consigliato)
- **Docker** >= 20.10
- **Docker Compose** >= 1.29

### Per Sviluppo Locale (opzionale)
- **Node.js** >= 18 (consigliato 20+)
- **npm** >= 9
- **MySQL** >= 8.0 (oppure via Docker)

---

## 🚀 Setup da Zero

### 1. Clone del Repository

```bash
git clone https://github.com/BellCrist/travel-diary.git
cd travel-diary
```

---

## ▶️ 2. Esecuzione

### Metodo 1: Docker Compose (Consigliato - Producton-like)

  (Utilizzare 'docker-compose' se in locale hai installato la versione 1, altrimenti
  utilizzare 'docker compose nei vari comandi)

**Primo avvio:**
```bash
docker compose up -d --build
```

**Avvii successivi:**
```bash
docker compose up -d
```

**Accedi a:** http://localhost:8080

**Verifica che i container sono in esecuzione**
```bash
docker compose ps
```

**Visualizza i log:**
```bash
docker compose logs -f server    # Solo backend
docker compose logs -f           # Tutti i servizi
```

**Stop:**
```bash
docker compose down
```
Questo sarebbe il risultato ottenuto:
<br>
<img width="451" height="321" alt="docker-container-architecture drawio drawio" src="https://github.com/user-attachments/assets/e2195cc1-2671-4cbd-8c36-c5b33f4e08e4" />


### Metodo 2: Sviluppo Locale (2 terminali)

Se preferisci sviluppare senza Docker:

**Setup iniziale (una volta sola):**
```bash
# Database via Docker (opzionale)
docker compose up -d db-itineria

# Server
cd server
#installa le dipendenze
npm install

#crea un nuovo file .env copiando all'interno il seguente contenuto:
NODE_ENV=development
PORT=8080
CORS_ORIGIN=http://localhost:5173
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=itineria_db
DB_USER=root
DB_PASSWORD=user-db-itineria
JWT_SECRET=your-secret-key

#lancia le migrations per il database
npm run db:migrate

cd ..

# Client
cd client
npm install
cd ..
```

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

### Variabili d'Ambiente

Le variabili sono definite direttamente nel `docker-compose.yml`. Per cambiarle, modifica il file:

```yaml
environment:
  NODE_ENV: development
  PORT: 8080
  DB_HOST: db-itineria
  DB_PORT: 3306
  DB_NAME: itineria_db
  DB_USER: root
  DB_PASSWORD: user-db-itineria
  JWT_SECRET: your_local_secret_key
```

---
## Pipeline CI/CD

  Per organizzare la pipeline di continuous integration continuous delivery/deployment
  sono state combinate le funzionalità di github actions con la struttura presente nell'ambiente
  di produzione AWS.
  Quindi per ogni push che viene eseguito nel branch main viene attivata la pipeline.
  Il flusso della pipeline è quello presente nella seguente immagine.
  La parte più difficile è stata quella di far comunicare github con i relativi servizi
  AWS. Questo è stato possibile configurando l'identity provider Open ID Connect e associandolo
  ad uno specifico IAM Role di tipo web identity, con i permessi per comunicare con il
  container registry e per inviare comandi all'agente SSM di AWS.
  
  Dopodichè anche la macchina EC2 è stata abilitata a comunicare con l'SSM agent e sono stati
  configurati i secrets all'interno della repository github per conservare in maniera sicura
  gli endpoint e le informazioni utili per comunicare con i servizi AWS.

  Infine il flusso specifico delle operazioni da eseguire è stato riportato all'interno del
  file deploy.yml dentro la cartella .github/workflows del progetto.
  
  <br>
  <img width="757" height="676" alt="deploy pipeline" src="https://github.com/user-attachments/assets/846fc15c-7c7b-449b-9400-11a730485008" />
  <br>

---
## 🧪 Testing

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

### Credenziali Database in locale

- **Database**: `itineria_db`
- **Username**: `root`
- **Password**: `user-db-itineria`
- **Host**: `localhost:3306`

---

## 📡 API Documentation

### Base URL
```
Development: vedere i vari riferimenti in base alla modalità di esecuzione dell'app in locale
Production: https://travel-dream.duckdns.org
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
- `refreshToken` (HttpOnly, 1 giorno)

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

## 📚 Migrazioni manuali database in locale

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
docker compose logs db-itineria
```
---

## 📄 Licenza

Questo progetto è licensiato sotto [LICENSE](LICENSE).

---

**Ultimo aggiornamento**: Giugno 2026
