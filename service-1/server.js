const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    status: "success",
    message: "Hello c'est Cyril et Abdou ! Service 1 opérationnel.",
    timestamp: new Date()
  });
});

app.listen(port, () => {
  console.log(`Service 1 en écoute sur le port ${port}`);
});