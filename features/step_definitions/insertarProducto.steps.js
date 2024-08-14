const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;

// Nombre de la característica para capturas de pantalla
const featureName = 'insertarProductos';
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
  page.setDefaultTimeout(10000);
  this.page = page;
});

Given('I am on the products page', async function () {
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de productos
  await page.screenshot({ path: path.join(featureDir, 'products-page.png') });
});

When('I click on {string}', async function (buttonLabel) {
    // El atributo data-testid en el botón
    const buttonSelector = `[data-testid="${buttonLabel}"]`;

    // Espera a que el botón sea visible
    await page.waitForSelector(buttonSelector, { timeout: 10000 });

    // Haz clic en el botón
    await page.click(buttonSelector);

    // Captura de pantalla después de hacer clic en el botón
    await page.screenshot({ path: path.join(featureDir, `click-${buttonLabel}.png`) });
});


When('I complete the fields with valid information', async function () {
    // Completar el campo "Nombre"
    await page.type('[data-testid="nombre-input"]', 'Producto de Prueba');
    // Completar el campo "Descripción"
    await page.type('[data-testid="descripcion-input"]', 'Descripción de Producto de Prueba');
    // Completar el campo "Precio"
    await page.type('[data-testid="precio-input"]', '10.8');  // Asegúrate de que el valor se pase como cadena

    // Captura de pantalla después de completar un campo
    await page.screenshot({ path: path.join(featureDir, `submit-Product.png`) });
});



Then('the new product should be in the products list', async function () {
    const productName = 'Producto Test'; // Cambia esto por el nombre que estés usando en tu prueba
    const productExists = await page.evaluate((name) => {
      return Array.from(document.querySelectorAll('.product-item'))
        .some(el => el.textContent.includes(name));
    }, productName);
  
    assert.ok(productExists, 'El nuevo producto no se encuentra en la lista de productos');
  });


  Then('the product should not be in the products list', async function () {
    const productName = 'Producto Test'; // Cambia esto por el nombre que estés usando en tu prueba
    const productExists = await page.evaluate((name) => {
        return Array.from(document.querySelectorAll('.product-item'))
            .some(el => el.textContent.includes(name));
    }, productName);
  
    assert.ok(!productExists, 'El producto se encuentra en la lista de productos, pero no debería estar.');
});


Then('I should see an error message for empty fields', async function () {
    // Esperar a que el alert aparezca
    const alertMessage = await page.waitForFunction(() => window.alert, { timeout: 3000 });
    
    // Capturar el mensaje del alert
    const message = await page.evaluate(() => window.alert.getText());
    
    // Verificar que el mensaje del alert sea el esperado
    assert.strictEqual(message, 'Por favor, completa todos los campos.', 'El mensaje de error no es el esperado');
  
    // Cerrar el alert
    await page.evaluate(() => window.alert.accept());
    
    // Captura de pantalla del estado de la página después de cerrar el alert
    await page.screenshot({ path: path.join(featureDir, 'alert-message.png') });
  });
  

After(async function () {
  await browser.close();
});
