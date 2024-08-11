const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let browser;
let page;
const screenshotsDir = path.join(__dirname, 'screenshots');
const featureName = 'login';  // Cambia esto si tienes diferentes nombres de features
const featureDir = path.join(screenshotsDir, featureName);

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

if (!fs.existsSync(featureDir)) {
  fs.mkdirSync(featureDir);
}

Before(async function (scenario) {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  page.setDefaultTimeout(10000); // Aumentar el tiempo de espera
});

Given('I am on the login page', async function () {
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(featureDir, 'login_page.png') });
});

When('I submit valid login credentials', async function () {
  await page.type('input[type="email"]', 'user@example.com');
  await page.type('input[type="password"]', 'password');
  await page.click('button[type="submit"]', { timeout: 10000 });
  await page.waitForNavigation();
  await page.screenshot({ path: path.join(featureDir, 'valid_login_submitted.png') });
});

Then('I should be redirected to the tasks page', async function () {
  try {
    assert.strictEqual(page.url(), 'http://localhost:3000/user-dashboard');
    await page.screenshot({ path: path.join(featureDir, 'redirected_to_tasks_page.png') });
  } catch (error) {
    await page.screenshot({ path: path.join(featureDir, 'redirect_failed.png') });
    throw error;
  }
});

When('I submit invalid login credentials', async function () {
  await page.type('input[type="email"]', 'invalid-email@example.com');
  await page.type('input[type="password"]', 'invalidpassword');
  await page.click('button[type="submit"]', { timeout: 10000 });
  await page.screenshot({ path: path.join(featureDir, 'invalid_login_submitted.png') });
});

Then('I should see an error message', async function () {
  try {
    await page.waitForSelector('p', { timeout: 10000 });
    const errorMessage = await page.$eval('p', el => el.textContent);
    if (errorMessage.includes('Correo electrónico o contraseña incorrectos.')) {
      await page.screenshot({ path: path.join(featureDir, 'error_message_displayed.png') });
    } else {
      throw new Error('Error message not found or incorrect.');
    }
  } catch (error) {
    await page.screenshot({ path: path.join(featureDir, 'error_message_failed.png') });
    throw error;
  }
});

When('I submit the login form with empty fields', async function () {
  await page.click('button[type="submit"]', { timeout: 10000 });
  await page.screenshot({ path: path.join(featureDir, 'empty_fields_submitted.png') });
});

Then('I should not be able to submit the form and see validation indicators', async function () {
  try {
    assert.strictEqual(page.url(), 'http://localhost:3000/login', 'La página debería seguir en la página de inicio de sesión.');

    const emailBorderColor = await page.$eval('input[type="email"]', el => getComputedStyle(el).borderColor);
    const passwordBorderColor = await page.$eval('input[type="password"]', el => getComputedStyle(el).borderColor);

    assert.ok(emailBorderColor.includes('rgb(255, 0, 0)'), 'El borde del campo de correo electrónico no está marcado como inválido.');
    assert.ok(passwordBorderColor.includes('rgb(255, 0, 0)'), 'El borde del campo de contraseña no está marcado como inválido.');

    await page.screenshot({ path: path.join(featureDir, 'validation_indicators_displayed.png') });
  } catch (error) {
    await page.screenshot({ path: path.join(featureDir, 'validation_failed.png') });
    throw error;
  }
});

After(async function () {
  await browser.close();
});
