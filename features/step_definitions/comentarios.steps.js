const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;

// Cambia esto para cada característica
const featureName = 'comentarios'; // Cambia esto si tienes diferentes nombres de features
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

Given('I am on the home page for comments', async function () {
  await this.page.goto('http://localhost:3000'); // Cambia la URL según sea necesario

  // Captura de pantalla en la página de inicio
  await this.page.screenshot({ path: path.join(featureDir, 'home-page.png') });
});

When('I navigate to the comments section', async function () {
  await this.page.click('a[href="#comentarios"]'); // Cambia el selector según tu implementación
  await this.page.waitForSelector('#comentarios');

  // Captura de pantalla en la sección de comentarios
  await this.page.screenshot({ path: path.join(featureDir, 'comments-section.png') });
});

Then('I should see comments with name, rating, and comment', async function () {

  await this.page.screenshot({ path: path.join(featureDir, 'comments-verified.png') });
});


After(async function () {
  await browser.close();
});
