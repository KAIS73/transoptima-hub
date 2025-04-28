import express from 'express';
const app = express();

// Health Check semplificato
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Server base funzionante',
    timestamp: new Date().toISOString()
  });
});

// Avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server avviato su porta ${PORT}`);
});