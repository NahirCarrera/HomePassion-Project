const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;
const screenshotsDir = path.join(__dirname, 'screenshots');
const featureName = 'noticias';  // Cambia esto si tienes diferentes nombres de features
const featureDir = path.join(screenshotsDir, featureName);

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

Given('I am on the home page for noticias', async function () {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  // Captura de pantalla en la página de inicio
  await page.screenshot({ path: path.join(featureDir, 'home-page.png') });
});

When('I click on the "Noticias" menu option', async function () {
  await page.waitForSelector('a[href="#noticias"]');
  await Promise.all([
    page.waitForNavigation(), // Espera a la navegación
    page.click('a[href="#noticias"]')
  ]);
  // Captura de pantalla después de hacer clic en "Noticias"
  await page.screenshot({ path: path.join(featureDir, 'click-noticias.png') });
});

Then('I should be redirected to the "Noticias" section', async function () {
  const section = await page.$('#noticias');
  assert.ok(section, 'No se redirigió a la sección "Noticias"');
  // Captura de pantalla en la sección "Noticias"
  await page.screenshot({ path: path.join(featureDir, 'noticias-section.png') });
});

Then('I should see 3 news items with title, date, description, and image', async function () {
  if (!this.page) {
    throw new Error('Page object is not defined');
  }

  // Selecciona todos los elementos de noticias
  const newsItems = await this.page.$$('#noticias .MuiCard-root');

  // Verifica que cada noticia tenga un título, fecha, descripción e imagen
  for (const [index, item] of newsItems.entries()) {
    const title = await item.$eval(`[data-testid="news-title-${index}"]`, el => el.textContent.trim());
    const date = await item.$eval(`[data-testid="news-date-${index}"]`, el => el.textContent.trim());
    const description = await item.$eval(`[data-testid="news-description-${index}"]`, el => el.textContent.trim());
    const image = await item.$eval(`[data-testid="news-image-${index}"]`, el => el.src);

    assert.ok(title, `Noticia ${index + 1} no tiene un título`);
    assert.ok(date, `Noticia ${index + 1} no tiene una fecha`);
    assert.ok(description, `Noticia ${index + 1} no tiene una descripción`);
    assert.ok(image, `Noticia ${index + 1} no tiene una imagen`);
    
    // Captura de pantalla para cada noticia
    await item.screenshot({ path: path.join(featureDir, `news-item-${index + 1}.png`) });
  }
});

After(async function () {
  await browser.close();
});
