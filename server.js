// Import des bibliothèques nécessaires
const express = require('express');  // Pour créer le serveur web
const sqlite3 = require('sqlite3').verbose();  // Pour la base de données
const cors = require('cors');  // Pour permettre les requêtes depuis React

// Configuration du serveur
const app = express();
// Permet aux requêtes depuis React
app.use(cors());
// Permet de lire les données JSON envoyées
app.use(express.json());

// Création de la base de données SQLite
const db = new sqlite3.Database(':memory:');  // Base de données en mémoire

db.serialize(() => {
  // Création de la table emails
  // id: identifiant unique
  // email: l'adresse email
  // UNIQUE: empêche les doublons
  db.run('CREATE TABLE emails (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE)');
});

// Route pour ajouter un email
app.post('/api/emails', (req, res) => {
  // On récupère l'email envoyé
  const { email } = req.body;
  
  // Vérification que c'est un email valide
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Insertion dans la base de données
  db.run(
    'INSERT INTO emails (email) VALUES (?)',  // La requête SQL
    [email],  // Les données à insérer
    function(err) {
      if (err) {
        // Si erreur (par exemple email déjà existant)
        return res.status(400).json({ error: err.message });
      }
      // Si tout va bien, on renvoie l'email ajouté
      res.json({ id: this.lastID, email });
    }
  );
});

// Route pour récupérer tous les emails
app.get('/api/emails', (req, res) => {
  // Récupération de tous les emails
  db.all('SELECT * FROM emails', [], (err, rows) => {
    if (err) {
      // Si erreur
      return res.status(400).json({ error: err.message });
    }
    // Si tout va bien, on renvoie la liste
    res.json(rows);
  });
});

// Configuration du port du serveur
const PORT = 3001;
// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
