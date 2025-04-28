import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health check (obbligatorio per Render!)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Rotta fallback per SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Avvio server su 0.0.0.0
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server avviato su http://0.0.0.0:${PORT}`);
});
