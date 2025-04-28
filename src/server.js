import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import initializeSocketIO from './socket.js';
import { connectDB } from './db.js';

// Environment variables
import dotenv from 'dotenv';
dotenv.config();

// Initialize Express app
const app = express();
const server = createServer(app);

// Connect to Database
connectDB();

// Setup middlewares
app.use(morgan('combined'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(helmet());
app.use(cors());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Static folder setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// SPA fallback (for React, Vue, etc)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initialize Socket.io
initializeSocketIO(server);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
