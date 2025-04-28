import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

// Middleware base
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 🚑 Health Check per Render
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

// 🌐 Fallback SPA (serve index.html per tutte le altre rotte)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 🚀 Avvia server su IP 0.0.0.0 (Richiesto da Render)
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server avviato sulla porta ${PORT}`);
});
