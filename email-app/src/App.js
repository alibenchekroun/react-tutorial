// On importe React et deux outils super importants : useState et useEffect
// - useState permet de créer et manipuler des variables qui changent dans le temps (état)
// - useEffect permet de déclencher des actions quand le composant s'affiche ou quand certaines variables changent
import React, { useState, useEffect } from 'react';

// On importe notre client Supabase (le téléphone magique pour parler à la base de données)
import { supabase } from './supabase';
// On importe les styles CSS pour que l'app soit jolie
import './App.css';

// Ici commence notre composant principal App
// Un composant React, c'est comme une fonction qui retourne du HTML dynamique
function App() {
  // === ÉTATS REACT ===
  // Ici on crée 4 "boîtes" (états) pour stocker des infos qui peuvent changer :
  // - email : ce que l'utilisateur tape dans le champ (string)
  // - emails : la liste de tous les emails stockés (tableau)
  // - totalEmails : le nombre total d'emails ajoutés (nombre)
  // - error : un message d'erreur à afficher si quelque chose ne va pas (string)
  // État pour stocker l'email en cours de saisie
  const [email, setEmail] = useState('');
  // État pour stocker la liste des emails
  const [emails, setEmails] = useState([]);
  // État pour l'accumulation
  const [totalEmails, setTotalEmails] = useState(0);
  // État pour les erreurs
  const [error, setError] = useState('');

  // === FONCTION POUR ALLER CHERCHER LES EMAILS DEPUIS SUPABASE ===
  // Cette fonction va demander à la base de données tous les emails stockés
  // Elle est asynchrone car on doit attendre la réponse de Supabase (ça peut prendre un peu de temps)
  const fetchEmails = async () => {
    try {
      console.log('Début de la récupération des emails...');
      // On demande à Supabase tous les emails, triés du plus récent au plus ancien
      const { data, error } = await supabase
        .from('emails')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Données reçues:', data);
      console.log('Erreur:', error);

      if (error) throw error; // Si Supabase renvoie une erreur, on la signale
      setEmails(data || []); // Sinon, on met à jour la liste des emails
    } catch (err) {
      setError('Erreur lors de la récupération des emails');
      console.error('Erreur complète:', err);
    }
  };

  // === FONCTION POUR AJOUTER UN EMAIL ===
  // Cette fonction s'exécute quand l'utilisateur soumet le formulaire
  // Elle envoie le nouvel email à Supabase et met à jour l'affichage
  const handleSubmit = async (e) => {
    e.preventDefault(); // On empêche le rechargement de la page (comportement par défaut d'un formulaire)
    setError(''); // On efface les anciens messages d'erreur

    try {
      console.log('Tentative d\'ajout de l\'email:', email);
      // On demande à Supabase d'ajouter le nouvel email dans la base
      const { error } = await supabase
        .from('emails')
        .insert([{ email }]);

      console.log('Résultat de l\'insertion:', { error });

      if (error) throw error; // Si Supabase renvoie une erreur, on la signale

      // Si tout va bien :
      setTotalEmails(prev => prev + 1); // On augmente le compteur
      setEmail(''); // On vide le champ de saisie
      fetchEmails(); // On recharge la liste des emails
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'email');
      console.error('Erreur complète:', err);
    }
  };

  // === useEffect : ACTION AU CHARGEMENT DE LA PAGE ===
  // Ce bloc s'exécute UNE FOIS quand la page se charge (tableau vide en 2e argument)
  // On va chercher la liste des emails dès le début
  useEffect(() => {
    fetchEmails();
  }, []);

  // === AFFICHAGE DU COMPOSANT ===
  // Ici, on retourne le "HTML" de la page (en réalité, c'est du JSX, un mélange de JS et de HTML)
  return (
    <div className="App"> {/* La classe CSS "App" permet de styliser ce bloc */}
      <h1>Stockage d'Emails</h1>
      
      {/* Formulaire d'ajout d'email */}
      <form onSubmit={handleSubmit}> {/* onSubmit est l'événement qui déclenche handleSubmit quand on clique sur "Ajouter" */}
        <input
          type="email" // Champ spécial pour saisir un email (le navigateur vérifie le format)
          value={email} // La valeur affichée dans le champ vient de l'état "email"
          onChange={(e) => setEmail(e.target.value)} // À chaque frappe, on met à jour l'état "email"
          placeholder="Entrez votre email" // Texte d'aide affiché quand le champ est vide
          required // Empêche d'envoyer le formulaire si le champ est vide
          style={{ padding: '8px', width: '300px', marginRight: '10px' }} // Style en ligne (CSS)
        />
        <button type="submit">Ajouter</button> {/* Bouton pour soumettre le formulaire */}
      </form>

      {/* Affichage des erreurs en rouge */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Statistiques */}
      <div>
        <h2>Statistiques</h2>
        <p>Total d'emails ajoutés : {totalEmails}</p>
      </div>

      {/* Liste des emails stockés */}
      <h2>Emails stockés</h2>
      <ul>
        {/* On parcourt la liste des emails et on affiche chaque email dans un <li> */}
        {emails.map((email) => (
          <li key={email.id}>{email.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
