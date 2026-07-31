# Tests Automatisés Playwright + Cucumber + TypeScript

Projet de tests end-to-end utilisant **Playwright** pour le pilotage des navigateurs, **Cucumber** pour l'écriture des scénarios en Gherkin, et **TypeScript**.

## Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- npm (installé avec Node.js)
- Git
- [Allure Commandline](https://docs.qameta.io/allure/) (installé automatiquement via `npm install`, aucune installation manuelle nécessaire)

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo> nomProjet
cd nomProjet
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

Le navigateur utilisé dépend de la variable d'environnement `BROWSER`, lue dans `features/support/hooks.ts` :

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Sur tous les navigateurs (séquentiellement)

```bash
npm run test:all
```

Cette commande enchaîne `test:chromium`, `test:firefox` puis `test:webkit` l'un après l'autre. Il n'y a pas d'exécution en parallèle par défaut avec Cucumber (contrairement au runner `@playwright/test`) ; chaque navigateur relance toute la suite depuis zéro.

### Voir le navigateur pendant l'exécution

Le mode headless est désactivé (`headless: false`) dans `hooks.ts`, donc le navigateur s'ouvre visuellement à chaque run et vous pouvez suivre les actions en direct.

## Lancer des scénarios par tag

Les tags permettent de cibler uniquement certains scénarios sans exécuter toute la suite.

**1. Ajouter un tag dans le fichier `.feature` :**
```gherkin
@login
Feature: Connexion

  @smoke
  Scenario: Connexion réussie
    Given je suis sur la page de connexion
    When je me connecte avec l'utilisateur "samia" et le mot de passe "monMotDePasse"
    Then je devrais voir la page d'accueil

  @regression
  Scenario: Connexion échouée
    Given je suis sur la page de connexion
    When je me connecte avec des identifiants invalides
    Then je devrais voir un message d'erreur
```

**2. Lancer uniquement les scénarios portant un tag précis :**
```bash
npx cucumber-js --tags "@smoke"
```

**3. Combinaisons de tags (et / ou / non) :**
```bash
npx cucumber-js --tags "@smoke and @login"
npx cucumber-js --tags "@smoke or @regression"
npx cucumber-js --tags "not @regression"
```

**4. Ajouter des scripts dédiés dans `package.json` pour les tags les plus utilisés :**
```json
"scripts": {
  "test:smoke": "cucumber-js --tags \"@smoke\"",
  "test:regression": "cucumber-js --tags \"@regression\""
}
```
puis lancer simplement :
```bash
npm run test:smoke
```

## Rapports de tests

### Rapport HTML simple (Cucumber, activé par défaut)

Après exécution, un rapport HTML est généré dans :

```
reports/cucumber-report.html
```

Ouvrez ce fichier dans un navigateur pour consulter le détail des scénarios exécutés.

### Rapport Allure (à la demande, séparé de l'exécution normale)

Allure n'est **pas** activé dans la configuration par défaut (`cucumber.js`) car il perturbait l'affichage console (`X scenario passed`) lorsqu'il tournait en même temps que `progress-bar`. Il se lance donc via une commande dédiée :

**Lancer les tests avec le formatter Allure :**
```bash
npm run test:allure
```

**Générer le rapport HTML Allure à partir des résultats :**
```bash
npm run allure:generate
```

**Ouvrir le rapport généré :**
```bash
npm run allure:open
```

**Ou tout faire en une fois (génère et ouvre sans dossier persistant) :**
```bash
npm run allure:serve
```

Les résultats bruts sont stockés dans `allure-results/` et le rapport final dans `allure-report/` (dossiers à exclure du versioning, voir `.gitignore`).

## Dépannage

- **Erreur `UnauthorizedAccess` PowerShell** : exécuter `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- **Timeout au lancement du navigateur** : augmenter le `timeout` dans `cucumber.js` et/ou relancer `npx playwright install --force`
- **`Cannot read properties of undefined (reading 'fileExists')`** : vérifier la compatibilité des versions `typescript` et `ts-node` (`typescript@5.3.3` + `ts-node@10.9.2` recommandé)
- **`EISDIR: illegal operation on a directory` avec Allure** : ne pas mettre `:allure-results` dans la ligne `format`, utiliser `formatOptions: { resultsDir: 'allure-results' }` séparément
- **Le compteur `X scenario (Y passed)` n'apparaît plus dans la console** : c'est le formatter Allure qui interfère avec `progress-bar` quand les deux tournent ensemble dans `cucumber.js` — garder `cucumber.js` sans Allure, et utiliser `npm run test:allure` uniquement quand un rapport Allure est nécessaire
- **`allure-results` corrompu après une erreur** : supprimer le dossier (`Remove-Item -Recurse -Force allure-results`) avant de relancer les tests