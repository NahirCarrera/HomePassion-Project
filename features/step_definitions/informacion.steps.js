const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');

let browser;
let page;

Before(async function () {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  page.setDefaultTimeout(10000); // Aumentar el tiempo de espera
});

Given('I am on the home page for information', async function () {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  });
  

When('I click on the "Sobre nosotros" menu option', async function () {
  await page.waitForSelector('a[href="#sobre-nosotros"]');
  await Promise.all([
    page.waitForNavigation(), // Espera a la navegación
    page.click('a[href="#sobre-nosotros"]')
  ]);
});

Then('I should be redirected to the "Sobre nosotros" section', async function () {
  const section = await page.$('#sobre-nosotros');
  assert.ok(section, 'No se redirigió a la sección "Sobre nosotros"');
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
});

After(async function () {
  await browser.close();
});
