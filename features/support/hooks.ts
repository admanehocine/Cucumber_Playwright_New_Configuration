import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser } from '@playwright/test';

// Le lancement d'un navigateur peut dépasser les 5000ms par défaut de Cucumber.
setDefaultTimeout(30 * 1000);

Before(async function () {
    const browserName = process.env.BROWSER || 'chromium';

    const browserType = { chromium, firefox, webkit }[browserName];

    if (!browserType) {
        throw new Error(`Navigateur non supporté: ${browserName}`);
    }

    // Stocké sur `this` (World) plutôt qu'en variable de module,
    // pour éviter tout partage d'état entre scénarios exécutés en parallèle.
    this.browser = await browserType.launch({
        headless: false
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function () {
    // Si le Before a échoué/timeout avant d'assigner ces objets,
    // ils peuvent être undefined : on vérifie avant de fermer.
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
});