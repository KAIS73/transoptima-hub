FROM node:18-alpine
WORKDIR /app

# 1. Copia SOLO i file necessari per l'installazione
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 2. Copia il resto del codice
COPY . .

# 3. Esponi la porta e avvia
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/server.js"]