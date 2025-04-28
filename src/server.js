import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health Check per Render
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Server pronto 🚀',
    timestamp: new Date().toISOString()
  });
});

// Route API di test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funzionante' });
});

// Rotta di fallback (Single Page Application - SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Avvio server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server avviato su http://0.0.0.0:${PORT}`);
});
