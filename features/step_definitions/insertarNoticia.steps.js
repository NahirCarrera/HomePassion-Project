const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;

// Nombre de la característica para capturas de pantalla
const featureName = 'insertarNoticias';
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

Given('I am on the news page', async function () {
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de productos
  await page.screenshot({ path: path.join(featureDir, 'products-page.png') });
});

When('I click on {string} to add new', async function (buttonLabel) {
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de productos
  await page.screenshot({ path: path.join(featureDir, 'products-page.png') });
});


When('I complete the fields with valid information for a new', async function () {
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de productos
  await page.screenshot({ path: path.join(featureDir, 'products-page.png') });
});


When('I click on {string} in the news form', async function (buttonLabel) {
    await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle2' });
  
    // Captura de pantalla en la página de productos
    await page.screenshot({ path: path.join(featureDir, 'products-page.png') });
  });

Then('the new should be in the news list', async function () {
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de productos
  await page.screenshot({ path: path.join(featureDir, 'products-page.png') });
  });


  Then('the new should not be in the news list', async function () {
    await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de productos
  await page.screenshot({ path: path.join(featureDir, 'products-page.png') });
});


Then('I should see an error message for empty fields in the news form', async function () {
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de productos
  await page.screenshot({ path: path.join(featureDir, 'products-page.png') });
  });
  

After(async function () {
  await browser.close();
});
