# Application React - Stockage d'Emails avec Supabase

Cette application simple vous permet de comprendre les concepts de base de React et de l'intégration avec Supabase.

## Structure du Projet

### 1. Configuration du Projet (`package.json`)
```json
{
  "name": "email-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@supabase/supabase-js": "^2.49.8",  // Bibliothèque pour communiquer avec Supabase
    "react": "^19.1.0",                 // Bibliothèque React
    "react-dom": "^19.1.0",             // Bibliothèque React DOM
    "react-scripts": "5.0.1"             // Scripts de développement React
  }
}
```

### 2. Configuration de Supabase (`src/supabase.js`)
```javascript
// Configuration de la connexion à Supabase
const supabaseUrl = 'https://gvmwcbnumuffpkkjehpf.supabase.co';
const supabaseKey = 'YOUR_ANON_KEY';

// Création du client Supabase qui nous permettra d'interagir avec la base de données
export const supabase = createClient(supabaseUrl, supabaseKey);
```

### 3. Composant Principal (`src/App.js`)
```javascript
// Import des dépendances React et du client Supabase
import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

function App() {
  // États React pour gérer les données
  const [email, setEmail] = useState('');         // Email en cours de saisie
  const [emails, setEmails] = useState([]);      // Liste des emails stockés
  const [totalEmails, setTotalEmails] = useState(0); // Compteur d'emails
  const [error, setError] = useState('');        // Gestion des erreurs

  // Fonction pour récupérer les emails depuis Supabase
  const fetchEmails = async () => {
    try {
      const { data, error } = await supabase
        .from('emails')                 // Table 'emails' dans Supabase
        .select('*')                    // Sélectionne toutes les colonnes
        .order('created_at', { ascending: false }); // Ordre décroissant par date

      if (error) throw error;
      setEmails(data || []);
    } catch (err) {
      setError('Erreur lors de la récupération des emails');
    }
  };

  // Fonction pour ajouter un email
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { error } = await supabase
        .from('emails')
        .insert([{ email }]);  // Insertion de l'email dans la base

      if (error) throw error;

      setTotalEmails(prev => prev + 1);  // Mise à jour du compteur
      setEmail('');                      // Réinitialisation du champ
      fetchEmails();                     // Récupération des emails mis à jour
    } catch (err) {
      setError('Erreur lors de l'ajout de l'email');
    }
  };

  // Récupération initiale des emails au chargement
  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="App">
      <h1>Stockage d'Emails</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Statistiques</h2>
        <p>Total d'emails ajoutés : {totalEmails}</p>
      </div>

      <h2>Emails stockés</h2>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>{email.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 4. Styles (`src/App.css`)
```css
.App {
  text-align: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.App input[type="email"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.App button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.App button:hover {
  background-color: #45a049;
}

.App ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.App li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
```

## Comment ça fonctionne ?

1. **Architecture React**
   - Utilisation de `useState` pour gérer l'état de l'application
   - Utilisation de `useEffect` pour les opérations asynchrones
   - Composant fonctionnel pour une meilleure maintenabilité

2. **Communication avec Supabase**
   - Utilisation de la bibliothèque `@supabase/supabase-js`
   - Opérations CRUD simples (Create, Read)
   - Gestion des erreurs avec try/catch

3. **Interface Utilisateur**
   - Formulaire simple pour entrer un email
   - Liste dynamique des emails ajoutés
   - Compteur d'emails ajoutés
   - Messages d'erreur en cas de problème

## Déploiement

L'application est configurée pour être déployée sur GitHub Pages :
```json
{
  "homepage": "https://alibenchekroun.github.io/email-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

Pour déployer :
1. `npm run build` - Crée une version optimisée de l'application
2. `npm run deploy` - Déploie sur GitHub Pages
