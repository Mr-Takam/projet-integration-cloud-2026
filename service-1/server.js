const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    // Appel du Service 2 via le DNS interne de Kubernetes
    const response = await fetch('http://service2-service');
    const data = await response.json();
    
    res.json({
      status: "success",
      message: "Cyril & Abdou : Service 1 a reçu une réponse du Service 2 !",
      service2_data: data
    });
  } catch (error) {
    res.status(500).json({ error: "Impossible de joindre le Service 2" });
  }
});

app.listen(port, () => {
  console.log(`Service 1 (Proxy) en écoute sur le port ${port}`);
});