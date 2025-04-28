import express from 'express';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

// Health Check con timeout (obbligatorio per Render)
app.get('/health', (req, res) => {
  res.status(200).send('OK'); // Risposta SEMPLICE senza JSON
});

// Avvio server CON GESTIONE ERRORI
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server in ascolto su http://0.0.0.0:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Errore avvio server:', err.message);
  process.exit(1); // Termina il processo in caso di errore
});