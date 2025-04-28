# Usa Node.js ufficiale
FROM node:18-alpine

# Crea una directory di lavoro
WORKDIR /app

# Copia package.json e installa le dipendenze
COPY package*.json ./
RUN npm install

# Copia il resto del codice
COPY . .

# Genera Prisma Client (se usi Prisma)
RUN npx prisma generate

# Espone la porta 3000
EXPOSE 3000

# Avvia il server
CMD ["npm", "start"]
