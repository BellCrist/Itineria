# 🌍 Itinerary App

Una moderna applicazione web full-stack per creare, gestire e condividere itinerari di viaggio. Gli utenti possono pianificare i loro viaggi con waypoint dettagliati, salvare i propri itinerari e visualizzare i dettagli delle loro destinazioni.

La web app è disponibile al seguente URL: https://travel-dream.ddnsfree.com/

---

## 📋 Indice

- [Funzionalità](#-funzionalità)
- [Architettura](#️-architettura)
- [Tecnologie](#️-tecnologie-utilizzate)
- [Scelte Progettuali](#-scelte-progettuali)
- [CI/CD pipeline](#pipeline-cicd)
- [Configurazione cloud](#configurazione-cloud)
- [Prerequisiti](#-prerequisiti)
- [Setup da Zero](#-setup-da-zero)
- [Esecuzione](#️-2-esecuzione)
- [Credenziali di Prova](#-credenziali-di-prova)
- [API Documentation](#-api-documentation)

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

## 📦 Librerie di Terze Parti

### Frontend
| Libreria | Versione | Descrizione |
|----------|----------|-------------|
| **react** | ^19.2.4 | Libreria principale per la costruzione dell'interfaccia utente basata su componenti |
| **react-dom** | ^19.2.4 | Entry point di React per il rendering nel DOM del browser |
| **react-router-dom** | ^7.13.2 | Gestione del routing lato client per la navigazione SPA senza reload |
| **bootstrap** | ^5.3.8 | Framework CSS per componenti UI responsive e pre-stilizzati |
| **react-bootstrap** | ^2.10.10 | Wrapper React per i componenti Bootstrap con sintassi JSX |
| **bootstrap-icons** | ^1.13.1 | Set di icone SVG di Bootstrap |
| **react-bootstrap-icons** | ^1.11.6 | Wrapper React per le icone Bootstrap |
| **react-select** | ^5.10.2 | Dropdown avanzato con ricerca e selezione multipla |
| **js-cookie** | ^3.0.5 | Utility per la lettura, scrittura e cancellazione di cookie |
| **vite** | ^8.0.1 | Build tool moderno e dev server con HMR istantanea |
| **vite-plugin-pwa** | ^1.2.0 | Plugin Vite per abilitare le funzionalità Progressive Web App |

### Backend
| Libreria | Versione | Descrizione |
|----------|----------|-------------|
| **express** | ^5.2.1 | Framework web minimale per la creazione di server Node.js e API REST |
| **sequelize** | ^6.37.8 | ORM per l'interazione con il database MySQL tramite modelli JavaScript |
| **mysql2** | ^3.22.3 | Driver MySQL per Node.js ad alte prestazioni |
| **bcrypt** | ^6.0.0 | Hashing sicuro di password con salt automatico |
| **jsonwebtoken** | ^9.0.3 | Creazione e verifica di token JWT per l'autenticazione |
| **cookie-parser** | ^1.4.7 | Middleware Express per il parsing automatico dei cookie |
| **cors** | ^2.8.6 | Middleware Express per la gestione della Cross-Origin Resource Sharing |
| **dotenv** | ^17.4.2 | Caricamento delle variabili d'ambiente da file .env |
| **@aws-sdk/client-ssm** | ^3.1060.0 | Client AWS per l'accesso a Parameter Store (gestione secrets) |

### Development
| Libreria | Versione | Descrizione |
|----------|----------|-------------|
| **nodemon** | ^3.1.14 | Monitor di file Node.js che riavvia automaticamente il server su modifiche |
| **sequelize-cli** | ^6.6.5 | CLI per Sequelize per la creazione e gestione di migration |
| **eslint** | ^9.39.4 | Linter JavaScript per identificare e segnalare errori di codice |
| **vite-plugin-react** | ^6.0.1 | Plugin Vite per il fast refresh e l'ottimizzazione React |

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

**Avvio del frontend**
```bash
cd client
npm run dev
```

**Accedi a:** http://localhost:5173

La scelta di runnare il client al di fuori del container in fase di sviluppo permette
di osservare immediatemente le modifiche applicate al frontend sfruttando l'HMR di Vite,
senza dover ogni volta rifare la build del progetto.

**Verifica che i container sono in esecuzione**
```bash
docker compose ps
```

**Visualizza i log:**
```bash
docker logs -f server-container    # Solo backend
docker logs -f mysql-container     # Tutti i servizi
```

(Il container del database impiega sempre qualche attimo in più
del container dell'app, quindi fin quando il mysql-container non sarà
completamente caricato, localhost o 127.0.0.1 non risponderanno.
Quindi utilizza i comandi dei log per vedere lo stato dei vari container)

**Stop:**
```bash
docker compose down
```
Questa sarebbe la struttura finale:
<br>
<img width="511" height="361" alt="docker-container-architecture drawio drawio" src="https://github.com/user-attachments/assets/efe2f7bb-c925-48b2-8283-906689ae8ad9" />



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
npm install --legacy-peer-deps
"(nel caso ci fossero problemi con i permessi dell'utente dovuti ad una vecchia esecuzione
tramite il metodo 1 con docker, lancia il seguente comando:
sudo chown -R $USER:$USER /path_del_progetto_in_locale/travel-diary/client)"
cd ..
```

**Terminal 1 - Server Express**
```bash
cd ../server
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
  Inoltre sulla repository github sono stati utilizzati i secrets per conservare in maniera sicura
  le credenziali e le informazioni sensibili per il flusso.
  
  1. GitHub Actions esegue il login su Amazon ECR e carica la nuova immagine creata
  2. Tra le github action viene ordinato il refresh delle istanze all'auto scaling configurato su AWS
  3. L'Auto Scaling Group distrugge progressivamente le vecchie istanze EC2 e ne accende di nuove basate
  sul Launch Template di default. Ogni nuova istanza nasce con un IAM Role che le permette di comunicare
  con AWS ECR.
  Il template che viene utilizzato per queste istanze contiene alcune operazioni fondamentali per il flusso
  della pipeline dentro la sezione "User data", come:
    3.1 configurazione nginx
    3.2 autenticazione su ECR
    3.3 pull dell'immagine
    3.4 avvio del container
  
  <br>
  <img width="735" height="676" alt="new-deploy-pipeline" src="https://github.com/user-attachments/assets/bd262f89-f63e-4d59-9e8d-3da81f2ccf7c" />

  <br>

---

## Configurazione cloud

Di seguito una breve descrizione di come sono state organizzate tutte le varie entità per costruire e deployare l'applicativo:
  - Immagine docker caricata su AWS ECR (Elastic Container Registry)
  - In una macchina EC2 viene eseguito il container dell'app
  - Sempre su EC2 è stato installato il web server nginx che agisce anche da reverse proxy
  - è stato riservato il sotto dominio **travel-dream.ddnsfree.com**
  - Per il certificato SSL è stato utilizzato il servizio AWS Certificate Manager
  - Il database mysql è in esecuzione all'interno del servizio AWS RDS, disponibile all'interno della
    stessa VPC delle istanze EC2 e accessibile dalle regole del security group delle istanze EC2.
  - Sono state configurate delle specifiche regole all'interno del security group per:
    1. Far collegare l'admin del sistema da remoto alla macchina EC2 in ssh tramite l'apposita chiave privata.
    2. Permettere alla macchina EC2 di ricevere richieste sulla porta 80 dall'application load balancer
    3. Permettere all'admin di potersi collegare da remoto al database. In questo caso viene sfruttata la macchina EC2
      che funge da tunnel ssh.
<br>
<img width="998" height="801" alt="new-production-system-structure" src="https://github.com/user-attachments/assets/5f9e014d-49e2-496c-a23c-75970d14243e" />

<br>

Il servizio di Dynamic DNS ospita il dominio pubblico travel-dream.ddnsfree.com. Invece di mappare un indirizzo IP statico (che cambierebbe a ogni ricreazione delle istanze),
su Dynu ho configurato un record CNAME che punta direttamente all'endpoint DNS dell'Application Load Balancer (ALB) di AWS.

L'ALB funge da unico punto di contatto pubblico con l'infrastruttura.
È configurato con due listener: uno sulla porta 80 (HTTP) e uno sulla porta 443 (HTTPS).
L'application load balancer si occupa anche della gestione del certificato SSL ricavato da AWS Certificate Manager.
L'ALB riceve il traffico cifrato dagli utenti, lo decifra e lo inoltra in HTTP normale verso la rete interna (VPC).
Nel load balancer sono configurate 2 Availability Zones: eu-sout-1c e eu-south-1a, poi in base al traffico di rete
smista le richieste nelle varie istanze disponibili all'interno del target group.

Le varie istanze che vengono generate o disattivate sono gestite dall'auto scaling.
Questo servizio controlla sempre le richieste nelle varie istanze attive ed in base al traffico
decice di attivare nuove istanze o disattivare quelle esistenti in base a delle regole impostate (nel mio caso il range 1-4).
Le nuove istanze che l'auto scaling genera si avviano utilizzando il launch template di default con
all'interno un IAM Role, un'immagine AMI base da cui partire e dei comandi da lanciare utili
per l'avvio del container dell'app.

---
## 👤 Credenziali di Prova

### Utente di Test
```
email: u.test@gmail.com
password: 5Rh3q9SPjBaDf7z!j4$P
```

Questo utente può essere utilizzato per visualizzare le funzionalità
dell'applicativo perchè contiene già dei dati e degli itinerari dimostrativi.
Altrimenti è comunque possibile registrare un nuovo utente attraverso
l'interfaccia grafica dell'app.


### Credenziali Database in sviluppo locale

- **Database**: `itineria_db`
- **Username**: `root`
- **Password**: `user-db-itineria`
- **Host**: `localhost:3306`

---

## 📡 API Documentation

### Base URL
```
Development: vedere i vari riferimenti in base alla modalità di esecuzione dell'app in locale
Production: https://travel-dream.ddnsfree.com
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

## 📄 Licenza

Questo progetto è licensiato sotto [LICENSE](LICENSE).

---

**Ultimo aggiornamento**: Giugno 2026
