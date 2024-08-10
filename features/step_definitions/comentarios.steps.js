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

Given('I am on the home page for comments', async function () {
  // Navega a la página principal
  await this.page.goto('http://localhost:3000'); // Cambia la URL según sea necesario
});

When('I navigate to the comments section', async function () {
  // Haz clic en el enlace o botón que lleva a la sección de comentarios
  await this.page.click('a[href="#comentarios"]'); // Cambia el selector según tu implementación
  await this.page.waitForSelector('#comentarios');
});

Then('I should see comments with date, name, rating, and comment', async function () {
  // Selecciona todos los elementos de comentarios
  const commentItems = await this.page.$$('.MuiCardContent-root'); // Ajusta el selector si es necesario

  // Verifica que cada comentario tenga fecha, nombre, calificación y texto
  for (const comment of commentItems) {
    const id = await comment.$eval('[data-testid^="comment-name-"]', el => el.getAttribute('data-testid').split('-').pop());
    
    const date = await comment.$eval(`[data-testid="comment-date-${id}"]`, el => el.textContent.trim());
    const name = await comment.$eval(`[data-testid="comment-name-${id}"]`, el => el.textContent.trim());
    const rating = await comment.$eval(`[data-testid="comment-rating-${id}"]`, el => el.textContent.trim());
    const text = await comment.$eval(`[data-testid="comment-text-${id}"]`, el => el.textContent.trim());

    assert.ok(date, `Comentario con id ${id} no tiene una fecha`);
    assert.ok(name, `Comentario con id ${id} no tiene un nombre`);
    assert.ok(rating, `Comentario con id ${id} no tiene una calificación`);
    assert.ok(text, `Comentario con id ${id} no tiene un comentario`);
  }
});

After(async function () {
    await browser.close();
  });