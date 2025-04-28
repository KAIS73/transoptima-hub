# Costruzione ambiente
FROM node:18-alpine

# Crea cartella di lavoro
WORKDIR /app

# Copia solo i pacchetti
COPY package*.json ./

# Installa dipendenze (solo produzione)
RUN npm install --production

# Copia tutto il resto del progetto
COPY . .

# Genera Prisma Client
RUN npx prisma generate

# Espone la porta per Render
EXPOSE 3000

# Comando di avvio
CMD ["npm", "start"]
