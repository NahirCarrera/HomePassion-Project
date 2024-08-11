const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;

// Cambia esto para cada característica
const featureName = 'buscarProductos'; // Cambia esto si tienes diferentes nombres de features
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
  page.setDefaultTimeout(10000); // Aumentar el tiempo de espera
  this.page = page;
});

Given('I am on the home page for search products', async function () {
  await this.page.goto('http://localhost:3000'); // Cambia la URL según sea necesario

  // Captura de pantalla en la página de inicio
  await this.page.screenshot({ path: path.join(featureDir, 'home-page.png') });
});

When('I navigate to the catalog section for search products', async function () {
  await this.page.click('a[href="#catalogo"]'); 
  await this.page.waitForSelector('#catalogo');

  // Captura de pantalla en la sección del catálogo
  await this.page.screenshot({ path: path.join(featureDir, 'catalog-section.png') });
});

When('I search for a product with the keyword {string}', async function (keyword) {
  // Espera a que la barra de búsqueda esté presente
  await this.page.waitForSelector('[data-testid="search-bar"]');

  // Escribe la palabra clave en la barra de búsqueda
  await this.page.type('[data-testid="search-bar"]', keyword);

  // Simula la pulsación de la tecla Enter o el clic en el botón de búsqueda
  await this.page.keyboard.press('Enter');

  // Espera a que los resultados se actualicen
  await this.page.waitForSelector('#catalogo .MuiCard-root');

  // Captura de pantalla después de realizar la búsqueda
  await this.page.screenshot({ path: path.join(featureDir, 'search-results.png') });
});

Then('I should see only products that match the keyword {string}', async function (keyword) {
  const products = await this.page.$$('#catalogo .MuiCard-root');
  let foundMatch = false;

  // Verifica que al menos un producto coincida con la palabra clave
  for (const product of products) {
    const title = await product.$eval('.MuiCardContent-root .MuiTypography-h6', el => el.textContent.trim());
    const description = await product.$eval('.MuiCardContent-root .MuiTypography-body2', el => el.textContent.trim());

    if (title.includes(keyword) || description.includes(keyword)) {
      foundMatch = true;
      break;  // Si se encuentra una coincidencia, no es necesario seguir buscando
    }
  }

  assert.ok(foundMatch, `No se encontraron productos que coincidan con la palabra clave "${keyword}"`);
  
  // Captura de pantalla mostrando los resultados de búsqueda
  await this.page.screenshot({ path: path.join(featureDir, 'search-results-verified.png') });
});

After(async function () {
  await browser.close();
});
