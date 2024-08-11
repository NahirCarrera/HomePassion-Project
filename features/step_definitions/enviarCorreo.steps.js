const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;

// Cambia esto para cada característica
const featureName = 'enviarCorreo'; // Cambia esto si tienes diferentes nombres de features
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

Given('I am on the home page for contact', async function () {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Captura de pantalla en la página de inicio
  await page.screenshot({ path: path.join(featureDir, 'home-page.png') });
});

When('I navigate to the contact section', async function () {
  await page.click('a[href="#contacto"]'); // Asumiendo que hay un enlace que lleva a la sección de contacto
  await page.waitForSelector('#contacto'); // Espera a que la sección de contacto esté visible

  // Captura de pantalla en la sección de contacto
  await page.screenshot({ path: path.join(featureDir, 'contact-section.png') });
});

When('I fill in the contact form with {string}, {string}, and {string}', async function (name, email, message) {
  await page.type('#contact-name', name); // Usa el identificador del campo Nombre
  await page.type('#contact-email', email); // Usa el identificador del campo Correo Electrónico
  await page.type('#contact-message', message); // Usa el identificador del campo Mensaje

  // Captura de pantalla después de llenar el formulario
  await page.screenshot({ path: path.join(featureDir, 'contact-form-filled.png') });
});

When('I submit the contact form', async function () {
  await page.click('button[type="submit"]'); // Asumiendo que el botón de envío es de tipo submit
  await page.waitForSelector('#contacto'); // Espera un segundo para la respuesta del servidor

  // Captura de pantalla después de enviar el formulario
  await page.screenshot({ path: path.join(featureDir, 'form-submitted.png') });
});

Then('I should see a success message indicating that the email was sent successfully', async function () {
  const successMessage = await page.$eval('p', el => el.textContent);
  assert.strictEqual(successMessage, 'Correo enviado con éxito', 'No se mostró el mensaje de éxito esperado');

  // Captura de pantalla mostrando el mensaje de éxito
  await page.screenshot({ path: path.join(featureDir, 'success-message.png') });
});

Then('I should see an error message indicating that all fields are required', async function () {
  const errorMessage = await page.$eval('p', el => el.textContent);
  assert.strictEqual(errorMessage, 'Todos los campos son obligatorios', 'No se mostró el mensaje de error esperado para campos en blanco');

  // Captura de pantalla mostrando el mensaje de error por campos en blanco
  await page.screenshot({ path: path.join(featureDir, 'error-required-fields.png') });
});

Then('I should see an error message indicating that the email could not be sent', async function () {
  const errorMessage = await page.$eval('p', el => el.textContent);
  assert.strictEqual(errorMessage, 'Error al enviar el correo', 'No se mostró el mensaje de error esperado al enviar el correo');

  // Captura de pantalla mostrando el mensaje de error al enviar el correo
  await page.screenshot({ path: path.join(featureDir, 'error-email-send.png') });
});

After(async function () {
  await browser.close();
});
