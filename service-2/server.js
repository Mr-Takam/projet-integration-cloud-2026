const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configuration de la connexion via le DNS interne de Kubernetes
const pool = new Pool({
  user: 'admin',
  host: 'postgres-service', // Le nom du service K8s créé juste au-dessus !
  database: 'projetdb',
  password: 'admin123',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW() as db_time');
    
    res.json({
      service: "Service 2",
      message: "Connexion à PostgreSQL RÉUSSIE !",
      database_time: dbRes.rows[0].db_time,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur de connexion BDD", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Service 2 prêt sur le port ${port}`);
});