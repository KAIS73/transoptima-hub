# TransOptima Hub - Deploy Guide

## Prerequisiti
- Server Ubuntu/Debian
- Docker e Docker Compose installati
- Dominio configurato
- Certbot installato per HTTPS

## Passaggi
1. Clonare il repository:
   git clone https://github.com/tuo-utente/transoptima-hub.git
   cd transoptima-hub

2. Creare il file .env.production:
   (usare i dati reali)

3. Buildare i container:
   docker-compose -f docker-compose.prod.yml build

4. Avviare i container:
   docker-compose -f docker-compose.prod.yml up -d

5. Configurare Nginx (reverse proxy + HTTPS)

6. Monitorare i log:
   docker logs -f transoptima-app

## Comandi utili
- Fermare tutto:
  docker-compose -f docker-compose.prod.yml down

- Ricostruire tutto:
  docker-compose -f docker-compose.prod.yml up -d --build