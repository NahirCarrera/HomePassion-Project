const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;

// Cambia esto para cada característica
const featureName = 'informacion'; // Cambia esto si tienes diferentes nombres de features
const screenshotsDir = path.join(__dirname, 'screenshots');
const featureDir = path.join(screenshotsDir, featureName);

// Crea los directorios si no existen
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

if (!fs.existsSync(featureDir)) {
  fs.mkdirSync(featureDir);
}

Before(async function () {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  page.setDefaultTimeout(10000); // Aumenta el tiempo de espera
  this.page = page;
});

Given('I am on the home page for information', async function () {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de inicio
  await page.screenshot({ path: path.join(featureDir, 'home-page.png') });
});

When('I click on the "Sobre nosotros" menu option', async function () {
  await page.waitForSelector('a[href="#sobre-nosotros"]');
  await Promise.all([
    page.waitForNavigation(), // Espera a la navegación
    page.click('a[href="#sobre-nosotros"]')
  ]);

  // Captura de pantalla después de hacer clic en "Sobre nosotros"
  await page.screenshot({ path: path.join(featureDir, 'click-sobre-nosotros.png') });
});

Then('I should be redirected to the "Sobre nosotros" section', async function () {
  const section = await page.$('#sobre-nosotros');
  assert.ok(section, 'No se redirigió a la sección "Sobre nosotros"');

  // Captura de pantalla en la sección "Sobre nosotros"
  await page.screenshot({ path: path.join(featureDir, 'sobre-nosotros-section.png') });
});

Then('I should see the description, history, and values', async function () {
  // Verificar Descripción del Negocio
  const descriptionTitle = await page.$eval('#descripcion h5', el => el.textContent);
  assert.strictEqual(descriptionTitle, 'Descripción del Negocio', 'No se encontró el título "Descripción del Negocio"');

  // Verificar Nuestra Historia
  const historyTitle = await page.$eval('#historia h5', el => el.textContent);
  assert.strictEqual(historyTitle, 'Nuestra Historia', 'No se encontró el título "Nuestra Historia"');

  // Verificar Valores
  const values = await page.$$eval('#valores h6', elements => elements.map(el => el.textContent));
  const expectedValues = ['Calidad', 'Integridad', 'Innovación', 'Satisfacción del Cliente'];
  assert.deepStrictEqual(values, expectedValues, 'Los valores no son los esperados');

  // Captura de pantalla de la sección con la descripción, historia y valores
  await page.screenshot({ path: path.join(featureDir, 'description-history-values.png') });
});

After(async function () {
  await browser.close();
});
