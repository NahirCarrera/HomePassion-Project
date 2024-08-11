const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;

// Cambia esto para cada característica
const featureName = 'verProductosEnCatalogo'; // Cambia esto si tienes diferentes nombres de features
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

Given('I am on the home page for test products in catalog', async function () {
  // Navega a la página principal
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página principal
  await page.screenshot({ path: path.join(featureDir, 'home-page.png') });
});

When('I navigate to the catalog section for test products', async function () {
  // Haz clic en el enlace o botón que lleva a la sección del catálogo
  await page.click('a[href="#catalogo"]');
  await page.waitForSelector('#catalogo');

  // Captura de pantalla después de navegar a la sección del catálogo
  await page.screenshot({ path: path.join(featureDir, 'catalogo-section.png') });
});

Then('I should see products with image, title, description, rating, and price', async function () {
  const products = await page.$$('#catalogo .MuiCard-root');

  // Verifica que cada producto tenga una imagen, título, descripción, rating y precio
  for (const product of products) {
    // Obtén el ID del producto desde el atributo data-testid del contenedor del producto
    const id = await product.evaluate(el => el.getAttribute('data-testid').split('-').pop());

    // Obtén los valores de los diferentes atributos utilizando el ID
    const image = await product.$eval(`[data-testid="product-image-${id}"]`, el => el.src);
    const title = await product.$eval(`[data-testid="product-name-${id}"]`, el => el.textContent.trim());
    const description = await product.$eval(`[data-testid="product-description-${id}"]`, el => el.textContent.trim());
    const rating = await product.$eval(`[data-testid="product-rating-${id}"]`, el => el.textContent.trim());
    const price = await product.$eval(`[data-testid="product-price-${id}"]`, el => el.textContent.trim());

    // Verifica que cada atributo tenga un valor válido
    assert.ok(image, `Producto con id ${id} no tiene una imagen`);
    assert.ok(title, `Producto con id ${id} no tiene un título`);
    assert.ok(description, `Producto con id ${id} no tiene una descripción`);
    assert.ok(rating, `Producto con id ${id} no tiene un rating`);
    assert.ok(price, `Producto con id ${id} no tiene un precio`);

    // Captura de pantalla para cada producto
    await product.screenshot({ path: path.join(featureDir, `product-${id}.png`) });
  }
});

After(async function () {
  await browser.close();
});
