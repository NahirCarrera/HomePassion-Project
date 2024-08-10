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

Given('I am on the home page for catalog', async function () {
    // Navega a la página principal
    await page.goto('http://localhost:3000'); // Cambia la URL según sea necesario
});

When('I navigate to the catalog section', async function () {
    // Haz clic en el enlace o botón que lleva a la sección del catálogo
    await page.click('a[href="#catalogo"]'); 
    await page.waitForSelector('#catalogo');
});

When('I select the category {string} from the dropdown', async function (category) {
    // Espera a que el contenedor del dropdown esté presente
    await page.waitForSelector('[data-testid="category-select"]');

    // Hacer clic en el contenedor del dropdown para abrir el menú
    await page.click('[data-testid="category-select"]');

    // Esperar a que las opciones sean visibles
    // Nota: Asegúrate de que el selector para las opciones coincida con la implementación
    await page.waitForSelector(`[data-testid="category-option-${category}"]`);

    // Hacer clic en la opción deseada
    await page.click(`[data-testid="category-option-${category}"]`);

    // Esperar a que el contenido del catálogo se actualice (opcional)
    await page.waitForSelector('#catalogo');
});

Then('I should see only products from category {string}', async function (category) {
    const products = await page.$$('#catalogo .MuiCard-root');

    // Verificar que los productos filtrados correspondan a la categoría seleccionada
    for (const product of products) {
        const productCategory = await product.$eval('.product-category', el => el.textContent.trim());
        assert.strictEqual(productCategory, category, `Producto no corresponde a la categoría ${category}`);
    }
});

After(async function () {
    await browser.close();
});
