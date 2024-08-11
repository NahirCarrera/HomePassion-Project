const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;

// Cambia esto para cada característica
const featureName = 'filtrarCatalogo'; // Cambia esto si tienes diferentes nombres de features
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

Given('I am on the home page for catalog', async function () {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de inicio
  await page.screenshot({ path: path.join(featureDir, 'home-page.png') });
});

When('I navigate to the catalog section', async function () {
  await page.click('a[href="#catalogo"]'); 
  await page.waitForSelector('#catalogo');

  // Captura de pantalla después de navegar a la sección del catálogo
  await page.screenshot({ path: path.join(featureDir, 'catalog-section.png') });
});

When('I select the category {string} from the dropdown', async function (category) {
  // Espera a que el contenedor del dropdown esté presente
  await page.waitForSelector('[data-testid="category-select"]');

  // Hacer clic en el contenedor del dropdown para abrir el menú
  await page.click('[data-testid="category-select"]');

  // Esperar a que las opciones sean visibles
  await page.waitForSelector(`[data-testid="category-option-${category}"]`);

  // Hacer clic en la opción deseada
  await page.click(`[data-testid="category-option-${category}"]`);

  // Esperar a que el contenido del catálogo se actualice
  await page.waitForSelector('#catalogo');

  // Captura de pantalla después de seleccionar una categoría
  await page.screenshot({ path: path.join(featureDir, 'category-selected.png') });
});

Then('I should see only products from category {string}', async function (category) {
  const products = await page.$$('#catalogo .MuiCard-root');

  // Verificar que los productos filtrados correspondan a la categoría seleccionada
  for (const product of products) {
    const productCategory = await product.$eval('.product-category', el => el.textContent.trim());
    assert.strictEqual(productCategory, category, `Producto no corresponde a la categoría ${category}`);
  }

  // Captura de pantalla mostrando los productos filtrados
  await page.screenshot({ path: path.join(featureDir, 'filtered-products.png') });
});

After(async function () {
  await browser.close();
});
