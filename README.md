# Minimal React Application

Ce projet est une application React minimaliste qui permet de stocker des adresses e-mail dans une base de données SQLite.

## Structure des fichiers

### `package.json`
Fichier principal qui définit la configuration de votre projet Node.js. Il contient :
- Les informations du projet (nom, version)
- Les dépendances nécessaires (dependencies)
- Les outils de développement (devDependencies)
- Les scripts pour démarrer et construire l'application

### La différence entre package.json et package-lock.json

#### package.json
C'est le fichier que vous éditez directement. Il contient :
- Les versions minimales que vous souhaitez utiliser (avec des ^ ou ~)
- Les dépendances que vous avez choisies
- Les scripts personnalisés
- Les informations du projet

#### package-lock.json
Ce fichier est généré automatiquement par npm. Il contient :
- Les versions exactes installées de chaque package
- Les dépendances indirectes
- Les checksums de sécurité
- Les URLs de téléchargement

Vous ne devriez jamais modifier package-lock.json manuellement. Il est là pour garantir que tout le monde qui clone votre projet installera exactement les mêmes versions de packages que vous.

### Qu'est-ce que npm ?

npm (Node Package Manager) est l'outil de gestion des paquets Node.js. Il permet de :
- Installer des dépendances
- Gérer les versions des packages
- Exécuter des scripts
- Partager des packages avec la communauté

Les commandes npm les plus courantes sont :

- `npm install` : Installe toutes les dépendances listées dans package.json
- `npm install <package>` : Installe un package spécifique
- `npm install <package> --save` : Installe un package et l'ajoute aux dépendances
- `npm install <package> --save-dev` : Installe un package pour le développement
- `npm run <script>` : Exécute un script défini dans package.json
- `npm uninstall <package>` : Supprime un package
- `npm update` : Met à jour les packages
- `npm list` : Affiche les packages installés

### `package-lock.json`
Le fichier package-lock.json est un fichier très important qui garantit la cohérence et la reproductibilité de votre projet. Voici son rôle :

### La différence entre package.json et package-lock.json

#### package.json
C'est le fichier que vous éditez directement. Il contient :
- Les versions minimales que vous souhaitez utiliser (avec des ^ ou ~)
- Les dépendances que vous avez choisies
- Les scripts personnalisés
- Les informations du projet

#### package-lock.json
Ce fichier est généré automatiquement par npm. Il contient :
- Les versions exactes installées de chaque package
- Les dépendances indirectes
- Les checksums de sécurité
- Les URLs de téléchargement

Vous ne devriez jamais modifier package-lock.json manuellement. Il est là pour garantir que tout le monde qui clone votre projet installera exactement les mêmes versions de packages que vous.

### `package-lock.json`
Le fichier package-lock.json est un fichier très important qui garantit la cohérence et la reproductibilité de votre projet. Voici son rôle :

Gestion des versions exactes :
Il enregistre les versions exactes de toutes les dépendances installées
Cela inclut les dépendances directes (que vous avez spécifiées) et les dépendances indirectes (utilisées par vos dépendances)
Par exemple, vous voyez que @babel/core est à la version ^7.23.0, mais package-lock.json spécifie exactement la version 7.27.1
Reproductibilité :
Quand quelqu'un d'autre clone votre projet et fait npm install, ils obtiendront exactement les mêmes versions de dépendances que vous
Cela évite les problèmes de "ça marchait sur mon ordinateur mais pas sur le tien"
Structure détaillée :
Il contient des informations comme :
resolved: l'URL exacte où la dépendance a été téléchargée
integrity: un hash qui vérifie que le fichier n'a pas été modifié
dependencies: les dépendances de chaque package
peerDependencies: les dépendances nécessaires qui doivent être installées séparément
Sécurité :
Il empêche l'installation de versions différentes de celles qui ont été testées
Cela réduit le risque d'introduire des bugs ou des vulnérabilités
Performance :
Il accélère l'installation des dépendances car npm sait exactement ce qu'il doit installer
Il évite d'avoir à résoudre les dépendances à chaque installation
En résumé, package-lock.json est comme une "recette précise" qui dit : "Pour que ce projet fonctionne exactement comme prévu, utilise ces versions exactes de ces packages"

