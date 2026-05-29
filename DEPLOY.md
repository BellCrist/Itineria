# Build e Deploy su AWS EC2

## 📦 Prerequisiti

- Account AWS
- Docker installato localmente (per testare)
- SSH client (per connettersi a EC2)

## 🏗️ Setup EC2

### 1. Creare un'istanza EC2

1. Vai a **AWS EC2 Dashboard**
2. Clicca **Launch instances**
3. Configura:
   - **AMI**: Ubuntu Server 24.04 LTS (Free Tier eligible)
   - **Instance type**: t3.small o t3.medium (consigliato)
   - **Storage**: 20-30 GB (SSD)
   - **Security Group**:
     - SSH (22): da tuo IP
     - HTTP (80): da 0.0.0.0/0
     - HTTPS (443): da 0.0.0.0/0
     - Port 8080 (opzionale): da 0.0.0.0/0

### 2. Connetti a EC2

```bash
# Assicurati che il file .pem ha permessi corretti
chmod 400 your-key-pair.pem

# Connettiti all'istanza
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip
```

## 🐳 Installazione Docker su EC2

```bash
# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Installa Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Aggiungi user ubuntu al gruppo docker
sudo usermod -aG docker ubuntu

# Logout e login per applicare i cambiamenti
exit
# Riconnettiti con SSH
```

## 🚀 Deploy dell'app

### 2. Crea il file .env per la produzione

```bash
# Copia il template e modifica i valori
cp .env.production.example .env.production

# Modifica con il tuo editor
nano .env.production
```

Assicurati di configurare:
- `CORS_ORIGIN`: Il dominio del tuo frontend (es: https://myapp.com)
- `DB_HOST`: Hostname del database MySQL
- `DB_USER`: Username database
- `DB_PASSWORD`: Password database
- `DB_NAME`: Nome database

### 3. Build dell'immagine Docker

```bash
# Build l'immagine
docker build -t itinerary-app:latest .

# Verifica che il build è completato
docker images | grep itinerary-app
```

### 4. Esegui il container

```bash
# Esegui il container in background
docker run -d \
  --name itinerary-app \
  -p 80:8080 \
  --restart unless-stopped \
  --env-file .env.production \
  itinerary-app:latest

# Verifica che il container è in running
docker ps
```

### 5. Verifica che l'app funziona

```bash
# Test dell'app
curl http://localhost:8080

# Vedi i log del container
docker logs itinerary-app

# Follow i log in tempo reale
docker logs -f itinerary-app
```

## 🔄 Aggiornare l'app


## 🔐 Setup HTTPS con Let's Encrypt

### 1. Installa Certbot

```bash
sudo apt-get install certbot python3-certbot-nginx -y
```

### 2. Configura Nginx come reverse proxy

Crea `/etc/nginx/sites-available/default`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Installa e configura Nginx

```bash
sudo apt-get install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4. Ottieni il certificato SSL

```bash
sudo certbot --nginx -d your-domain.com
```

Segui le istruzioni di Certbot. Il certificato si rinnoverà automaticamente.

## 📊 Monitoraggio

### Visualizza lo stato del container

```bash
# Status
docker ps

# Statistiche (CPU, memoria)
docker stats itinerary-app

# Inspeciona il container
docker inspect itinerary-app
```

### Svuota i log

```bash
# Se i log diventano troppo grandi
docker logs --tail 100 itinerary-app > app.log
docker logs -f itinerary-app
```

## 🐛 Troubleshooting

### L'app non si avvia

```bash
# Vedi gli errori
docker logs itinerary-app

# Se il container non esiste, ricrea
docker run -d \
  --name itinerary-app \
  -p 80:8080 \
  --restart unless-stopped \
  --env-file .env.production \
  itinerary-app:latest
```

### Porta già in uso

```bash
# Trova cosa occupa la porta 8080
sudo lsof -i :8080

# O kill il processo
docker stop itinerary-app
docker rm itinerary-app
```

### Database non raggiungibile

- Verifica che il database è online
- Controlla il security group dell'istanza RDS
- Verifica le credenziali in `.env.production`
- Testa la connessione:

```bash
docker exec itinerary-app node -e "console.log('Test')"
```

## 📝 Struttura su EC2


## 🔄 Auto-restart del container

Il container riavvia automaticamente grazie a `--restart unless-stopped`. Se l'EC2 riavvia:

```bash
# I container riavviano automaticamente
docker ps  # Verifica

# Se serve, puoi creare uno script di startup
# /home/ubuntu/start-app.sh
#!/bin/bash
cd /home/ubuntu/itinerary-app
docker start itinerary-app || docker run -d \
  --name itinerary-app \
  -p 80:8080 \
  --restart unless-stopped \
  --env-file .env.production \
  itinerary-app:latest
```

Aggiungi uno cron job per eseguirlo al boot:
```bash
sudo crontab -e
# Aggiungi: @reboot /home/ubuntu/start-app.sh
```
