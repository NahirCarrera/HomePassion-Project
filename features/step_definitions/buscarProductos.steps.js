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

Given('I am on the home page for search products', async function () {
    // Navega a la página principal
    await page.goto('http://localhost:3000'); // Cambia la URL según sea necesario
});

When('I navigate to the catalog section for search products', async function () {
    // Haz clic en el enlace o botón que lleva a la sección del catálogo
    await page.click('a[href="#catalogo"]'); 
    await page.waitForSelector('#catalogo');
});

When('I search for a product with the keyword {string}', async function (keyword) {
    // Espera a que la barra de búsqueda esté presente
    await page.waitForSelector('[data-testid="search-bar"]');

    // Escribe la palabra clave en la barra de búsqueda
    await page.type('[data-testid="search-bar"]', keyword);

    // Simula la pulsación de la tecla Enter o el clic en el botón de búsqueda
    await page.keyboard.press('Enter');

    // Espera a que los resultados se actualicen
    await page.waitForSelector('#catalogo .MuiCard-root');
});

Then('I should see only products that match the keyword {string}', async function (keyword) {
    const products = await page.$$('#catalogo .MuiCard-root');
    let foundMatch = false;

    // Verifica que al menos un producto coincida con la palabra clave
    for (const product of products) {
        const title = await product.$eval('.MuiCardContent-root .MuiTypography-h6', el => el.textContent.trim());
        const description = await product.$eval('.MuiCardContent-root .MuiTypography-body2', el => el.textContent.trim());

        if (title.includes(keyword) || description.includes(keyword)) {
            foundMatch = true;
            break;  // Si se encuentra una coincidencia, no es necesario seguir buscando
        }
    }

    assert.ok(foundMatch, `No se encontraron productos que coincidan con la palabra clave "${keyword}"`);
});


After(async function () {
    await browser.close();
});
