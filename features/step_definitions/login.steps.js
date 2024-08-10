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

Given('I am on the login page', async function () {
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });
});

When('I submit valid login credentials', async function () {
  await page.type('input[type="email"]', 'user@example.com');
  await page.type('input[type="password"]', 'password');
  await page.click('button[type="submit"]', { timeout: 10000 });
  await page.waitForNavigation();
});

Then('I should be redirected to the tasks page', async function () {
  assert.strictEqual(page.url(), 'http://localhost:3000/user-dashboard');
});

When('I submit invalid login credentials', async function () {
  await page.type('input[type="email"]', 'invalid-email@example.com');
  await page.type('input[type="password"]', 'invalidpassword');
  await page.click('button[type="submit"]',{ timeout: 10000 });
});

Then('I should see an error message', async function () {
  try {
    await page.waitForSelector('p', { timeout: 10000 });
    const errorMessage = await page.$eval('p', el => el.textContent);
    if (errorMessage.includes('Correo electrónico o contraseña incorrectos.')) {
      console.log('Error message is displayed as expected.');
    } else {
      throw new Error('Error message not found or incorrect.');
    }
  } catch (error) {
    console.error('Error in verifying error message:', error);
    throw error;
  }
});

When('I submit the login form with empty fields', async function () {
  await page.click('button[type="submit"]', { timeout: 10000 }); // Enviar el formulario con campos vacíos
});

Then('I should not be able to submit the form and see validation indicators', async function () {
  try {
    // Verificar si la página aún está en la misma URL (indicando que no se ha enviado el formulario)
    assert.strictEqual(page.url(), 'http://localhost:3000/login', 'La página debería seguir en la página de inicio de sesión.');

    // Verificar si los campos tienen algún indicador de validación
    // Aquí suponemos que los campos de entrada muestran un borde rojo cuando están vacíos
    const emailBorderColor = await page.$eval('input[type="email"]', el => getComputedStyle(el).borderColor);
    const passwordBorderColor = await page.$eval('input[type="password"]', el => getComputedStyle(el).borderColor);

    assert.ok(emailBorderColor.includes('rgb(255, 0, 0)'), 'El borde del campo de correo electrónico no está marcado como inválido.');
    assert.ok(passwordBorderColor.includes('rgb(255, 0, 0)'), 'El borde del campo de contraseña no está marcado como inválido.');
  } catch (error) {
    console.error('Error en la verificación de la validación de campos vacíos:', error);
    throw error;
  }
});

After(async function () {
  await browser.close();
});
