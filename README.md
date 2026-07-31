# Tests Automatisés Playwright + Cucumber + TypeScript

Projet de tests end-to-end utilisant **Playwright** pour le pilotage des navigateurs, **Cucumber** pour l'écriture des scénarios en Gherkin, et **TypeScript**.

## Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- npm (installé avec Node.js)
- Git

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd CVEA
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Installer les navigateurs Playwright

Cette étape télécharge Chromium, Firefox et Webkit sur votre machine (obligatoire, même en installant les packages npm) :

```bash
npx playwright install
```

## Structure du projet

```
CVEA
│
├── features
│     ├── login.feature
│     ├── step_definitions
│     │      └── login.steps.ts
│     │
│     └── support
│            ├── hooks.ts
│            └── world.ts
│
├── pages
│      └── LoginPage.ts
│
├── playwright.config.ts
├── cucumber.js
├── package.json
└── tsconfig.json
```

- **features/** : scénarios de test en Gherkin (`.feature`) et leurs step definitions (`.ts`)
- **features/support/** : configuration Cucumber (hooks, world)
- **pages/** : Page Object Model (une classe par page de l'application testée)
- **cucumber.js** : configuration de Cucumber (chemins, timeout, format de rapport)
- **playwright.config.ts** : configuration Playwright (timeouts, options de navigateur)

## Lancer les tests

### Tous les tests (navigateur par défaut : Chromium)

```bash
npm test
```

### Sur un navigateur spécifique

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Sur tous les navigateurs (séquentiellement)

```bash
npm run test:all
```

## Rapport de tests

Après exécution, un rapport HTML est généré dans :

```
reports/cucumber-report.html
```

Ouvrez ce fichier dans un navigateur pour consulter le détail des scénarios exécutés.

## Dépannage

- **Erreur `UnauthorizedAccess` PowerShell** : exécuter `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- **Timeout au lancement du navigateur** : augmenter le `timeout` dans `cucumber.js` et/ou relancer `npx playwright install --force`
- **`Cannot read properties of undefined (reading 'fileExists')`** : vérifier la compatibilité des versions `typescript` et `ts-node` (`typescript@5.3.3` + `ts-node@10.9.2` recommandé)
