<<<<<<< HEAD
// Import des bibliothèques React nécessaires
import React from 'react';
import { createRoot } from 'react-dom/client';

// Notre composant principal App
const App = () => {
  // État pour stocker l'email actuel que l'utilisateur tape
  const [email, setEmail] = React.useState('');
  // État pour stocker la liste des emails déjà stockés
  const [emails, setEmails] = React.useState([]);
  // État pour afficher les erreurs éventuelles
  const [error, setError] = React.useState('');

  // Hook qui s'exécute une seule fois au démarrage
  React.useEffect(() => {
    // On appelle la fonction pour récupérer les emails existants
    fetchEmails();
  }, []);

  // Fonction qui récupère les emails depuis le serveur
  const fetchEmails = async () => {
    try {
      // On fait une requête GET vers notre serveur
      const response = await fetch('http://localhost:3001/api/emails');
      // On convertit la réponse en JSON
      const data = await response.json();
      // On met à jour l'état avec la liste des emails
      setEmails(data);
    } catch (err) {
      // Si une erreur se produit, on l'affiche
      setError('Error fetching emails');
    }
  };

  // Fonction qui gère la soumission du formulaire
  const handleSubmit = async (e) => {
    // On empêche le comportement par défaut du formulaire
    e.preventDefault();
    // On réinitialise l'erreur précédente
    setError('');

    try {
      // On fait une requête POST vers notre serveur
      const response = await fetch('http://localhost:3001/api/emails', {
        // On spécifie que c'est une requête POST
        method: 'POST',
        // On dit que le contenu est en JSON
        headers: {
          'Content-Type': 'application/json',
        },
        // On envoie l'email que l'utilisateur a tapé
        body: JSON.stringify({ email }),
      });

      // Si la réponse n'est pas OK, on affiche l'erreur
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error adding email');
      }

      // On vide le champ email
      setEmail('');
      // On rafraîchit la liste des emails
      fetchEmails();
    } catch (err) {
      // Si une erreur se produit, on l'affiche
      setError(err.message);
    }
  };

  // Ce qui est rendu à l'écran
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Minimal Email Storage</h1>
      
      // Le formulaire pour entrer un email
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        // Champ de saisie pour l'email
        <input
          type="email"  // Type spécial pour les emails
          value={email}  // La valeur actuelle
          onChange={(e) => setEmail(e.target.value)}  // Met à jour l'état quand on tape
          placeholder="Enter email"  // Texte qui s'affiche quand le champ est vide
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}  // Style CSS
          required  // Le champ est obligatoire
        />
        // Bouton pour soumettre le formulaire
        <button type="submit" style={{ padding: '8px 16px' }}>Add Email</button>
      </form>

      // Affiche l'erreur si il y en a une
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Stored Emails</h2>
      // Liste des emails stockés
      <ul style={{ textAlign: 'left', listStyleType: 'none', padding: '0' }}>
        // Pour chaque email dans la liste, on crée un élément de liste
        {emails.map((email) => (
          <li key={email.id} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
            {email.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Configuration de React pour afficher notre application
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> b923f0a (Initial commit)
