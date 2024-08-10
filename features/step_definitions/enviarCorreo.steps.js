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

Given('I am on the home page for contact', async function () {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
});

When('I navigate to the contact section', async function () {
  await page.click('a[href="#contacto"]'); // Asumiendo que hay un enlace que lleva a la sección de contacto
  await page.waitForSelector('#contacto'); // Espera a que la sección de contacto esté visible
});

When('I fill in the contact form with {string}, {string}, and {string}', async function (name, email, message) {
    await page.type('#contact-name', name); // Usa el identificador del campo Nombre
    await page.type('#contact-email', email); // Usa el identificador del campo Correo Electrónico
    await page.type('#contact-message', message); // Usa el identificador del campo Mensaje
  });
  
When('I submit the contact form', async function () {
  await page.click('button[type="submit"]'); // Asumiendo que el botón de envío es de tipo submit
  await page.waitForSelector('#contacto');// Espera un segundo para la respuesta del servidor
});

Then('I should see a success message indicating that the email was sent successfully', async function () {
  const successMessage = await page.$eval('p', el => el.textContent);
  assert.strictEqual(successMessage, 'Correo enviado con éxito', 'No se mostró el mensaje de éxito esperado');
});

Then('I should see an error message indicating that all fields are required', async function () {
  const errorMessage = await page.$eval('p', el => el.textContent);
  assert.strictEqual(errorMessage, 'Todos los campos son obligatorios', 'No se mostró el mensaje de error esperado para campos en blanco');
});

Then('I should see an error message indicating that the email could not be sent', async function () {
  const errorMessage = await page.$eval('p', el => el.textContent);
  assert.strictEqual(errorMessage, 'Error al enviar el correo', 'No se mostró el mensaje de error esperado al enviar el correo');
});

After(async function () {
  await browser.close();
});
