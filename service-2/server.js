const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    service: "Service 2",
    message: "Réponse envoyée avec succès au Service 1 !",
    timestamp: new Date()
  });
});

app.listen(port, () => {
  console.log(`Service 2 prêt sur le port ${port}`);
});