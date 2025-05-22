// On importe la fonction 'fetch' pour faire des requêtes HTTP (c'est comme envoyer une lettre sur Internet)
const fetch = require('node-fetch').default;

// === CONFIGURATION DE SUPABASE ===
// L'URL de ton projet Supabase (c'est l'adresse de ta base de données sur Internet)
const supabaseUrl = 'https://gvmwcbnumuffpkkjehpf.supabase.co';
// La clé secrète pour accéder à ta base (comme un mot de passe, à ne pas partager publiquement)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bXdjYm51bXVmZnBra2plaHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NzMzODUsImV4cCI6MjA2MjM0OTM4NX0.tAYeiO8BtoDkVUYtzifgnk_lg_hePSI7nusdHwO42N4';

// === LISTE DES REQUÊTES SQL À EXÉCUTER ===
// Ici on prépare des "ordres" à donner à la base de données (comme des recettes à suivre)
const sqlQueries = [
  // On crée une table appelée 'emails' pour stocker les emails
  `CREATE TABLE emails (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, // Un identifiant unique généré automatiquement
    email TEXT NOT NULL,                           // L'email (obligatoire)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() // La date de création, ajoutée automatiquement
  )`,
  // On autorise tout le monde connecté à ajouter des emails
  `CREATE POLICY "Public insert access" ON emails
    FOR INSERT TO authenticated
    WITH CHECK (true)`,
  // On autorise tout le monde connecté à lire les emails
  `CREATE POLICY "Public read access" ON emails
    FOR SELECT TO authenticated
    USING (true)`
];

// === FONCTION POUR ENVOYER UNE REQUÊTE À SUPABASE ===
// Cette fonction prend une "recette" (query) et l'envoie à Supabase
async function executeQuery(query) {
  try {
    // On envoie la requête SQL à Supabase en utilisant fetch
    const response = await fetch(`${supabaseUrl}/rest/v1/functions/v1/sql`, {
      method: 'POST', // On utilise la méthode POST pour envoyer des données
      headers: {
        'apikey': supabaseKey, // On s'identifie avec notre clé secrète
        'Content-Type': 'application/json' // On dit qu'on envoie du JSON
      },
      body: JSON.stringify({ query }) // On met la requête SQL dans le corps du message
    });
    // Si la réponse n'est pas OK, on lève une erreur
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // On récupère la réponse de Supabase (normalement, le résultat de la requête)
    const data = await response.json();
    console.log('Requête réussie:', query); // On affiche un message de succès
    return data; // On retourne la réponse
  } catch (error) {
    // Si quelque chose ne va pas, on affiche l'erreur
    console.error('Erreur lors de l\'exécution de la requête:', error);
    throw error; // On relance l'erreur pour la traiter ailleurs
  }
}

// === FONCTION PRINCIPALE QUI EXÉCUTE TOUTES LES REQUÊTES ===
// Cette fonction va exécuter chaque "recette" SQL une par une
async function setupDatabase() {
  console.log('Début de la configuration de la base de données...');
  // On parcourt chaque requête dans notre liste
  for (const query of sqlQueries) {
    try {
      await executeQuery(query); // On exécute la requête
    } catch (error) {
      // Si une requête échoue, on affiche l'erreur mais on continue
      console.error('Erreur lors de l\'exécution de:', query);
      continue;
    }
  }
  // Quand tout est fini, on affiche un message de succès
  console.log('Configuration terminée avec succès!');
}

// === ON LANCE LA FONCTION PRINCIPALE ===
// Ici, on dit à notre script de démarrer la configuration tout de suite
setupDatabase();