C'est pourquoi ce fichier est généralement commité dans le contrôle de version (git) - il est essentiel pour la cohérence du projet.

### `webpack.config.js`
Configuration de webpack, l'outil qui compile notre application React. Il définit :
- L'entrée de notre application (index.js)
- La sortie (bundle.js)
- Les règles de compilation (utilisation de Babel)
- La configuration du serveur de développement

### `.babelrc`
Configuration de Babel, qui transforme notre code React et JavaScript moderne en code compatible avec tous les navigateurs. Il utilise deux presets :
- `@babel/preset-env` : pour le JavaScript moderne
- `@babel/preset-react` : pour la syntaxe JSX de React

### `src/index.js`
Le point d'entrée de notre application React. Il contient :
- Le composant principal `App` qui gère l'interface utilisateur
- La gestion des états (emails, erreurs)
- Les fonctions pour interagir avec le serveur
- Le formulaire pour ajouter des emails
- La liste des emails stockés

### `server.js`
Le serveur backend qui gère les requêtes API. Il utilise :
- Express pour créer le serveur web
- SQLite3 pour la base de données
- CORS pour permettre les requêtes depuis React
- Deux endpoints API :
  - POST `/api/emails` : pour ajouter un email
  - GET `/api/emails` : pour récupérer la liste des emails

### `dist/index.html`
Le fichier HTML qui sert de point d'entrée pour notre application. Il contient :
- La structure de base de la page
- Le div `root` où React va se monter
- Le script qui charge notre application compilée

## Comment démarrer l'application

1. Installer les dépendances :
```bash
npm install
```

2. Démarrer le serveur backend :
```bash
node server.js
```

3. Dans un autre terminal, démarrer le serveur de développement React :
```bash
npm start
```

L'application sera accessible à `http://localhost:9000`

## Explication détaillée du package.json

Voici une explication ligne par ligne de notre package.json :

```json
{
  "name": "react-minimal",  // Le nom de notre projet
  "version": "1.0.0",       // La version actuelle du projet
  "description": "Minimal React application",  // Une description courte du projet
  "main": "index.js",      // Le point d'entrée principal du projet
  
  "scripts": {
    "start": "webpack serve --mode development",  // Commande pour démarrer le serveur de développement
    "build": "webpack --mode production"        // Commande pour construire l'application en mode production
  },

  "dependencies": {
    "react": "^18.2.0",     // La bibliothèque React principale
    "react-dom": "^18.2.0", // Les outils pour intégrer React avec le DOM
    "sqlite3": "^5.1.6",    // La base de données SQLite
    "express": "^4.18.2",   // Le framework web Express
    "cors": "^2.8.5"        // Pour gérer les requêtes entre différents serveurs
  },

  "devDependencies": {
    "webpack": "^5.88.2",         // L'outil de compilation
    "webpack-cli": "^5.1.4",      // L'interface en ligne de commande pour webpack
    "webpack-dev-server": "^4.15.1",  // Le serveur de développement
    "babel-loader": "^9.1.3",     // Pour transformer le code React en JavaScript standard
    "@babel/core": "^7.23.0",     // Le core de Babel
    "@babel/preset-env": "^7.22.20",  // Pour transformer le JavaScript moderne
    "@babel/preset-react": "^7.22.15"  // Pour transformer le JSX React
  }
}
```

### Explication des symboles de version

Dans les versions (comme `^18.2.0`), le symbole `^` signifie :
- `^18.2.0` : Accepte les mises à jour mineures et de correction (ex: 18.2.1, 18.3.0)
- `~18.2.0` : Accepte uniquement les mises à jour de correction (ex: 18.2.1)
- `18.2.0` : Version exacte, aucune mise à jour autorisée

Ces symboles aident à gérer les mises à jour automatiques tout en maintenant la stabilité du projet.