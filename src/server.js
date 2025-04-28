import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { connectDB } from './db.js';
import initializeSocketIO from './socket.js';
import dotenv from 'dotenv';

// Configurazione environment variables
dotenv.config();

// Inizializza Express
const app = express();
const server = createServer(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Connessione al database
connectDB();

// Middleware
app.use(morgan('combined'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(helmet());

// CORS (configura in produzione!)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || false
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100, // 100 richieste per IP
});
app.use(limiter);

// File statici (frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Health Check per Render (DEVE essere prima di app.listen!)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    db: 'connected', // Aggiungi altri check se necessario
    timestamp: new Date().toISOString() 
  });
});

// API Routes (esempio)
app.get('/api/status', (req, res) => {
  res.json({ version: '1.0.0', environment: process.env.NODE_ENV });
});

// Fallback per SPA (React/Vue/Angular)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Inizializza WebSocket
initializeSocketIO(server);

// Avvia server (usa 0.0.0.0 per Render!)
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🚀 Server avviato su porta ${PORT}
  ➡️ Ambiente: ${process.env.NODE_ENV || 'development'}
  ➡️ Health check: http://localhost:${PORT}/health
  `);
});

// Gestione errori globale
process.on('unhandledRejection', (err) => {
  console.error('❌ Errore non gestito:', err);
});