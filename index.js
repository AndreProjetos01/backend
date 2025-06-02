// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// CORS liberado para qualquer origem
app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());

let ultimoDado = null;

// Rota para receber os dados do Arduino
app.post('/api/sensores', (req, res) => {
  console.log('Dado recebido:', req.body);
  ultimoDado = {
    ...req.body,
    timestamp: new Date()
  };
  res.status(200).send({ message: 'Dados recebidos com sucesso!' });
});

// Rota para fornecer os dados ao Angular
app.get('/api/sensores', (req, res) => {
  if (ultimoDado) {
    res.json(ultimoDado);
  } else {
    res.status(204).send(); // No Content
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
