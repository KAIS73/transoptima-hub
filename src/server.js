import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurazione base
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

// Middleware essenziali
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health Check SPECIFICO per Render (obbligatorio!)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Server is ready',
    timestamp: new Date().toISOString()
  });
});

// Rotta di fallback per il frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Avvio server (CRUCIALE per Render)
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server avviato su http://0.0.0.0:${PORT}`);
});