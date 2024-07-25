const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let page;

Given('I am on the login page', async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3000/login'); 
});

When('I submit valid login credentials', async function () {
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
});

When('I submit invalid login credentials', async function () {
  await page.fill('input[name="email"]', 'invalid@example.com');
  await page.fill('input[name="password"]', 'wrongpassword');
  await page.click('button[type="submit"]');
});

Then('I should be redirected to the tasks page', async function () {
  await page.waitForSelector('text=Tasks Page'); 
  await browser.close();
});

Then('I should see an error message', async function () {
  const errorMessage = await page.textContent('text=Correo electrónico o contraseña incorrectos.');
  if (!errorMessage) {
    throw new Error('Error message not found');
  }
  await browser.close();
});
